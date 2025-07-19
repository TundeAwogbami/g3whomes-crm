export async function fetchContacts(params?: {
  type?: string
  status?: string
  search?: string
}) {
  const searchParams = new URLSearchParams()
  if (params?.type) searchParams.set("type", params.type)
  if (params?.status) searchParams.set("status", params.status)
  if (params?.search) searchParams.set("search", params.search)

  const response = await fetch(`/api/contacts?${searchParams}`)
  if (!response.ok) {
    throw new Error("Failed to fetch contacts")
  }
  return response.json()
}

export async function createContact(data: any) {
  const response = await fetch("/api/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!response.ok) {
    throw new Error("Failed to create contact")
  }
  return response.json()
}

export async function fetchProperties(params?: {
  status?: string
  type?: string
  listing_type?: string
  search?: string
}) {
  const searchParams = new URLSearchParams()
  if (params?.status) searchParams.set("status", params.status)
  if (params?.type) searchParams.set("type", params.type)
  if (params?.listing_type) searchParams.set("listing_type", params.listing_type)
  if (params?.search) searchParams.set("search", params.search)

  const response = await fetch(`/api/properties?${searchParams}`)
  if (!response.ok) {
    throw new Error("Failed to fetch properties")
  }
  return response.json()
}

export async function fetchDeals(params?: {
  stage?: string
  agent_id?: string
}) {
  const searchParams = new URLSearchParams()
  if (params?.stage) searchParams.set("stage", params.stage)
  if (params?.agent_id) searchParams.set("agent_id", params.agent_id)

  const response = await fetch(`/api/deals?${searchParams}`)
  if (!response.ok) {
    throw new Error("Failed to fetch deals")
  }
  return response.json()
}

export async function fetchTasks(params?: {
  status?: string
  assigned_to?: string
  priority?: string
}) {
  const searchParams = new URLSearchParams()
  if (params?.status) searchParams.set("status", params.status)
  if (params?.assigned_to) searchParams.set("assigned_to", params.assigned_to)
  if (params?.priority) searchParams.set("priority", params.priority)

  const response = await fetch(`/api/tasks?${searchParams}`)
  if (!response.ok) {
    throw new Error("Failed to fetch tasks")
  }
  return response.json()
}
