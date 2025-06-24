import { supabase } from "./supabase"
import type { Contact, Property, Deal, Task, User } from "./types"

// ==================== CONTACTS ====================
export async function getContacts(
  filters: {
    type?: string
    status?: string
    search?: string
  } = {},
) {
  try {
    let query = supabase.from("contacts").select(`
        *,
        assigned_agent:users!assigned_agent_id(first_name, last_name)
      `)

    if (filters.type) {
      query = query.eq("type", filters.type)
    }

    if (filters.status) {
      query = query.eq("status", filters.status)
    }

    if (filters.search) {
      query = query.or(
        `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`,
      )
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return data as Contact[]
  } catch (error) {
    console.error("Error fetching contacts:", error)
    throw new Error("Failed to fetch contacts")
  }
}

export async function getContactById(id: number) {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select(`
        *,
        assigned_agent:users!assigned_agent_id(first_name, last_name)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data as Contact
  } catch (error) {
    console.error("Error fetching contact:", error)
    throw new Error("Contact not found")
  }
}

export async function createContact(contactData: Omit<Contact, "id" | "created_at" | "updated_at">) {
  try {
    const { data, error } = await supabase.from("contacts").insert([contactData]).select().single()

    if (error) throw error
    return data as Contact
  } catch (error) {
    console.error("Error creating contact:", error)
    throw new Error("Failed to create contact")
  }
}

export async function updateContact(id: number, contactData: Partial<Contact>) {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .update({ ...contactData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data as Contact
  } catch (error) {
    console.error("Error updating contact:", error)
    throw new Error("Failed to update contact")
  }
}

export async function deleteContact(id: number) {
  try {
    const { error } = await supabase.from("contacts").delete().eq("id", id)

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error deleting contact:", error)
    throw new Error("Failed to delete contact")
  }
}

// ==================== PROPERTIES ====================
export async function getProperties(
  filters: {
    status?: string
    type?: string
    listing_type?: string
    search?: string
  } = {},
) {
  try {
    let query = supabase.from("properties").select(`
        *,
        listing_agent:users!listing_agent_id(first_name, last_name),
        owner_contact:contacts!owner_contact_id(first_name, last_name)
      `)

    if (filters.status) {
      query = query.eq("status", filters.status)
    }

    if (filters.type) {
      query = query.eq("property_type", filters.type)
    }

    if (filters.listing_type) {
      query = query.eq("listing_type", filters.listing_type)
    }

    if (filters.search) {
      query = query.or(
        `title.ilike.%${filters.search}%,address.ilike.%${filters.search}%,city.ilike.%${filters.search}%`,
      )
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return data as Property[]
  } catch (error) {
    console.error("Error fetching properties:", error)
    throw new Error("Failed to fetch properties")
  }
}

export async function createProperty(propertyData: Omit<Property, "id" | "created_at" | "updated_at">) {
  try {
    const { data, error } = await supabase.from("properties").insert([propertyData]).select().single()

    if (error) throw error
    return data as Property
  } catch (error) {
    console.error("Error creating property:", error)
    throw new Error("Failed to create property")
  }
}

// ==================== DEALS ====================
export async function getDeals(
  filters: {
    stage?: string
    agent_id?: number
  } = {},
) {
  try {
    let query = supabase.from("deals").select(`
        *,
        contact:contacts!contact_id(first_name, last_name),
        property:properties!property_id(title, address),
        agent:users!agent_id(first_name, last_name)
      `)

    if (filters.stage) {
      query = query.eq("stage", filters.stage)
    }

    if (filters.agent_id) {
      query = query.eq("agent_id", filters.agent_id)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return data as Deal[]
  } catch (error) {
    console.error("Error fetching deals:", error)
    throw new Error("Failed to fetch deals")
  }
}

export async function createDeal(dealData: Omit<Deal, "id" | "created_at" | "updated_at">) {
  try {
    // Calculate commission if deal value is provided
    if (dealData.deal_value && dealData.commission_rate) {
      dealData.commission_amount = (dealData.deal_value * dealData.commission_rate) / 100
    }

    const { data, error } = await supabase.from("deals").insert([dealData]).select().single()

    if (error) throw error
    return data as Deal
  } catch (error) {
    console.error("Error creating deal:", error)
    throw new Error("Failed to create deal")
  }
}

// ==================== TASKS ====================
export async function getTasks(
  filters: {
    status?: string
    assigned_to?: number
    priority?: string
  } = {},
) {
  try {
    let query = supabase.from("tasks").select(`
        *,
        contact:contacts!contact_id(first_name, last_name),
        property:properties!property_id(title),
        deal:deals!deal_id(title),
        assignee:users!assigned_to(first_name, last_name)
      `)

    if (filters.status) {
      query = query.eq("status", filters.status)
    }

    if (filters.assigned_to) {
      query = query.eq("assigned_to", filters.assigned_to)
    }

    if (filters.priority) {
      query = query.eq("priority", filters.priority)
    }

    const { data, error } = await query.order("due_date", { ascending: true })

    if (error) throw error
    return data as Task[]
  } catch (error) {
    console.error("Error fetching tasks:", error)
    throw new Error("Failed to fetch tasks")
  }
}

export async function createTask(taskData: Omit<Task, "id" | "created_at" | "updated_at">) {
  try {
    const { data, error } = await supabase.from("tasks").insert([taskData]).select().single()

    if (error) throw error
    return data as Task
  } catch (error) {
    console.error("Error creating task:", error)
    throw new Error("Failed to create task")
  }
}

// ==================== USERS ====================
export async function getUsers() {
  try {
    const { data, error } = await supabase.from("users").select("*").order("first_name", { ascending: true })

    if (error) throw error
    return data as User[]
  } catch (error) {
    console.error("Error fetching users:", error)
    throw new Error("Failed to fetch users")
  }
}

export async function getUserByEmail(email: string) {
  try {
    const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

    if (error) throw error
    return data as User
  } catch (error) {
    console.error("Error fetching user:", error)
    return null
  }
}

// ==================== DASHBOARD STATS ====================
export async function getDashboardStats() {
  try {
    const [contactsResult, propertiesResult, dealsResult, tasksResult] = await Promise.all([
      supabase.from("contacts").select("*", { count: "exact", head: true }),
      supabase.from("properties").select("*", { count: "exact", head: true }),
      supabase.from("deals").select("deal_value, stage"),
      supabase.from("tasks").select("*", { count: "exact", head: true }),
    ])

    const totalContacts = contactsResult.count || 0
    const totalProperties = propertiesResult.count || 0
    const totalTasks = tasksResult.count || 0

    // Calculate revenue from closed deals
    const closedDeals = dealsResult.data?.filter((deal) => deal.stage === "closed") || []
    const monthlyRevenue = closedDeals.reduce((sum, deal) => sum + (deal.deal_value || 0), 0)

    return {
      totalContacts,
      totalProperties,
      monthlyRevenue,
      totalTasks,
      closedDeals: closedDeals.length,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    throw new Error("Failed to fetch dashboard statistics")
  }
}
