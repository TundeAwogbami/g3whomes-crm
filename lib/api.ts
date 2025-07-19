import type { Contact, Property, Deal, Task, Document, DataRecord } from "./types"

const API_BASE_URL = "/api"

// Generic fetcher function
async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options)
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Something went wrong")
  }
  return response.json()
}

// Contacts API
export const getContacts = (): Promise<Contact[]> => fetcher<Contact[]>(`${API_BASE_URL}/contacts`)
export const getContactById = (id: string): Promise<Contact> => fetcher<Contact>(`${API_BASE_URL}/contacts/${id}`)
export const createContact = (contact: Omit<Contact, "id" | "created_at">): Promise<Contact> =>
  fetcher<Contact>(`${API_BASE_URL}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  })
export const updateContact = (id: string, contact: Partial<Contact>): Promise<Contact> =>
  fetcher<Contact>(`${API_BASE_URL}/contacts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contact),
  })
export const deleteContact = (id: string): Promise<{ message: string }> =>
  fetcher<{ message: string }>(`${API_BASE_URL}/contacts/${id}`, {
    method: "DELETE",
  })

// Properties API
export const getProperties = (): Promise<Property[]> => fetcher<Property[]>(`${API_BASE_URL}/properties`)
export const getPropertyById = (id: string): Promise<Property> => fetcher<Property>(`${API_BASE_URL}/properties/${id}`)
export const createProperty = (property: Omit<Property, "id" | "created_at">): Promise<Property> =>
  fetcher<Property>(`${API_BASE_URL}/properties`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(property),
  })
export const updateProperty = (id: string, property: Partial<Property>): Promise<Property> =>
  fetcher<Property>(`${API_BASE_URL}/properties/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(property),
  })
export const deleteProperty = (id: string): Promise<{ message: string }> =>
  fetcher<{ message: string }>(`${API_BASE_URL}/properties/${id}`, {
    method: "DELETE",
  })

// Deals API
export const getDeals = (): Promise<Deal[]> => fetcher<Deal[]>(`${API_BASE_URL}/deals`)
export const getDealById = (id: string): Promise<Deal> => fetcher<Deal>(`${API_BASE_URL}/deals/${id}`)
export const createDeal = (deal: Omit<Deal, "id" | "created_at">): Promise<Deal> =>
  fetcher<Deal>(`${API_BASE_URL}/deals`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deal),
  })
export const updateDeal = (id: string, deal: Partial<Deal>): Promise<Deal> =>
  fetcher<Deal>(`${API_BASE_URL}/deals/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(deal),
  })
export const deleteDeal = (id: string): Promise<{ message: string }> =>
  fetcher<{ message: string }>(`${API_BASE_URL}/deals/${id}`, {
    method: "DELETE",
  })

// Tasks API
export const getTasks = (): Promise<Task[]> => fetcher<Task[]>(`${API_BASE_URL}/tasks`)
export const getTaskById = (id: string): Promise<Task> => fetcher<Task>(`${API_BASE_URL}/tasks/${id}`)
export const createTask = (task: Omit<Task, "id" | "created_at">): Promise<Task> =>
  fetcher<Task>(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
export const updateTask = (id: string, task: Partial<Task>): Promise<Task> =>
  fetcher<Task>(`${API_BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
export const deleteTask = (id: string): Promise<{ message: string }> =>
  fetcher<{ message: string }>(`${API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  })

// Documents API
export const getDocuments = (): Promise<Document[]> => fetcher<Document[]>(`${API_BASE_URL}/documents`)
export const uploadDocument = (formData: FormData): Promise<Document> =>
  fetcher<Document>(`${API_BASE_URL}/documents`, {
    method: "POST",
    body: formData,
  })
export const deleteDocument = (id: string): Promise<{ message: string }> =>
  fetcher<{ message: string }>(`${API_BASE_URL}/documents/${id}`, {
    method: "DELETE",
  })

// Data Records API
export const getDataRecords = (): Promise<DataRecord[]> => fetcher<DataRecord[]>(`${API_BASE_URL}/data-records`)
export const createDataRecord = (record: Omit<DataRecord, "id" | "created_at">): Promise<DataRecord> =>
  fetcher<DataRecord>(`${API_BASE_URL}/data-records`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  })
export const updateDataRecord = (id: string, record: Partial<DataRecord>): Promise<DataRecord> =>
  fetcher<DataRecord>(`${API_BASE_URL}/data-records/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(record),
  })
export const deleteDataRecord = (id: string): Promise<{ message: string }> =>
  fetcher<{ message: string }>(`${API_BASE_URL}/data-records/${id}`, {
    method: "DELETE",
  })
