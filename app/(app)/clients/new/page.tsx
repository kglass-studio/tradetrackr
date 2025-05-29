"use client"

//import type React from "react"
import * as React from 'react';

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const dynamic = 'force-dynamic';

export default function NewClientPage() {
  return <div>Testing New Client Page</div>;
}

// export default function NewClientPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     address: "",
//     job_status: "Lead" as const,
//   })
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setLoading(true)

//     try {
//       const { data, error } = await supabase.from("clients").insert([formData]).select().single()

//       if (error) throw error

//       router.push(`/clients/${data.id}`)
//     } catch (error) {
//       console.error("Error creating client:", error)
//       alert("Error creating client. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   return (
//     <div className="space-y-4">
//       {/* Header */}
//       <div className="flex items-center gap-4">
//         <Link href="/clients">
//           <Button variant="ghost" size="sm">
//             <ArrowLeft className="h-4 w-4" />
//           </Button>
//         </Link>
//         <h1 className="text-2xl font-bold text-gray-900">Add New Client</h1>
//       </div>

//       {/* Form */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Client Information</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <Label htmlFor="name">Name *</Label>
//               <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="phone">Phone</Label>
//               <Input
//                 id="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={(e) => handleChange("phone", e.target.value)}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleChange("email", e.target.value)}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="address">Address</Label>
//               <Textarea
//                 id="address"
//                 value={formData.address}
//                 onChange={(e) => handleChange("address", e.target.value)}
//                 rows={3}
//               />
//             </div>

//             {/* <div className="space-y-2">
//               <Label htmlFor="job_status">Job Status</Label>
//               <Select value={formData.job_status} onValueChange={(value) => handleChange("job_status", value)}>
//                 <SelectTrigger>
//                   <SelectValue />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="Lead">Lead</SelectItem>
//                   <SelectItem value="Quoted">Quoted</SelectItem>
//                   <SelectItem value="Scheduled">Scheduled</SelectItem>
//                   <SelectItem value="Completed">Completed</SelectItem>
//                   <SelectItem value="Paid">Paid</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div> */}

//              {/* Temporary standard select */}
//         <div className="space-y-2">
//           <Label htmlFor="job_status">Job Status</Label>
//           <select
//             id="job_status"
//             value={formData.job_status}
//             onChange={(e) => handleChange("job_status", e.target.value)}
//             className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             <option value="Lead">Lead</option>
//             <option value="Quoted">Quoted</option>
//             <option value="Scheduled">Scheduled</option>
//             <option value="Completed">Completed</option>
//             <option value="Paid">Paid</option>
//           </select>
//         </div>

//             <div className="flex gap-4 pt-4">
//               <Button type="submit" disabled={loading} className="flex-1">
//                 {loading ? "Creating..." : "Create Client"}
//               </Button>
//               <Link href="/clients">
//                 <Button type="button" variant="outline">
//                   Cancel
//                 </Button>
//               </Link>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
