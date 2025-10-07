-- Seed data for testing the dashboard
-- Replace 'YOUR_USER_ID' with your actual user ID from auth.users

-- First, let's get the user ID (run this first to see your ID)
SELECT id, email FROM auth.users;

-- Then run the inserts below, replacing the user ID

-- Project 1: E-Commerce Platform (in development, mostly complete)
INSERT INTO public.projects (
  client_id,
  project_name,
  description,
  status,
  start_date,
  end_date,
  progress_percentage,
  checklist
) VALUES (
  'dc2b1f28-1e7b-48e0-ba93-bf7ab3f88ea1',  -- Replace with your user ID
  'E-Commerce Platform',
  'Modern e-commerce website with Next.js, TypeScript, and Stripe integration. Features include product catalog, shopping cart, and checkout flow.',
  'development',
  '2025-01-01',
  '2025-03-31',
  75,
  '[
    {"id": "1", "title": "Created landing page", "completed": true, "created_at": "2025-01-15T10:00:00Z"},
    {"id": "2", "title": "Integrate API service", "completed": true, "created_at": "2025-01-20T10:00:00Z"},
    {"id": "3", "title": "Setup product catalog", "completed": true, "created_at": "2025-02-01T10:00:00Z"},
    {"id": "4", "title": "Created authentication", "completed": true, "created_at": "2025-02-05T10:00:00Z"},
    {"id": "5", "title": "Shopping cart functionality", "completed": false, "created_at": "2025-02-10T10:00:00Z"},
    {"id": "6", "title": "Payment integration", "completed": false, "created_at": "2025-02-15T10:00:00Z"}
  ]'::jsonb
);

-- Project 2: Mobile App Design (in design phase, early stage)
INSERT INTO public.projects (
  client_id,
  project_name,
  description,
  status,
  start_date,
  end_date,
  progress_percentage,
  checklist
) VALUES (
  'dc2b1f28-1e7b-48e0-ba93-bf7ab3f88ea1',  -- Replace with your user ID
  'Fitness Tracking Mobile App',
  'iOS and Android app for tracking workouts, nutrition, and fitness goals. Features AI-powered workout recommendations.',
  'design',
  '2025-02-01',
  '2025-05-15',
  25,
  '[
    {"id": "1", "title": "User research & personas", "completed": true, "created_at": "2025-02-05T10:00:00Z"},
    {"id": "2", "title": "Wireframes created", "completed": true, "created_at": "2025-02-10T10:00:00Z"},
    {"id": "3", "title": "UI mockups - Home screen", "completed": false, "created_at": "2025-02-15T10:00:00Z"},
    {"id": "4", "title": "UI mockups - Workout tracking", "completed": false, "created_at": "2025-02-20T10:00:00Z"},
    {"id": "5", "title": "Design system creation", "completed": false, "created_at": "2025-02-25T10:00:00Z"}
  ]'::jsonb
);

-- Project 3: Website Redesign (blocked - waiting for client feedback)
INSERT INTO public.projects (
  client_id,
  project_name,
  description,
  status,
  start_date,
  end_date,
  progress_percentage,
  checklist
) VALUES (
  'dc2b1f28-1e7b-48e0-ba93-bf7ab3f88ea1',  -- Replace with your user ID
  'Corporate Website Redesign',
  'Complete redesign of company website with modern branding, improved UX, and better SEO. Waiting for brand guidelines from client.',
  'blocked',
  '2024-12-01',
  '2025-02-28',
  40,
  '[
    {"id": "1", "title": "Audit current website", "completed": true, "created_at": "2024-12-05T10:00:00Z"},
    {"id": "2", "title": "Competitor analysis", "completed": true, "created_at": "2024-12-10T10:00:00Z"},
    {"id": "3", "title": "Sitemap & IA", "completed": true, "created_at": "2024-12-15T10:00:00Z"},
    {"id": "4", "title": "Awaiting brand guidelines from client", "completed": false, "created_at": "2025-01-10T10:00:00Z"},
    {"id": "5", "title": "Homepage design", "completed": false, "created_at": "2025-01-15T10:00:00Z"},
    {"id": "6", "title": "Inner page templates", "completed": false, "created_at": "2025-01-20T10:00:00Z"}
  ]'::jsonb
);

-- Project 4: SaaS Dashboard (in review, almost done)
INSERT INTO public.projects (
  client_id,
  project_name,
  description,
  status,
  start_date,
  end_date,
  progress_percentage,
  checklist
) VALUES (
  'dc2b1f28-1e7b-48e0-ba93-bf7ab3f88ea1',  -- Replace with your user ID
  'Analytics Dashboard SaaS',
  'Real-time analytics dashboard with data visualization, custom reports, and API integrations. Built with React and D3.js.',
  'review',
  '2024-11-01',
  '2025-02-15',
  95,
  '[
    {"id": "1", "title": "Database schema design", "completed": true, "created_at": "2024-11-05T10:00:00Z"},
    {"id": "2", "title": "Authentication system", "completed": true, "created_at": "2024-11-15T10:00:00Z"},
    {"id": "3", "title": "Data visualization components", "completed": true, "created_at": "2024-12-01T10:00:00Z"},
    {"id": "4", "title": "API integrations", "completed": true, "created_at": "2024-12-15T10:00:00Z"},
    {"id": "5", "title": "Custom report builder", "completed": true, "created_at": "2025-01-10T10:00:00Z"},
    {"id": "6", "title": "Performance optimization", "completed": true, "created_at": "2025-01-25T10:00:00Z"},
    {"id": "7", "title": "Client UAT testing", "completed": false, "created_at": "2025-02-01T10:00:00Z"},
    {"id": "8", "title": "Bug fixes from testing", "completed": false, "created_at": "2025-02-10T10:00:00Z"}
  ]'::jsonb
);

-- Project 5: Marketing Website (completed)
INSERT INTO public.projects (
  client_id,
  project_name,
  description,
  status,
  start_date,
  end_date,
  progress_percentage,
  checklist
) VALUES (
  'dc2b1f28-1e7b-48e0-ba93-bf7ab3f88ea1',  -- Replace with your user ID
  'Marketing Landing Pages',
  'Series of high-converting landing pages for digital marketing campaigns. Includes A/B testing and analytics integration.',
  'completed',
  '2024-10-01',
  '2024-12-15',
  100,
  '[
    {"id": "1", "title": "Campaign strategy & planning", "completed": true, "created_at": "2024-10-05T10:00:00Z"},
    {"id": "2", "title": "Copywriting", "completed": true, "created_at": "2024-10-15T10:00:00Z"},
    {"id": "3", "title": "Landing page designs (3 variations)", "completed": true, "created_at": "2024-11-01T10:00:00Z"},
    {"id": "4", "title": "Development & responsive design", "completed": true, "created_at": "2024-11-20T10:00:00Z"},
    {"id": "5", "title": "Google Analytics setup", "completed": true, "created_at": "2024-11-25T10:00:00Z"},
    {"id": "6", "title": "A/B testing implementation", "completed": true, "created_at": "2024-12-01T10:00:00Z"},
    {"id": "7", "title": "Launch & monitoring", "completed": true, "created_at": "2024-12-15T10:00:00Z"}
  ]'::jsonb
);
