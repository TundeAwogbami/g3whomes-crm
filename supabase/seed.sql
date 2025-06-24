-- Insert sample users (with hashed passwords)
INSERT INTO users (email, password_hash, first_name, last_name, role, phone) VALUES
('john.doe@realestate.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John', 'Doe', 'agent', '+234 801 123 4567'),
('sarah.wilson@realestate.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Sarah', 'Wilson', 'agent', '+234 802 234 5678'),
('mike.davis@realestate.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Mike', 'Davis', 'agent', '+234 803 345 6789'),
('lisa.garcia@realestate.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Lisa', 'Garcia', 'agent', '+234 804 456 7890'),
('admin@realestate.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', 'admin', '+234 805 567 8901');

-- Insert sample contacts
INSERT INTO contacts (first_name, last_name, email, phone, type, status, address, city, state, zip_code, assigned_agent_id) VALUES
('John', 'Smith', 'john.smith@email.com', '+234 803 123 4567', 'buyer', 'active', '123 Tiamiyu Savage Street', 'Lagos', 'Lagos', '101241', 1),
('Emma', 'Johnson', 'emma.johnson@email.com', '+234 806 234 5678', 'seller', 'qualified', '456 Banana Island Road', 'Lagos', 'Lagos', '101241', 2),
('Robert', 'Brown', 'robert.brown@email.com', '+234 809 345 6789', 'investor', 'lead', '789 Gwarinpa Estate', 'Abuja', 'FCT', '900108', 3),
('Maria', 'Garcia', 'maria.garcia@email.com', '+234 807 456 7890', 'buyer', 'active', '321 Lekki Peninsula', 'Lagos', 'Lagos', '101245', 4);

-- Insert sample properties
INSERT INTO properties (title, description, address, city, state, zip_code, price, property_type, listing_type, status, bedrooms, bathrooms, square_feet, listing_agent_id, owner_contact_id) VALUES
('Modern Downtown Condo', 'Beautiful 2-bedroom condo with city views', '123 Tiamiyu Savage Street', 'Lagos', 'Lagos', '101241', 67500000, 'condo', 'sale', 'active', 2, 2.0, 1200, 1, 2),
('Luxury Family Home', 'Spacious 4-bedroom home in prestigious neighborhood', '456 Banana Island Road', 'Lagos', 'Lagos', '101241', 112500000, 'house', 'sale', 'pending', 4, 3.0, 2500, 2, 2),
('Investment Property', 'Great rental opportunity in growing area', '789 Gwarinpa Estate', 'Abuja', 'FCT', '900108', 48000000, 'house', 'sale', 'active', 3, 2.0, 1800, 3, NULL),
('Beachfront Villa', 'Stunning oceanfront property with private beach access', '321 Lekki Peninsula', 'Lagos', 'Lagos', '101245', 180000000, 'house', 'sale', 'sold', 5, 4.0, 3200, 4, NULL);

-- Insert sample deals
INSERT INTO deals (title, contact_id, property_id, agent_id, deal_value, commission_rate, commission_amount, stage, probability, expected_close_date) VALUES
('Downtown Condo Sale', 1, 1, 1, 67500000, 5.00, 3375000, 'negotiation', 85, '2024-12-25'),
('Family Home Purchase', 2, 2, 2, 112500000, 5.00, 5625000, 'qualified', 70, '2025-01-15'),
('Investment Property Deal', 3, 3, 3, 48000000, 5.00, 2400000, 'proposal', 45, '2025-02-10'),
('Luxury Villa Sale', 4, 4, 4, 180000000, 5.00, 9000000, 'closed', 100, '2024-12-10');

-- Insert sample tasks
INSERT INTO tasks (title, description, task_type, priority, status, due_date, assigned_to, contact_id, property_id, deal_id) VALUES
('Follow up with John Smith', 'Discuss financing options for downtown condo', 'call', 'high', 'pending', '2024-12-16 15:00:00', 1, 1, 1, 1),
('Property showing', 'Show luxury home to potential buyers', 'showing', 'medium', 'pending', '2024-12-17 10:00:00', 2, 2, 2, 2),
('Contract review', 'Review purchase agreement terms', 'paperwork', 'high', 'in_progress', '2024-12-18 14:00:00', 3, 3, 3, 3),
('Market analysis', 'Prepare CMA for new listing', 'research', 'low', 'completed', '2024-12-15 09:00:00', 4, 4, 4, 4);
