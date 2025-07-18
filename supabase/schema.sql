-- Real Estate CRM Database Schema for Supabase
-- Remove the JWT secret line as it requires superuser privileges

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) DEFAULT 'agent',
    phone VARCHAR(20),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    type VARCHAR(20) CHECK (type IN ('buyer', 'seller', 'investor', 'lead')) DEFAULT 'lead',
    status VARCHAR(20) CHECK (status IN ('active', 'qualified', 'lead', 'inactive')) DEFAULT 'lead',
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(50),
    zip_code VARCHAR(10),
    notes TEXT,
    assigned_agent_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    price DECIMAL(12,2),
    property_type VARCHAR(50) CHECK (property_type IN ('house', 'condo', 'townhouse', 'apartment', 'commercial', 'land')),
    listing_type VARCHAR(20) CHECK (listing_type IN ('sale', 'rent')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('active', 'pending', 'sold', 'rented', 'withdrawn')) DEFAULT 'active',
    bedrooms INTEGER,
    bathrooms DECIMAL(3,1),
    square_feet INTEGER,
    lot_size DECIMAL(10,2),
    year_built INTEGER,
    garage_spaces INTEGER,
    features TEXT[],
    images TEXT[],
    virtual_tour_url TEXT,
    listing_agent_id INTEGER REFERENCES users(id),
    owner_contact_id INTEGER REFERENCES contacts(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create deals table
CREATE TABLE IF NOT EXISTS deals (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    contact_id INTEGER REFERENCES contacts(id) NOT NULL,
    property_id INTEGER REFERENCES properties(id),
    agent_id INTEGER REFERENCES users(id) NOT NULL,
    deal_value DECIMAL(12,2),
    commission_rate DECIMAL(5,2) DEFAULT 5.00,
    commission_amount DECIMAL(12,2),
    stage VARCHAR(20) CHECK (stage IN ('lead', 'qualified', 'proposal', 'negotiation', 'closed', 'lost')) DEFAULT 'lead',
    probability INTEGER CHECK (probability >= 0 AND probability <= 100) DEFAULT 50,
    expected_close_date DATE,
    actual_close_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    task_type VARCHAR(50) CHECK (task_type IN ('call', 'email', 'showing', 'meeting', 'paperwork', 'research', 'follow_up')),
    priority VARCHAR(10) CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    status VARCHAR(20) CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')) DEFAULT 'pending',
    due_date TIMESTAMP,
    completed_at TIMESTAMP,
    assigned_to INTEGER REFERENCES users(id) NOT NULL,
    contact_id INTEGER REFERENCES contacts(id),
    property_id INTEGER REFERENCES properties(id),
    deal_id INTEGER REFERENCES deals(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    document_type VARCHAR(50) CHECK (document_type IN ('contract', 'listing', 'inspection', 'financial', 'legal', 'marketing', 'other')),
    contact_id INTEGER REFERENCES contacts(id),
    property_id INTEGER REFERENCES properties(id),
    deal_id INTEGER REFERENCES deals(id),
    uploaded_by INTEGER REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    activity_type VARCHAR(50) CHECK (activity_type IN ('call', 'email', 'meeting', 'showing', 'note', 'document')) NOT NULL,
    subject VARCHAR(255),
    description TEXT,
    contact_id INTEGER REFERENCES contacts(id),
    property_id INTEGER REFERENCES properties(id),
    deal_id INTEGER REFERENCES deals(id),
    user_id INTEGER REFERENCES users(id) NOT NULL,
    activity_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_type ON contacts(type);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_agent ON contacts(assigned_agent_id);

CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_listing_type ON properties(listing_type);
CREATE INDEX IF NOT EXISTS idx_properties_agent ON properties(listing_agent_id);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(price);

CREATE INDEX IF NOT EXISTS idx_deals_stage ON deals(stage);
CREATE INDEX IF NOT EXISTS idx_deals_agent ON deals(agent_id);
CREATE INDEX IF NOT EXISTS idx_deals_contact ON deals(contact_id);
CREATE INDEX IF NOT EXISTS idx_deals_close_date ON deals(expected_close_date);

CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);

CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(activity_type);
CREATE INDEX IF NOT EXISTS idx_activities_contact ON activities(contact_id);
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(activity_date);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies (you can customize these later)
-- Allow authenticated users to read all data
CREATE POLICY "Allow authenticated users to read users" ON users FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read contacts" ON contacts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read properties" ON properties FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read deals" ON deals FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read tasks" ON tasks FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read documents" ON documents FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to read activities" ON activities FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert/update/delete (you may want to restrict this later)
CREATE POLICY "Allow authenticated users to insert contacts" ON contacts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update contacts" ON contacts FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete contacts" ON contacts FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert properties" ON properties FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update properties" ON properties FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete properties" ON properties FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert deals" ON deals FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update deals" ON deals FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete deals" ON deals FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert tasks" ON tasks FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update tasks" ON tasks FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete tasks" ON tasks FOR DELETE USING (auth.role() = 'authenticated');
