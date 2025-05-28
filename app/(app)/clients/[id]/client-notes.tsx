"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { JobNote } from "@/types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Plus, X } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"

interface ClientNotesProps {
  clientId: string
  onUpdate: () => void
}

export function ClientNotes({ clientId, onUpdate }: ClientNotesProps) {
  const [notes, setNotes] = useState<JobNote[]>([])
  const [newNote, setNewNote] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchNotes()
  }, [clientId])

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase
        .from("job_notes")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false })

      if (error) throw error
      setNotes(data || [])
    } catch (error) {
      console.error("Error fetching notes:", error)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB")
        return
      }
      setSelectedFile(file)
    }
  }

  const uploadPhoto = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `job-photos/${fileName}`

      const { error: uploadError } = await supabase.storage.from("job-photos").upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from("job-photos").getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error("Error uploading photo:", error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) return

    setLoading(true)
    try {
      let photoUrl = null

      if (selectedFile) {
        photoUrl = await uploadPhoto(selectedFile)
      }

      const { error } = await supabase.from("job_notes").insert([
        {
          client_id: clientId,
          note_text: newNote,
          photo_url: photoUrl,
        },
      ])

      if (error) throw error

      setNewNote("")
      setSelectedFile(null)
      setShowAddForm(false)
      fetchNotes()
      onUpdate()
    } catch (error) {
      console.error("Error adding note:", error)
      alert("Error adding note. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Job Notes</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Note Form */}
        {showAddForm && (
          <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <Textarea
              placeholder="Add a note about this job..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
              required
            />

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button type="button" variant="outline" size="sm" asChild>
                  <span>
                    <Camera className="h-4 w-4 mr-2" />
                    Add Photo
                  </span>
                </Button>
              </label>

              {selectedFile && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedFile.name}</span>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading} size="sm">
                {loading ? "Adding..." : "Add Note"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowAddForm(false)
                  setNewNote("")
                  setSelectedFile(null)
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* Notes List */}
        {notes.length === 0 ? (
          <p className="text-gray-600 text-center py-4">No notes yet.</p>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-500">
                    {format(new Date(note.created_at), "MMM d, yyyy h:mm a")}
                  </span>
                </div>

                <p className="text-gray-900 mb-3">{note.note_text}</p>

                {note.photo_url && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden">
                    <Image src={note.photo_url || "/placeholder.svg"} alt="Job photo" fill className="object-cover" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
