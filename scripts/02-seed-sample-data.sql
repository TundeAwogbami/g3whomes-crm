-- Insert sample data for Real Estate CRM

-- Insert sample users
INSERT INTO users (email, password_hash, first_name, last_name, role, phone) VALUES
('john.doe@realestate.com', '$2b$10$example_hash_1', 'John', 'Doe', 'agent', '(555) 123-4567'),
('sarah.wilson@realestate.com', '$2b$10$example_hash_2', 'Sarah', 'Wilson', 'agent', '(555) 234-5678'),
('mike.davis@realestate.com', '$2b$10$example_hash_3', 'Mike', 'Davis', 'agent', '(555) 345-6789'),
('lisa.garcia@realestate.com', '$2b$10$example_hash_4', 'Lisa', 'Garcia', 'agent', '(555) 456-7890'),
('admin@realestate.com', '$2b$10$example_hash_5', 'Admin', 'User', 'admin', '(555) 567-8901');

-- Insert sample contacts
INSERT INTO contacts (first_name, last_name, email, phone, type, status, address, city, state, zip_code, assigned_agent_id) VALUES
('John', 'Smith', 'john.smith@email.com', '(555) 111-2222', 'buyer', 'active', '123 Main St', 'New York', 'NY', '10001', 1),
('Emma', 'Johnson', 'emma.johnson@email.com', '(555) 222-3333', 'seller', 'qualified', '456 Oak Ave', 'Los Angeles', 'CA', '90210', 2),
('Robert', 'Brown', 'robert.brown@email.com', '(555) 333-4444', 'investor', 'lead', '789 Pine St', 'Chicago', 'IL', '60601', 3),
('Maria', 'Garcia', 'maria.garcia@email.com', '(555) 444-5555', 'buyer', 'active', '321 Elm Dr', 'Miami', 'FL', '33101', 4),
('David', 'Wilson', 'david.wilson@email.com', '(555) 555-6666', 'seller', 'qualified', '654 Maple Ln', 'Seattle', 'WA', '98101', 1),
('Jennifer', 'Lee', 'jennifer.lee@email.com', '(555) 666-7777', 'buyer', 'lead', '987 Cedar Rd', 'Austin', 'TX', '78701', 2),
('Michael', 'Taylor', 'michael.taylor@email.com', '(555) 777-8888', 'investor', 'active', '147 Birch Way', 'Denver', 'CO', '80201', 3),
('Lisa', 'Anderson', 'lisa.anderson@email.com', '(555) 888-9999', 'buyer', 'qualified', '258 Spruce St', 'Portland', 'OR', '97201', 4);

-- Insert sample properties
INSERT INTO properties (title, description, address, city, state, zip_code, price, property_type, listing_type, status, bedrooms, bathrooms, square_feet, listing_agent_id, owner_contact_id) VALUES
('Modern Downtown Condo', 'Beautiful 2-bedroom condo with city views', '123 Oak Street', 'New York', 'NY', '10001', 450000.00, 'condo', 'sale', 'active', 2, 2.0, 1200, 1, 2),
('Luxury Family Home', 'Spacious 4-bedroom home in prestigious neighborhood', '456 Pine Avenue', 'Los Angeles', 'CA', '90210', 750000.00, 'house', 'sale', 'pending', 4, 3.0, 2500, 2, 5),
('Investment Property', 'Great rental opportunity in growing area', '789 Elm Drive', 'Chicago', 'IL', '60601', 320000.00, 'house', 'sale', 'active', 3, 2.0, 1800, 3, NULL),
('Beachfront Villa', 'Stunning oceanfront property with private beach access', '321 Ocean View', 'Miami', 'FL', '33101', 1200000.00, 'house', 'sale', 'sold', 5, 4.0, 3200, 4, NULL),
('Urban Loft', 'Trendy loft in arts district', '654 Maple Street', 'Seattle', 'WA', '98101', 380000.00, 'condo', 'sale', 'active', 1, 1.0, 900, 1, NULL),
('Suburban Townhouse', 'Family-friendly townhouse with garage', '987 Cedar Road', 'Austin', 'TX', '78701', 285000.00, 'townhouse', 'sale', 'active', 3, 2.5, 1600, 2, NULL);

-- Insert sample deals
INSERT INTO deals (title, contact_id, property_id, agent_id, deal_value, commission_rate, commission_amount, stage, probability, expected_close_date) VALUES
('Downtown Condo Sale', 1, 1, 1, 450000.00, 3.00, 13500.00, 'negotiation', 85, '2024-12-25'),
('Family Home Purchase', 4, 2, 2, 750000.00, 3.00, 22500.00, 'qualified', 70, '2025-01-15'),
('Investment Property Deal', 3, 3, 3, 320000.00, 3.00, 9600.00, 'proposal', 45, '2025-02-10'),
('Luxury Villa Sale', 5, 4, 4, 1200000.00, 3.00, 36000.00, 'closed', 100, '2024-12-10'),
('Urban Loft Sale', 6, 5, 1, 380000.00, 3.00, 11400.00, 'lead', 30, '2025-03-01'),
('Townhouse Purchase', 8, 6, 2, 285000.00, 3.00, 8550.00, 'qualified', 60, '2025-01-30');

-- Insert sample tasks
INSERT INTO tasks (title, description, task_type, priority, status, due_date, assigned_to, contact_id, property_id, deal_id) VALUES
('Follow up with John Smith', 'Discuss financing options for downtown condo', 'call', 'high', 'pending', '2024-12-16 15:00:00', 1, 1, 1, 1),
('Property showing', 'Show luxury home to potential buyers', 'showing', 'medium', 'pending', '2024-12-17 10:00:00', 2, 4, 2, 2),
('Contract review', 'Review purchase agreement terms', 'paperwork', 'high', 'in_progress', '2024-12-18 14:00:00', 3, 3, 3, 3),
('Market analysis', 'Prepare CMA for new listing', 'research', 'low', 'completed', '2024-12-15 09:00:00', 4, 5, 4, 4),
('Send listing photos', 'Email professional photos to client', 'email', 'medium', 'pending', '2024-12-20 11:00:00', 1, 6, 5, 5),
('Schedule inspection', 'Coordinate home inspection appointment', 'call', 'high', 'pending', '2024-12-19 13:00:00', 2, 8, 6, 6),
('Prepare closing documents', 'Gather all necessary paperwork for closing', 'paperwork', 'high', 'in_progress', '2024-12-22 16:00:00', 3, 1, 1, 1);

-- Insert sample activities
INSERT INTO activities (activity_type, subject, description, contact_id, property_id, deal_id, user_id) VALUES
('call', 'Initial consultation', 'Discussed client needs and budget', 1, NULL, 1, 1),
('email', 'Property listings sent', 'Sent 5 matching properties to client', 4, NULL, 2, 2),
('showing', 'Property tour', 'Showed investment property to potential buyer', 3, 3, 3, 3),
('meeting', 'Contract negotiation', 'Met to discuss offer terms', 5, 4, 4, 4),
('note', 'Client feedback', 'Client loved the property but wants to see more options', 6, 5, 5, 1),
('call', 'Financing discussion', 'Talked about mortgage pre-approval process', 8, 6, 6, 2);

-- Update timestamps to make data more realistic
UPDATE contacts SET created_at = CURRENT_TIMESTAMP - INTERVAL '30 days' WHERE id <= 4;
UPDATE contacts SET created_at = CURRENT_TIMESTAMP - INTERVAL '15 days' WHERE id > 4;

UPDATE properties SET created_at = CURRENT_TIMESTAMP - INTERVAL '45 days' WHERE id <= 2;
UPDATE properties SET created_at = CURRENT_TIMESTAMP - INTERVAL '20 days' WHERE id > 2;

UPDATE deals SET created_at = CURRENT_TIMESTAMP - INTERVAL '25 days' WHERE id <= 3;
UPDATE deals SET created_at = CURRENT_TIMESTAMP - INTERVAL '10 days' WHERE id > 3;
