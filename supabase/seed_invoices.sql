-- Sample Invoices for Testing
-- Make sure to replace 'dc2b1f28-1e7b-48e0-ba93-bf7ab3f88ea1' with your actual user ID

-- Get the project IDs first (you'll need to replace these with actual project IDs from your projects table)
-- Run: SELECT id, project_name FROM public.projects;

INSERT INTO public.invoices (
  client_id,
  project_id,
  invoice_number,
  invoice_date,
  due_date,
  line_items,
  subtotal,
  tax_rate,
  tax_amount,
  total_amount,
  status,
  paid_date,
  payment_method,
  invoice_url,
  notes
) VALUES
  -- Paid Invoice - E-Commerce Platform (Milestone 1)
  (
    'dc2b1f28-1e7b-48e0-ba93-bf7ab3f88ea1',
    (SELECT id FROM public.projects WHERE project_name = 'E-Commerce Platform' LIMIT 1),
    'INV-2025-001',
    '2025-01-05',
    '2025-01-20',
    '[
      {"id": "1", "description": "Initial discovery and planning", "quantity": 1, "rate": 2500.00, "amount": 2500.00},
      {"id": "2", "description": "Database architecture design", "quantity": 1, "rate": 1500.00, "amount": 1500.00},
      {"id": "3", "description": "Product catalog setup", "quantity": 1, "rate": 2000.00, "amount": 2000.00}
    ]'::jsonb,
    6000.00,
    8.5,
    510.00,
    6510.00,
    'paid',
    '2025-01-18',
    'Credit Card',
    'https://example.com/invoices/INV-2025-001.pdf',
    'Thank you for your prompt payment! Milestone 1 completed.'
  ),

  -- Pending Invoice - E-Commerce Platform (Milestone 2)
  (
    'dc2b1f28-1e7b-48e0-ba93-bf7ab3f88ea1',
    (SELECT id FROM public.projects WHERE project_name = 'E-Commerce Platform' LIMIT 1),
    'INV-2025-002',
    '2025-02-01',
    '2025-02-15',
    '[
      {"id": "1", "description": "Shopping cart implementation", "quantity": 40, "rate": 150.00, "amount": 6000.00},
      {"id": "2", "description": "Payment gateway integration", "quantity": 1, "rate": 3500.00, "amount": 3500.00},
      {"id": "3", "description": "Security audit and SSL setup", "quantity": 1, "rate": 1000.00, "amount": 1000.00}
    ]'::jsonb,
    10500.00,
    8.5,
    892.50,
    11392.50,
    'pending',
    null,
    null,
    'https://example.com/invoices/INV-2025-002.pdf',
    'Payment due upon completion of shopping cart and payment integration. Net 15 days.'
  ),

  -- Paid Invoice - Fitness App Design
  (
    'dc2b1f28-1e7b-48e0-ba93-bf7ab3f88ea1',
    (SELECT id FROM public.projects WHERE project_name = 'Fitness Tracking Mobile App' LIMIT 1),
    'INV-2025-003',
    '2024-12-20',
    '2025-01-05',
    '[
      {"id": "1", "description": "User research and persona development", "quantity": 1, "rate": 2000.00, "amount": 2000.00},
      {"id": "2", "description": "Competitive analysis", "quantity": 1, "rate": 1200.00, "amount": 1200.00},
      {"id": "3", "description": "Wireframe creation (20 screens)", "quantity": 20, "rate": 100.00, "amount": 2000.00}
    ]'::jsonb,
    5200.00,
    8.5,
    442.00,
    5642.00,
    'paid',
    '2025-01-03',
    'Bank Transfer',
    'https://example.com/invoices/INV-2025-003.pdf',
    'Design phase deposit. Remaining balance due upon completion.'
  ),

  -- Overdue Invoice - Corporate Website
  (
    'dc2b1f28-1e7b-48e0-ba93-bf7ab3f88ea1',
    (SELECT id FROM public.projects WHERE project_name = 'Corporate Website Redesign' LIMIT 1),
    'INV-2024-089',
    '2024-12-15',
    '2025-01-01',
    '[
      {"id": "1", "description": "Content audit and strategy", "quantity": 1, "rate": 1500.00, "amount": 1500.00},
      {"id": "2", "description": "Information architecture redesign", "quantity": 1, "rate": 2000.00, "amount": 2000.00},
      {"id": "3", "description": "Stakeholder interviews (3 sessions)", "quantity": 3, "rate": 400.00, "amount": 1200.00}
    ]'::jsonb,
    4700.00,
    8.5,
    399.50,
    5099.50,
    'overdue',
    null,
    null,
    'https://example.com/invoices/INV-2024-089.pdf',
    'OVERDUE: Project currently blocked awaiting brand guidelines. Payment required to resume work.'
  ),

  -- Paid Invoice - Analytics Dashboard (Final Payment)
  (
    'dc2b1f28-1e7b-48e0-ba93-bf7ab3f88ea1',
    (SELECT id FROM public.projects WHERE project_name = 'Analytics Dashboard SaaS' LIMIT 1),
    'INV-2025-004',
    '2025-01-20',
    '2025-02-05',
    '[
      {"id": "1", "description": "Development (160 hours)", "quantity": 160, "rate": 150.00, "amount": 24000.00},
      {"id": "2", "description": "Custom chart library", "quantity": 1, "rate": 5000.00, "amount": 5000.00},
      {"id": "3", "description": "API documentation", "quantity": 1, "rate": 2000.00, "amount": 2000.00},
      {"id": "4", "description": "Performance optimization", "quantity": 1, "rate": 3000.00, "amount": 3000.00},
      {"id": "5", "description": "Deployment and training", "quantity": 1, "rate": 2500.00, "amount": 2500.00}
    ]'::jsonb,
    36500.00,
    8.5,
    3102.50,
    39602.50,
    'paid',
    '2025-02-01',
    'ACH Transfer',
    'https://example.com/invoices/INV-2025-004.pdf',
    'Final payment for Analytics Dashboard project. Thank you for your business!'
  ),

  -- Paid Invoice - Marketing Landing Pages
  (
    'dc2b1f28-1e7b-48e0-ba93-bf7ab3f88ea1',
    (SELECT id FROM public.projects WHERE project_name = 'Marketing Landing Pages' LIMIT 1),
    'INV-2024-085',
    '2024-11-01',
    '2024-11-15',
    '[
      {"id": "1", "description": "Landing page design (3 variants)", "quantity": 3, "rate": 1200.00, "amount": 3600.00},
      {"id": "2", "description": "Development and CMS integration", "quantity": 1, "rate": 4500.00, "amount": 4500.00},
      {"id": "3", "description": "A/B testing setup", "quantity": 1, "rate": 1500.00, "amount": 1500.00},
      {"id": "4", "description": "Analytics and conversion tracking", "quantity": 1, "rate": 800.00, "amount": 800.00}
    ]'::jsonb,
    10400.00,
    8.5,
    884.00,
    11284.00,
    'paid',
    '2024-11-12',
    'Credit Card',
    'https://example.com/invoices/INV-2024-085.pdf',
    'Campaign launched successfully. 30% conversion rate increase observed!'
  );
