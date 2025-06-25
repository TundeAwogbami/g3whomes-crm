-- Insert sample users with bcrypt hashed password for "password123"
INSERT INTO users (email, password_hash, first_name, last_name, role, phone) VALUES
('john.doe@realestate.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John', 'Doe', 'agent', '+234 801 123 4567'),
('sarah.wilson@realestate.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Sarah', 'Wilson', 'agent', '+234 802 234 5678'),
('mike.davis@realestate.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Mike', 'Davis', 'agent', '+234 803 345 6789'),
('lisa.garcia@realestate.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Lisa', 'Garcia', 'agent', '+234 804 456 7890'),
('admin@realestate.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'admin', '+234 805 567 8901');

-- Insert sample contacts with Nigerian addresses
INSERT INTO contacts (first_name, last_name, email, phone, type, status, address, city, state, zip_code, assigned_agent_id) VALUES
('John', 'Smith', 'john.smith@email.com', '+234 803 123 4567', 'buyer', 'active', '123 Tiamiyu Savage Street', 'Lagos', 'Lagos', '101241', 1),
('Emma', 'Johnson', 'emma.johnson@email.com', '+234 806 234 5678', 'seller', 'qualified', '456 Banana Island Road', 'Lagos', 'Lagos', '101241', 2),
('Robert', 'Brown', 'robert.brown@email.com', '+234 809 345 6789', 'investor', 'lead', '789 Gwarinpa Estate', 'Abuja', 'FCT', '900108', 3),
('Maria', 'Garcia', 'maria.garcia@email.com', '+234 807 456 7890', 'buyer', 'active', '321 Lekki Peninsula', 'Lagos', 'Lagos', '101245', 4),
('David', 'Wilson', 'david.wilson@email.com', '+234 805 567 8901', 'seller', 'qualified', '654 Maitama District', 'Abuja', 'FCT', '900108', 1),
('Jennifer', 'Lee', 'jennifer.lee@email.com', '+234 806 678 9012', 'buyer', 'lead', '987 GRA Phase 2', 'Port Harcourt', 'Rivers', '500001', 2),
('Michael', 'Taylor', 'michael.taylor@email.com', '+234 807 789 0123', 'investor', 'active', '147 Bodija Estate', 'Ibadan', 'Oyo', '200001', 3),
('Lisa', 'Anderson', 'lisa.anderson@email.com', '+234 808 890 1234', 'buyer', 'qualified', '258 Wuse 2', 'Abuja', 'FCT', '900108', 4);

-- Insert sample properties with Nigerian Naira prices
INSERT INTO properties (title, description, address, city, state, zip_code, price, property_type, listing_type, status, bedrooms, bathrooms, square_feet, listing_agent_id, owner_contact_id) VALUES
('Modern Downtown Condo', 'Beautiful 2-bedroom condo with city views in Victoria Island', '123 Tiamiyu Savage Street', 'Lagos', 'Lagos', '101241', 67500000, 'condo', 'sale', 'active', 2, 2.0, 1200, 1, 2),
('Luxury Family Home', 'Spacious 4-bedroom home in prestigious Banana Island', '456 Banana Island Road', 'Lagos', 'Lagos', '101241', 112500000, 'house', 'sale', 'pending', 4, 3.0, 2500, 2, 2),
('Investment Property', 'Great rental opportunity in growing Gwarinpa area', '789 Gwarinpa Estate', 'Abuja', 'FCT', '900108', 48000000, 'house', 'sale', 'active', 3, 2.0, 1800, 3, NULL),
('Beachfront Villa', 'Stunning oceanfront property with private beach access', '321 Lekki Peninsula', 'Lagos', 'Lagos', '101245', 180000000, 'house', 'sale', 'sold', 5, 4.0, 3200, 4, NULL),
('Urban Loft', 'Trendy loft in Yaba tech district', '654 Yaba Tech Road', 'Lagos', 'Lagos', '101245', 57000000, 'condo', 'sale', 'active', 1, 1.0, 900, 1, NULL),
('Suburban Townhouse', 'Family-friendly townhouse in Magodo', '987 Magodo Phase 2', 'Lagos', 'Lagos', '101245', 42750000, 'townhouse', 'sale', 'active', 3, 2.5, 1600, 2, NULL);

-- Insert sample deals with Nigerian Naira values
INSERT INTO deals (title, contact_id, property_id, agent_id, deal_value, commission_rate, commission_amount, stage, probability, expected_close_date) VALUES
('Downtown Condo Sale', 1, 1, 1, 67500000, 5.00, 3375000, 'negotiation', 85, '2024-12-25'),
('Family Home Purchase', 2, 2, 2, 112500000, 5.00, 5625000, 'qualified', 70, '2025-01-15'),
('Investment Property Deal', 3, 3, 3, 48000000, 5.00, 2400000, 'proposal', 45, '2025-02-10'),
('Luxury Villa Sale', 4, 4, 4, 180000000, 5.00, 9000000, 'closed', 100, '2024-12-10'),
('Urban Loft Sale', 5, 5, 1, 57000000, 5.00, 2850000, 'lead', 30, '2025-03-01'),
('Townhouse Purchase', 6, 6, 2, 42750000, 5.00, 2137500, 'qualified', 60, '2025-01-30');

-- Insert sample tasks
INSERT INTO tasks (title, description, task_type, priority, status, due_date, assigned_to, contact_id, property_id, deal_id) VALUES
('Follow up with John Smith', 'Discuss financing options for downtown condo', 'call', 'high', 'pending', '2024-12-16 15:00:00', 1, 1, 1, 1),
('Property showing', 'Show luxury home to potential buyers', 'showing', 'medium', 'pending', '2024-12-17 10:00:00', 2, 2, 2, 2),
('Contract review', 'Review purchase agreement terms', 'paperwork', 'high', 'in_progress', '2024-12-18 14:00:00', 3, 3, 3, 3),
('Market analysis', 'Prepare CMA for new listing', 'research', 'low', 'completed', '2024-12-15 09:00:00', 4, 4, 4, 4),
('Send listing photos', 'Email professional photos to client', 'email', 'medium', 'pending', '2024-12-20 11:00:00', 1, 5, 5, 5),
('Schedule inspection', 'Coordinate home inspection appointment', 'call', 'high', 'pending', '2024-12-19 13:00:00', 2, 6, 6, 6),
('Prepare closing documents', 'Gather all necessary paperwork for closing', 'paperwork', 'high', 'in_progress', '2024-12-22 16:00:00', 3, 1, 1, 1);

-- Insert sample activities
INSERT INTO activities (activity_type, subject, description, contact_id, property_id, deal_id, user_id) VALUES
('call', 'Initial consultation', 'Discussed client needs and budget', 1, NULL, 1, 1),
('email', 'Property listings sent', 'Sent 5 matching properties to client', 2, NULL, 2, 2),
('showing', 'Property tour', 'Showed investment property to potential buyer', 3, 3, 3, 3),
('meeting', 'Contract negotiation', 'Met to discuss offer terms', 4, 4, 4, 4),
('note', 'Client feedback', 'Client loved the property but wants to see more options', 5, 5, 5, 1),
('call', 'Financing discussion', 'Talked about mortgage pre-approval process', 6, 6, 6, 2);
