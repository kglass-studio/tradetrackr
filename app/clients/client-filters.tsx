"use client"

import { Button } from "@/components/ui/button"

interface ClientFiltersProps {
  statusFilter: string
  onStatusFilterChange: (status: string) => void
}

export function ClientFilters({ statusFilter, onStatusFilterChange }: ClientFiltersProps) {
  const filters = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "Lead", label: "Leads" },
    { value: "Quoted", label: "Quoted" },
    { value: "Scheduled", label: "Scheduled" },
    { value: "Completed", label: "Completed" },
    { value: "Paid", label: "Paid" },
  ]

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={statusFilter === filter.value ? "default" : "outline"}
          size="sm"
          onClick={() => onStatusFilterChange(filter.value)}
          className="whitespace-nowrap"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}
