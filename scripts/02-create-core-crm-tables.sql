-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(50),
    company VARCHAR(255),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE contacts IS 'Stores information about clients and other contacts.';

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20),
    description TEXT,
    price DECIMAL(15, 2),
    size_sqft INTEGER,
    bedrooms INTEGER,
    bathrooms DECIMAL(3, 1),
    property_type VARCHAR(50), -- e.g., 'house', 'apartment', 'land'
    status VARCHAR(50) DEFAULT 'available', -- e.g., 'available', 'under offer', 'sold'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE properties IS 'Stores details about real estate properties.';

-- Create deals table
CREATE TABLE IF NOT EXISTS deals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deal_name VARCHAR(255) NOT NULL,
    client_id UUID REFERENCES contacts(id) ON DELETE SET NULL, -- Link to contacts
    property_id UUID REFERENCES properties(id) ON DELETE SET NULL, -- Link to properties
    deal_value DECIMAL(15, 2) NOT NULL,
    stage VARCHAR(50) NOT NULL DEFAULT 'lead', -- 'lead', 'qualified', 'negotiation', 'closed', 'lost'
    commission_rate DECIMAL(5, 2),
    commission_amount DECIMAL(15, 2),
    close_date DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE deals IS 'Tracks the progress and details of property deals.';

-- Create tasks table
CREATE TABLE IF NOT EXISTS tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_name VARCHAR(255) NOT NULL,
    description TEXT,
    due_date DATE,
    assigned_to_id UUID REFERENCES profiles(id) ON DELETE SET NULL, -- Link to profiles/staff
    priority VARCHAR(50) DEFAULT 'medium', -- 'low', 'medium', 'high'
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'in progress'
    related_deal_id UUID REFERENCES deals(id) ON DELETE SET NULL,
    related_contact_id UUID REFERENCES contacts(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE tasks IS 'Manages tasks related to CRM activities.';
