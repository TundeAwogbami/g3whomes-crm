-- This script seeds initial sample data into your core CRM tables.
-- The 'profiles' table insertion has been removed to avoid foreign key errors.

-- Seed sample contacts
INSERT INTO contacts (first_name, last_name, email, phone, company, address, city, state, zip_code)
VALUES
    ('Aisha', 'Bello', 'aisha.bello@example.com', '+234 801 111 2222', 'Bello Holdings', '10 Ikoyi Crescent', 'Lagos', 'Lagos', '101221'),
    ('Chukwuma', 'Okoro', 'chukwuma.okoro@example.com', '+234 802 333 4444', 'Okoro Properties', '25 Abuja Street', 'Abuja', 'FCT', '900211'),
    ('Fatima', 'Aliyu', 'fatima.aliyu@example.com', '+234 803 555 6666', 'Aliyu Investments', '5 Port Harcourt Road', 'Port Harcourt', 'Rivers', '500101'),
    ('David', 'Eze', 'david.eze@example.com', '+234 804 777 8888', 'Eze Estates', '15 Victoria Island', 'Lagos', 'Lagos', '101241')
ON CONFLICT (email) DO NOTHING;

-- Seed sample properties
INSERT INTO properties (address, city, state, zip_code, description, price, size_sqft, bedrooms, bathrooms, property_type, status)
VALUES
    ('123 Main Street', 'Lagos', 'Lagos', '100001', 'Spacious 3-bedroom apartment in a prime location.', 50000000, 1500, 3, 2.5, 'apartment', 'available'),
    ('456 Oak Avenue', 'Abuja', 'FCT', '900001', 'Modern 4-bedroom detached house with a large garden.', 100000000, 2500, 4, 3.0, 'house', 'available'),
    ('789 Pine Lane', 'Port Harcourt', 'Rivers', '500001', 'Cozy 2-bedroom bungalow, perfect for a small family.', 40000000, 1200, 2, 1.0, 'house', 'available'),
    ('321 Cedar Road', 'Lagos', 'Lagos', '100001', 'Luxury 5-bedroom villa with swimming pool.', 150000000, 4000, 5, 4.5, 'house', 'available')
ON CONFLICT (address) DO NOTHING;

-- Seed sample deals (linking to existing contacts and properties - adjust UUIDs if needed)
-- You might need to get actual UUIDs from your 'contacts' and 'properties' tables after seeding them.
-- For now, using placeholder UUIDs.
INSERT INTO deals (deal_name, client_id, property_id, deal_value, stage, commission_rate, commission_amount, close_date)
VALUES
    ('Aisha Bello Property Purchase', (SELECT id FROM contacts WHERE email = 'aisha.bello@example.com'), (SELECT id FROM properties WHERE address = '123 Main Street'), 50000000, 'negotiation', 5.00, 2500000, '2023-08-30'),
    ('Chukwuma Okoro House Sale', (SELECT id FROM contacts WHERE email = 'chukwuma.okoro@example.com'), (SELECT id FROM properties WHERE address = '456 Oak Avenue'), 100000000, 'lead', 5.00, 5000000, '2023-09-15')
ON CONFLICT (deal_name) DO NOTHING;

-- Seed sample tasks
INSERT INTO tasks (task_name, description, due_date, priority, status)
VALUES
    ('Follow up with Aisha Bello', 'Discuss offer on 123 Main Street.', '2023-07-25', 'high', 'pending'),
    ('Schedule property viewing', 'Arrange viewing for 456 Oak Avenue with new client.', '2023-07-28', 'medium', 'pending')
ON CONFLICT (task_name) DO NOTHING;
