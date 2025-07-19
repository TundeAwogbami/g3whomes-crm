export type Contact = {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  created_at: string
}

export type Property = {
  id: string
  address: string
  city?: string
  state?: string
  zip_code?: string
  price?: number
  status?: string
  created_at: string
}

export type Deal = {
  id: string
  property_id?: string
  contact_id?: string
  deal_value?: number
  stage?: string
  close_date?: string
  created_at: string
}

export type Task = {
  id: string
  deal_id?: string
  contact_id?: string
  title: string
  description?: string
  due_date?: string
  status?: string
  created_at: string
}

export type UserRole = "admin" | "user" | "agent"

export type UserProfile = {
  id: string
  email: string
  name?: string
  role: UserRole
  phone?: string
  address?: string
  bio?: string
  created_at: string
}

export type Document = {
  id: string
  user_id: string
  file_name: string
  file_url: string
  uploaded_at: string
}

export type DataRecord = {
  id: string
  user_id: string
  record_type: string
  data_content: string
  created_at: string
}
