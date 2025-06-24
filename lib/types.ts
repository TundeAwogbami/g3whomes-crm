export interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  role: "agent" | "admin"
  phone?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Contact {
  id: number
  first_name: string
  last_name: string
  email?: string
  phone?: string
  type: "buyer" | "seller" | "investor" | "lead"
  status: "active" | "qualified" | "lead" | "inactive"
  address?: string
  city?: string
  state?: string
  zip_code?: string
  notes?: string
  assigned_agent_id?: number
  created_at: string
  updated_at: string
}

export interface Property {
  id: number
  title: string
  description?: string
  address: string
  city: string
  state: string
  zip_code: string
  price?: number
  property_type: "house" | "condo" | "townhouse" | "apartment" | "commercial" | "land"
  listing_type: "sale" | "rent" | "lease" | "vacant"
  status: "active" | "pending" | "sold" | "rented" | "withdrawn"
  bedrooms?: number
  bathrooms?: number
  square_feet?: number
  lot_size?: number
  year_built?: number
  garage_spaces?: number
  features?: string[]
  images?: string[]
  virtual_tour_url?: string
  listing_agent_id?: number
  owner_contact_id?: number
  created_at: string
  updated_at: string
}

export interface Deal {
  id: number
  title: string
  contact_id: number
  property_id?: number
  agent_id: number
  deal_value?: number
  commission_rate?: number
  commission_amount?: number
  stage: "lead" | "qualified" | "proposal" | "negotiation" | "closed" | "lost"
  probability: number
  expected_close_date?: string
  actual_close_date?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: number
  title: string
  description?: string
  task_type: "call" | "email" | "showing" | "meeting" | "paperwork" | "research" | "follow_up"
  priority: "low" | "medium" | "high"
  status: "pending" | "in_progress" | "completed" | "cancelled"
  due_date?: string
  completed_at?: string
  assigned_to: number
  contact_id?: number
  property_id?: number
  deal_id?: number
  created_at: string
  updated_at: string
}
