import { createClient } from "@supabase/supabase-js"
import type { User } from "next-auth"
import type { Client, Property, Deal, Task, Document, DataRecord } from "./types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase URL or Anon Key environment variables.")
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export async function getClients(user: User): Promise<Client[]> {
  const { data, error } = await supabaseClient.from("clients").select("*").eq("user_id", user.id)
  if (error) {
    console.error("Error fetching clients:", error)
    return []
  }
  return data as Client[]
}

export async function getClientById(id: string, user: User): Promise<Client | null> {
  const { data, error } = await supabaseClient.from("clients").select("*").eq("id", id).eq("user_id", user.id).single()
  if (error) {
    console.error("Error fetching client by ID:", error)
    return null
  }
  return data as Client
}

export async function createNewClient(client: Omit<Client, "id" | "user_id">, user: User): Promise<Client | null> {
  const { data, error } = await supabaseClient
    .from("clients")
    .insert({ ...client, user_id: user.id })
    .select()
    .single()
  if (error) {
    console.error("Error creating client:", error)
    return null
  }
  return data as Client
}

export async function updateClient(id: string, client: Partial<Client>, user: User): Promise<Client | null> {
  const { data, error } = await supabaseClient
    .from("clients")
    .update(client)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single()
  if (error) {
    console.error("Error updating client:", error)
    return null
  }
  return data as Client
}

export async function deleteClient(id: string, user: User): Promise<void> {
  const { error } = await supabaseClient.from("clients").delete().eq("id", id).eq("user_id", user.id)
  if (error) {
    console.error("Error deleting client:", error)
  }
}

export async function getProperties(user: User): Promise<Property[]> {
  const { data, error } = await supabaseClient.from("properties").select("*").eq("agent_id", user.id)
  if (error) {
    console.error("Error fetching properties:", error)
    return []
  }
  return data as Property[]
}

export async function getPropertyById(id: string, user: User): Promise<Property | null> {
  const { data, error } = await supabaseClient
    .from("properties")
    .select("*")
    .eq("id", id)
    .eq("agent_id", user.id)
    .single()
  if (error) {
    console.error("Error fetching property by ID:", error)
    return null
  }
  return data as Property
}

export async function createProperty(
  property: Omit<Property, "id" | "agent_id">,
  user: User,
): Promise<Property | null> {
  const { data, error } = await supabaseClient
    .from("properties")
    .insert({ ...property, agent_id: user.id })
    .select()
    .single()
  if (error) {
    console.error("Error creating property:", error)
    return null
  }
  return data as Property
}

export async function updateProperty(id: string, property: Partial<Property>, user: User): Promise<Property | null> {
  const { data, error } = await supabaseClient
    .from("properties")
    .update(property)
    .eq("id", id)
    .eq("agent_id", user.id)
    .select()
    .single()
  if (error) {
    console.error("Error updating property:", error)
    return null
  }
  return data as Property
}

export async function deleteProperty(id: string, user: User): Promise<void> {
  const { error } = await supabaseClient.from("properties").delete().eq("id", id).eq("agent_id", user.id)
  if (error) {
    console.error("Error deleting property:", error)
  }
}

export async function getDeals(user: User): Promise<Deal[]> {
  const { data, error } = await supabaseClient.from("deals").select("*").eq("agent_id", user.id)
  if (error) {
    console.error("Error fetching deals:", error)
    return []
  }
  return data as Deal[]
}

export async function getDealById(id: string, user: User): Promise<Deal | null> {
  const { data, error } = await supabaseClient.from("deals").select("*").eq("id", id).eq("agent_id", user.id).single()
  if (error) {
    console.error("Error fetching deal by ID:", error)
    return null
  }
  return data as Deal
}

export async function createDeal(deal: Omit<Deal, "id" | "agent_id">, user: User): Promise<Deal | null> {
  const { data, error } = await supabaseClient
    .from("deals")
    .insert({ ...deal, agent_id: user.id })
    .select()
    .single()
  if (error) {
    console.error("Error creating deal:", error)
    return null
  }
  return data as Deal
}

export async function updateDeal(id: string, deal: Partial<Deal>, user: User): Promise<Deal | null> {
  const { data, error } = await supabaseClient
    .from("deals")
    .update(deal)
    .eq("id", id)
    .eq("agent_id", user.id)
    .select()
    .single()
  if (error) {
    console.error("Error updating deal:", error)
    return null
  }
  return data as Deal
}

export async function deleteDeal(id: string, user: User): Promise<void> {
  const { error } = await supabaseClient.from("deals").delete().eq("id", id).eq("agent_id", user.id)
  if (error) {
    console.error("Error deleting deal:", error)
  }
}

export async function getTasks(user: User): Promise<Task[]> {
  const { data, error } = await supabaseClient.from("tasks").select("*").eq("user_id", user.id)
  if (error) {
    console.error("Error fetching tasks:", error)
    return []
  }
  return data as Task[]
}

export async function getTaskById(id: string, user: User): Promise<Task | null> {
  const { data, error } = await supabaseClient.from("tasks").select("*").eq("id", id).eq("user_id", user.id).single()
  if (error) {
    console.error("Error fetching task by ID:", error)
    return null
  }
  return data as Task
}

export async function createTask(task: Omit<Task, "id" | "user_id">, user: User): Promise<Task | null> {
  const { data, error } = await supabaseClient
    .from("tasks")
    .insert({ ...task, user_id: user.id })
    .select()
    .single()
  if (error) {
    console.error("Error creating task:", error)
    return null
  }
  return data as Task
}

export async function updateTask(id: string, task: Partial<Task>, user: User): Promise<Task | null> {
  const { data, error } = await supabaseClient
    .from("tasks")
    .update(task)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single()
  if (error) {
    console.error("Error updating task:", error)
    return null
  }
  return data as Task
}

export async function deleteTask(id: string, user: User): Promise<void> {
  const { error } = await supabaseClient.from("tasks").delete().eq("id", id).eq("user_id", user.id)
  if (error) {
    console.error("Error deleting task:", error)
  }
}

// Document Management Functions
export async function getDocuments(
  user: User,
  filters?: { category?: string; document_type?: string; access_level?: string; search?: string },
): Promise<Document[]> {
  let query = supabaseClient.from("documents").select("*")

  if (filters?.category) {
    query = query.eq("category", filters.category)
  }
  if (filters?.document_type) {
    query = query.eq("document_type", filters.document_type)
  }
  if (filters?.access_level) {
    query = query.eq("access_level", filters.access_level)
  }
  if (filters?.search) {
    query = query.textSearch("search_vector", filters.search)
  }

  const { data, error } = await query.order("created_at", { ascending: false })
  if (error) {
    console.error("Error fetching documents:", error)
    return []
  }
  return data as Document[]
}

export async function createDocument(
  document: Omit<Document, "id" | "created_at" | "updated_at" | "uploaded_by">,
  user: User,
): Promise<Document | null> {
  const { data, error } = await supabaseClient
    .from("documents")
    .insert({ ...document, uploaded_by: user.id })
    .select()
    .single()
  if (error) {
    console.error("Error creating document:", error)
    return null
  }
  return data as Document
}

export async function deleteDocument(id: string, user: User): Promise<void> {
  const { error } = await supabaseClient.from("documents").delete().eq("id", id).eq("uploaded_by", user.id)
  if (error) {
    console.error("Error deleting document:", error)
  }
}

export async function logDocumentAccess(documentId: string, userId: string, action: string): Promise<void> {
  const { error } = await supabaseClient
    .from("document_access_log")
    .insert({ document_id: documentId, user_id: userId, action })
  if (error) {
    console.error("Error logging document access:", error)
  }
}

// Data Record Management Functions
export async function getDataRecords(
  user: User,
  filters?: { category?: string; record_type?: string; access_level?: string; search?: string },
): Promise<DataRecord[]> {
  let query = supabaseClient.from("data_records").select("*")

  if (filters?.category) {
    query = query.eq("category", filters.category)
  }
  if (filters?.record_type) {
    query = query.eq("record_type", filters.record_type)
  }
  if (filters?.access_level) {
    query = query.eq("access_level", filters.access_level)
  }
  if (filters?.search) {
    query = query.textSearch("search_vector", filters.search)
  }

  const { data, error } = await query.order("created_at", { ascending: false })
  if (error) {
    console.error("Error fetching data records:", error)
    return []
  }
  return data as DataRecord[]
}

export async function createDataRecord(
  record: Omit<DataRecord, "id" | "created_at" | "updated_at" | "created_by">,
  user: User,
): Promise<DataRecord | null> {
  const { data, error } = await supabaseClient
    .from("data_records")
    .insert({ ...record, created_by: user.id })
    .select()
    .single()
  if (error) {
    console.error("Error creating data record:", error)
    return null
  }
  return data as DataRecord
}

export async function updateDataRecord(
  id: string,
  record: Partial<DataRecord>,
  user: User,
): Promise<DataRecord | null> {
  const { data, error } = await supabaseClient
    .from("data_records")
    .update(record)
    .eq("id", id)
    .eq("created_by", user.id)
    .select()
    .single()
  if (error) {
    console.error("Error updating data record:", error)
    return null
  }
  return data as DataRecord
}

export async function deleteDataRecord(id: string, user: User): Promise<void> {
  const { error } = await supabaseClient.from("data_records").delete().eq("id", id).eq("created_by", user.id)
  if (error) {
    console.error("Error deleting data record:", error)
  }
}

export async function getDashboardStats(user: User) {
  const { count: clientCount, error: clientError } = await supabaseClient
    .from("clients")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
  const { count: propertyCount, error: propertyError } = await supabaseClient
    .from("properties")
    .select("*", { count: "exact", head: true })
    .eq("agent_id", user.id)
  const { count: dealCount, error: dealError } = await supabaseClient
    .from("deals")
    .select("*", { count: "exact", head: true })
    .eq("agent_id", user.id)
  const { count: taskCount, error: taskError } = await supabaseClient
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
  const { count: documentCount, error: documentError } = await supabaseClient
    .from("documents")
    .select("*", { count: "exact", head: true })
    .eq("uploaded_by", user.id)
  const { count: dataRecordCount, error: dataRecordError } = await supabaseClient
    .from("data_records")
    .select("*", { count: "exact", head: true })
    .eq("created_by", user.id)

  if (clientError || propertyError || dealError || taskError || documentError || dataRecordError) {
    console.error(
      "Error fetching dashboard stats:",
      clientError || propertyError || dealError || taskError || documentError || dataRecordError,
    )
    return {
      clientCount: 0,
      propertyCount: 0,
      dealCount: 0,
      taskCount: 0,
      documentCount: 0,
      dataRecordCount: 0,
    }
  }

  return {
    clientCount: clientCount || 0,
    propertyCount: propertyCount || 0,
    dealCount: dealCount || 0,
    taskCount: taskCount || 0,
    documentCount: documentCount || 0,
    dataRecordCount: dataRecordCount || 0,
  }
}
