-- Update sample data to use Nigerian Naira values
-- Update property prices to realistic Nigerian values
UPDATE properties SET
  price = 67500000 -- ₦67.5M
WHERE id = (SELECT id FROM properties WHERE address = '123 Main Street');

UPDATE properties SET
  price = 112500000 -- ₦112.5M
WHERE id = (SELECT id FROM properties WHERE address = '456 Oak Avenue');

UPDATE properties SET
  price = 48000000 -- ₦48M
WHERE id = (SELECT id FROM properties WHERE address = '789 Pine Lane');

UPDATE properties SET
  price = 180000000 -- ₦180M
WHERE id = (SELECT id FROM properties WHERE address = '321 Cedar Road');

-- Add more properties if needed for the remaining updates
INSERT INTO properties (address, city, state, zip_code, description, price, size_sqft, bedrooms, bathrooms, property_type, status)
VALUES
    ('570 Abuja Road', 'Abuja', 'FCT', '900002', 'Spacious family home.', 57000000, 1800, 3, 2.0, 'house', 'available'),
    ('427 Lekki Gardens', 'Lagos', 'Lagos', '101245', 'Modern apartment with great amenities.', 42750000, 1000, 2, 1.5, 'apartment', 'available')
ON CONFLICT (address) DO NOTHING;

UPDATE properties SET
  price = 57000000 -- ₦57M
WHERE id = (SELECT id FROM properties WHERE address = '570 Abuja Road');

UPDATE properties SET
  price = 42750000 -- ₦42.75M
WHERE id = (SELECT id FROM properties WHERE address = '427 Lekki Gardens');


-- Update deal values to match property prices
UPDATE deals SET
  deal_value = 67500000,
  commission_rate = 5.00,
  commission_amount = 3375000 -- 5% commission
WHERE property_id = (SELECT id FROM properties WHERE address = '123 Main Street');

UPDATE deals SET
  deal_value = 112500000,
  commission_rate = 5.00,
  commission_amount = 5625000 -- 5% commission
WHERE property_id = (SELECT id FROM properties WHERE address = '456 Oak Avenue');

-- Assuming you have deals for the other properties, update them similarly
-- You might need to insert more sample deals in 03-seed-initial-data.sql if these IDs don't exist.
-- For example, if you have a deal for 789 Pine Lane:
-- UPDATE deals SET
--   deal_value = 48000000,
--   commission_rate = 5.00,
--   commission_amount = 2400000
-- WHERE property_id = (SELECT id FROM properties WHERE address = '789 Pine Lane');


-- Update addresses to Nigerian locations
UPDATE properties SET
  address = '123 Tiamiyu Savage Street',
  city = 'Lagos',
  state = 'Lagos',
  zip_code = '101241'
WHERE id = (SELECT id FROM properties WHERE address = '123 Main Street');

UPDATE properties SET
  address = '456 Banana Island Road',
  city = 'Lagos',
  state = 'Lagos',
  zip_code = '101241'
WHERE id = (SELECT id FROM properties WHERE address = '456 Oak Avenue');

UPDATE properties SET
  address = '789 Gwarinpa Estate',
  city = 'Abuja',
  state = 'FCT',
  zip_code = '900108'
WHERE id = (SELECT id FROM properties WHERE address = '789 Pine Lane');

UPDATE properties SET
  address = '321 Lekki Peninsula',
  city = 'Lagos',
  state = 'Lagos',
  zip_code = '101245'
WHERE id = (SELECT id FROM properties WHERE address = '321 Cedar Road');

-- Update contact locations
UPDATE contacts SET
  city = 'Lagos',
  state = 'Lagos',
  zip_code = '101241'
WHERE email IN ('aisha.bello@example.com', 'david.eze@example.com'); -- Using email for lookup

UPDATE contacts SET
  city = 'Abuja',
  state = 'FCT',
  zip_code = '900108'
WHERE email = 'chukwuma.okoro@example.com';

UPDATE contacts SET
  city = 'Port Harcourt',
  state = 'Rivers',
  zip_code = '500001'
WHERE email = 'fatima.aliyu@example.com';

-- Update phone numbers to Nigerian format
UPDATE contacts SET phone = '+234 803 123 4567' WHERE email = 'aisha.bello@example.com';
UPDATE contacts SET phone = '+234 806 234 5678' WHERE email = 'chukwuma.okoro@example.com';
UPDATE contacts SET phone = '+234 809 345 6789' WHERE email = 'fatima.aliyu@example.com';
UPDATE contacts SET phone = '+234 807 456 7890' WHERE email = 'david.eze@example.com';

-- Removed UPDATE users SET phone = ... as custom user phone numbers should be stored in 'profiles' or 'staff' tables.
-- If you want to add phone numbers to your staff, you can update the 'staff' table directly:
-- UPDATE staff SET phone_number = '+234 801 123 4567' WHERE email = 'admin@example.com';
