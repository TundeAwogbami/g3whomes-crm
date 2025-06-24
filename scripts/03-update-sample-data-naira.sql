-- Update sample data to use Nigerian Naira values

-- Update property prices to realistic Nigerian values
UPDATE properties SET 
  price = 67500000 -- ₦67.5M
WHERE id = 1;

UPDATE properties SET 
  price = 112500000 -- ₦112.5M
WHERE id = 2;

UPDATE properties SET 
  price = 48000000 -- ₦48M
WHERE id = 3;

UPDATE properties SET 
  price = 180000000 -- ₦180M
WHERE id = 4;

UPDATE properties SET 
  price = 57000000 -- ₦57M
WHERE id = 5;

UPDATE properties SET 
  price = 42750000 -- ₦42.75M
WHERE id = 6;

-- Update deal values to match property prices
UPDATE deals SET 
  deal_value = 67500000,
  commission_rate = 5.00,
  commission_amount = 3375000 -- 5% commission
WHERE id = 1;

UPDATE deals SET 
  deal_value = 112500000,
  commission_rate = 5.00,
  commission_amount = 5625000 -- 5% commission
WHERE id = 2;

UPDATE deals SET 
  deal_value = 48000000,
  commission_rate = 5.00,
  commission_amount = 2400000 -- 5% commission
WHERE id = 3;

UPDATE deals SET 
  deal_value = 180000000,
  commission_rate = 5.00,
  commission_amount = 9000000 -- 5% commission
WHERE id = 4;

-- Update addresses to Nigerian locations
UPDATE properties SET 
  address = '123 Tiamiyu Savage Street',
  city = 'Lagos',
  state = 'Lagos',
  zip_code = '101241'
WHERE id = 1;

UPDATE properties SET 
  address = '456 Banana Island Road',
  city = 'Lagos',
  state = 'Lagos',
  zip_code = '101241'
WHERE id = 2;

UPDATE properties SET 
  address = '789 Gwarinpa Estate',
  city = 'Abuja',
  state = 'FCT',
  zip_code = '900108'
WHERE id = 3;

UPDATE properties SET 
  address = '321 Lekki Peninsula',
  city = 'Lagos',
  state = 'Lagos',
  zip_code = '101245'
WHERE id = 4;

-- Update contact locations
UPDATE contacts SET 
  city = 'Lagos',
  state = 'Lagos',
  zip_code = '101241'
WHERE id IN (1, 2);

UPDATE contacts SET 
  city = 'Abuja',
  state = 'FCT',
  zip_code = '900108'
WHERE id = 3;

UPDATE contacts SET 
  city = 'Port Harcourt',
  state = 'Rivers',
  zip_code = '500001'
WHERE id = 4;

-- Update phone numbers to Nigerian format
UPDATE contacts SET phone = '+234 803 123 4567' WHERE id = 1;
UPDATE contacts SET phone = '+234 806 234 5678' WHERE id = 2;
UPDATE contacts SET phone = '+234 809 345 6789' WHERE id = 3;
UPDATE contacts SET phone = '+234 807 456 7890' WHERE id = 4;
UPDATE contacts SET phone = '+234 805 567 8901' WHERE id = 5;
UPDATE contacts SET phone = '+234 802 678 9012' WHERE id = 6;
UPDATE contacts SET phone = '+234 808 789 0123' WHERE id = 7;
UPDATE contacts SET phone = '+234 804 890 1234' WHERE id = 8;

UPDATE users SET phone = '+234 801 123 4567' WHERE id = 1;
UPDATE users SET phone = '+234 802 234 5678' WHERE id = 2;
UPDATE users SET phone = '+234 803 345 6789' WHERE id = 3;
UPDATE users SET phone = '+234 804 456 7890' WHERE id = 4;
UPDATE users SET phone = '+234 805 567 8901' WHERE id = 5;
