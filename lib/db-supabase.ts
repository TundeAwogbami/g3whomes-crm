import { createClient } from "@supabase/supabase-js"
import type { User } from "next-auth"
import type { Contact, Property, Deal, Task } from "./types"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// --- Contacts ---
export async function getContacts(user: User): Promise<Contact[]> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching contacts:", error)
    return []
  }
  return data as Contact[]
}

export async function getContactById(user: User, id: string): Promise<Contact | null> {
  const { data, error } = await supabase.from("contacts").select("*").eq("id", id).eq("user_id", user.id).single()

  if (error) {
    console.error("Error fetching contact by ID:", error)
    return null
  }
  return data as Contact
}

export async function createContact(
  user: User,
  contact: Omit<Contact, "id" | "created_at" | "updated_at" | "user_id">,
): Promise<Contact | null> {
  const { data, error } = await supabase
    .from("contacts")
    .insert({ ...contact, user_id: user.id })
    .select()
    .single()

  if (error) {
    console.error("Error creating contact:", error)
    return null
  }
  return data as Contact
}

export async function updateContact(
  user: User,
  id: string,
  contact: Partial<Omit<Contact, "id" | "created_at" | "updated_at" | "user_id">>,
): Promise<Contact | null> {
  const { data, error } = await supabase
    .from("contacts")
    .update(contact)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) {
    console.error("Error updating contact:", error)
    return null
  }
  return data as Contact
}

export async function deleteContact(user: User, id: string): Promise<boolean> {
  const { error } = await supabase.from("contacts").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    console.error("Error deleting contact:", error)
    return false
  }
  return true
}

// --- Properties ---
export async function getProperties(user: User): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching properties:", error)
    return []
  }
  return data as Property[]
}

export async function createProperty(
  user: User,
  property: Omit<Property, "id" | "created_at" | "updated_at" | "user_id">,
): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .insert({ ...property, user_id: user.id })
    .select()
    .single()

  if (error) {
    console.error("Error creating property:", error)
    return null
  }
  return data as Property
}

export async function updateProperty(
  user: User,
  id: string,
  property: Partial<Omit<Property, "id" | "created_at" | "updated_at" | "user_id">>,
): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties")
    .update(property)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) {
    console.error("Error updating property:", error)
    return null
  }
  return data as Property
}

export async function deleteProperty(user: User, id: string): Promise<boolean> {
  const { error } = await supabase.from("properties").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    console.error("Error deleting property:", error)
    return false
  }
  return true
}

// --- Deals ---
export async function getDeals(user: User): Promise<Deal[]> {
  const { data, error } = await supabase
    .from("deals")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching deals:", error)
    return []
  }
  return data as Deal[]
}

export async function createDeal(
  user: User,
  deal: Omit<Deal, "id" | "created_at" | "updated_at" | "user_id">,
): Promise<Deal | null> {
  const { data, error } = await supabase
    .from("deals")
    .insert({ ...deal, user_id: user.id })
    .select()
    .single()

  if (error) {
    console.error("Error creating deal:", error)
    return null
  }
  return data as Deal
}

export async function updateDeal(
  user: User,
  id: string,
  deal: Partial<Omit<Deal, "id" | "created_at" | "updated_at" | "user_id">>,
): Promise<Deal | null> {
  const { data, error } = await supabase
    .from("deals")
    .update(deal)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) {
    console.error("Error updating deal:", error)
    return null
  }
  return data as Deal
}

export async function deleteDeal(user: User, id: string): Promise<boolean> {
  const { error } = await supabase.from("deals").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    console.error("Error deleting deal:", error)
    return false
  }
  return true
}

// --- Tasks ---
export async function getTasks(user: User): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user.id)
    .order("due_date", { ascending: true })

  if (error) {
    console.error("Error fetching tasks:", error)
    return []
  }
  return data as Task[]
}

export async function createTask(
  user: User,
  task: Omit<Task, "id" | "created_at" | "updated_at" | "user_id">,
): Promise<Task | null> {
  const { data, error } = await supabase
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

export async function updateTask(
  user: User,
  id: string,
  task: Partial<Omit<Task, "id" | "created_at" | "updated_at" | "user_id">>,
): Promise<Task | null> {
  const { data, error } = await supabase
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

export async function deleteTask(user: User, id: string): Promise<boolean> {
  const { error } = await supabase.from("tasks").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    console.error("Error deleting task:", error)
    return false
  }
  return true
}

// --- Documents ---
export interface Document {
  id: string
  created_at: string
  updated_at: string
  name: string
  file_url: string
  file_type: string
  file_size: number
  category: string
  document_type: string
  access_level: "Public" | "Internal" | "Confidential" | "Restricted"
  tags: string[]
  metadata: Record<string, any>
  user_id: string
  contact_id?: string
  property_id?: string
  deal_id?: string
}

export async function getDocuments(
  user: User,
  filters?: { category?: string; document_type?: string; search?: string },
): Promise<Document[]> {
  let query = supabase.from("documents").select("*").eq("user_id", user.id).order("created_at", { ascending: false })

  if (filters?.category) {
    query = query.eq("category", filters.category)
  }
  if (filters?.document_type) {
    query = query.eq("document_type", filters.document_type)
  }
  if (filters?.search) {
    query = query.textSearch("search_vector", filters.search)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching documents:", error)
    return []
  }
  return data as Document[]
}

export async function createDocument(
  user: User,
  document: Omit<Document, "id" | "created_at" | "updated_at" | "user_id">,
): Promise<Document | null> {
  const { data, error } = await supabase
    .from("documents")
    .insert({ ...document, user_id: user.id })
    .select()
    .single()

  if (error) {
    console.error("Error creating document:", error)
    return null
  }
  return data as Document
}

export async function deleteDocument(user: User, id: string): Promise<boolean> {
  const { error } = await supabase.from("documents").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    console.error("Error deleting document:", error)
    return false
  }
  return true
}

export async function logDocumentAccess(user: User, documentId: string, action: string): Promise<boolean> {
  const { error } = await supabase
    .from("document_access_log")
    .insert({ document_id: documentId, user_id: user.id, action })

  if (error) {
    console.error("Error logging document access:", error)
    return false
  }
  return true
}

// --- Data Records ---
export interface DataRecord {
  id: string
  created_at: string
  updated_at: string
  title: string
  category: string
  record_type?: string
  data: Record<string, any> // Flexible JSONB field
  access_level: "Public" | "Internal" | "Confidential" | "Restricted"
  tags: string[]
  user_id: string
  contact_id?: string
  property_id?: string
  deal_id?: string
}

export async function getDataRecords(
  user: User,
  filters?: { category?: string; record_type?: string; search?: string },
): Promise<DataRecord[]> {
  let query = supabase.from("data_records").select("*").eq("user_id", user.id).order("created_at", { ascending: false })

  if (filters?.category) {
    query = query.eq("category", filters.category)
  }
  if (filters?.record_type) {
    query = query.eq("record_type", filters.record_type)
  }
  if (filters?.search) {
    query = query.textSearch("search_vector", filters.search)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching data records:", error)
    return []
  }
  return data as DataRecord[]
}

export async function createDataRecord(
  user: User,
  record: Omit<DataRecord, "id" | "created_at" | "updated_at" | "user_id">,
): Promise<DataRecord | null> {
  const { data, error } = await supabase
    .from("data_records")
    .insert({ ...record, user_id: user.id })
    .select()
    .single()

  if (error) {
    console.error("Error creating data record:", error)
    return null
  }
  return data as DataRecord
}

export async function updateDataRecord(
  user: User,
  id: string,
  record: Partial<Omit<DataRecord, "id" | "created_at" | "updated_at" | "user_id">>,
): Promise<DataRecord | null> {
  const { data, error } = await supabase
    .from("data_records")
    .update(record)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single()

  if (error) {
    console.error("Error updating data record:", error)
    return null
  }
  return data as DataRecord
}

export async function deleteDataRecord(user: User, id: string): Promise<boolean> {
  const { error } = await supabase.from("data_records").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    console.error("Error deleting data record:", error)
    return false
  }
  return true
}

// --- Dashboard Stats ---
export async function getDashboardStats(user: User) {
  const { count: contactsCount, error: contactsError } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  const { count: propertiesCount, error: propertiesError } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  const { count: dealsCount, error: dealsError } = await supabase
    .from("deals")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  const { count: tasksCount, error: tasksError } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  const { count: documentsCount, error: documentsError } = await supabase
    .from("documents")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  const { count: dataRecordsCount, error: dataRecordsError } = await supabase
    .from("data_records")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)

  if (contactsError || propertiesError || dealsError || tasksError || documentsError || dataRecordsError) {
    console.error(
      "Error fetching dashboard stats:",
      contactsError || propertiesError || dealsError || tasksError || documentsError || dataRecordsError,
    )
    return {
      totalContacts: 0,
      totalProperties: 0,
      totalDeals: 0,
      totalTasks: 0,
      totalDocuments: 0,
      totalDataRecords: 0,
    }
  }

  return {
    totalContacts: contactsCount || 0,
    totalProperties: propertiesCount || 0,
    totalDeals: dealsCount || 0,
    totalTasks: tasksCount || 0,
    totalDocuments: documentsCount || 0,
    totalDataRecords: dataRecordsCount || 0,
  }
}
