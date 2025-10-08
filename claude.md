# Cosmic Code Lab - Project Documentation

## Project Overview
A modern agency/portfolio website rebranded as "Cosmic Code Lab" with a comprehensive client dashboard system. The site features space-themed animations, project showcases, and a full-featured client portal for managing projects, invoices, documents, and support tickets.

## Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **UI Components**: HeadlessUI, Lucide React icons
- **Authentication**: Supabase Auth (@supabase/ssr)
- **Database**: Supabase PostgreSQL with Row Level Security
- **Storage**: Supabase Storage (for documents/files)

## Project Structure

### Public Site
- **Landing Page** (`/`): Hero section with space particles, animated header, project showcase
- **Login Page** (`/login`): Supabase authentication with redirect logic
- **Components**:
  - `RocketLogo`: Reusable SVG logo component with width/height props
  - `Header`: Navigation with scroll-triggered visibility
  - Space particle effects and animations

### Client Dashboard (`/dashboard`)
Single-page dashboard with tab-based navigation featuring:

#### Layout
- **Sidebar**: Navigation tabs (Projects, Invoices, Messages, Documents, Support)
- **Header**: User info (company name, contact person) and logout button
- **Main Content**: Tab-based content area with instant switching

#### Dashboard Tabs

**1. Projects Tab** (`/app/dashboard/tabs/ProjectsTab.tsx`)
- Project cards with status badges (discovery, design, development, review, completed, blocked)
- Progress bars showing completion percentage
- Task checklists (JSONB) with completion tracking
- Preview links to staging sites/Figma designs
- Next action callouts (especially for blocked projects)
- Project dates and metadata

**2. Invoices Tab** (`/app/dashboard/tabs/InvoicesTab.tsx`)
- Summary dashboard (Total Outstanding, Total Paid, Total Invoices)
- Invoice cards with status badges (pending, paid, overdue, cancelled)
- Line items breakdown (description, quantity, rate, amount)
- Tax calculation (subtotal, tax rate, tax amount, total)
- Payment tracking (paid date, payment method)
- Invoice detail modal with full breakdown
- Download PDF functionality

**3. Documents Tab** (`/app/dashboard/tabs/DocumentsTab.tsx`)
- Category-based organization (contract, design, asset, deliverable, invoice, other)
- Search by filename or description
- Filter by category
- File metadata (type, size, upload date)
- Color-coded category badges
- View & Download actions
- Connected to Supabase Storage bucket

**4. Messages Tab** (`/app/dashboard/tabs/MessagesTab.tsx`)
- [To be implemented]

**5. Support Tab** (`/app/dashboard/tabs/SupportTab.tsx`)
- [To be implemented]

## Database Schema

### Core Tables

**users** (public.users)
- Links to auth.users via trigger
- Fields: id, email, role (client/admin), company_name, contact_person, phone, avatar_url
- Row Level Security: Users can view own profile

**projects**
- Fields: id, client_id, project_name, description, status, start_date, end_date, progress_percentage
- Special fields:
  - `checklist` (JSONB): Array of ChecklistItem objects
  - `preview_url` (TEXT): Link to staging/Figma
  - `next_action` (TEXT): Description of next steps
- Row Level Security: Users can view own projects

**invoices**
- Fields: id, client_id, project_id, invoice_number, invoice_date, due_date
- Financial fields:
  - `line_items` (JSONB): Array of InvoiceLineItem objects
  - `subtotal`, `tax_rate`, `tax_amount`, `total_amount` (DECIMAL)
- Payment tracking: status, paid_date, payment_method, invoice_url, notes
- Row Level Security: Users can view own invoices

**documents**
- Fields: id, project_id, file_name, file_url, file_type, file_size, category
- Categories: contract, design, asset, deliverable, invoice, other
- Metadata: uploaded_by, description, created_at
- Row Level Security: Users can view documents for their projects
- Files stored in Supabase Storage bucket: `documents`

**messages**
- Fields: id, project_id, sender_id, message, attachments (JSONB), is_read
- Row Level Security: Users can view messages for their projects

**support_tickets**
- Fields: id, client_id, project_id, subject, description, status, priority
- Status: open, in_progress, resolved, closed
- Priority: low, medium, high, urgent
- Row Level Security: Users can view own tickets

### TypeScript Types (`/types/database.ts`)
All database entities have corresponding TypeScript interfaces:
- `User`, `Project`, `Invoice`, `Document`, `Message`, `SupportTicket`
- Enums: `UserRole`, `ProjectStatus`, `InvoiceStatus`, `DocumentCategory`, `TicketStatus`, `TicketPriority`
- Nested types: `ChecklistItem`, `InvoiceLineItem`

## Key Features

### Data Fetching Strategy
- Server-side data fetching in dashboard page using `Promise.all()` for parallel queries
- All data fetched at once for instant tab switching
- No loading states between tabs

### Authentication Flow
1. User lands on `/login` page
2. useEffect checks if already authenticated → redirects to `/dashboard`
3. Login with Supabase email/password
4. Middleware protects dashboard routes
5. Session refresh handled automatically

### File Management
- **Upload**: Admin uploads files to Supabase Storage bucket
- **Storage**: Files stored in `documents` bucket
- **Access**: Public or private URLs depending on bucket settings
- **Display**: Documents tab shows files with download/view actions

### Invoice System (for new business owners)
- **Line Items**: Each service/product with quantity × rate
- **Tax Calculation**: Separate line for tax (state sales tax)
- **Payment Terms**: Due date, invoice date, payment tracking
- **Invoice Numbers**: Sequential numbering (INV-YYYY-###)
- **Status Tracking**: Pending, paid, overdue, cancelled

## Key Technical Decisions

1. **Supabase Auth over NextAuth**: Purpose-built for Supabase, simpler integration, built-in RLS support
2. **Tab-based Dashboard**: Better UX for small datasets, instant switching with pre-fetched data
3. **JSONB for Flexible Data**: Checklist items, line items, attachments stored as JSONB
4. **React useId() for SSR**: Stable IDs that work with server-side rendering (avoiding hydration errors)
5. **Server Components for Data**: Data fetching in server components, interactivity in client components

## Common Issues & Solutions

### Hydration Errors
- **Problem**: Math.random() generates different IDs on server vs client
- **Solution**: Use React's `useId()` hook for stable SSR-compatible IDs

### RLS Infinite Recursion
- **Problem**: Admin policies checking users table creates circular reference
- **Solution**: Simplify policies to only check `auth.uid() = client_id`

### Foreign Key Constraints
- **Problem**: User exists in auth.users but not public.users
- **Solution**: Trigger creates public.users profile on signup, or manually insert for existing users

## Development Workflow

### Running Locally
```bash
npm run dev
```

### Database Migrations
Located in `/supabase/migrations/`:
- `000_combined_setup.sql`: Initial schema
- `001_fix_rls_policies.sql`: Fixed circular RLS policies
- `002_add_preview_and_next_action.sql`: Added preview_url and next_action to projects

### Seed Data
- `/supabase/seed_data.sql`: Sample projects
- `/supabase/seed_invoices.sql`: Sample invoices

### Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

## Future Enhancements

### Pending Implementation
1. **Messages Tab**: Project-based messaging system
2. **Support Tab**: Ticket management with priority levels
3. **Admin Panel**: For managing clients, projects, invoices, documents
4. **Email Notifications**: Invoice reminders, project updates
5. **Payment Integration**: Stripe/PayPal for online invoice payments
6. **Real-time Updates**: Supabase Realtime for live message notifications
7. **File Upload UI**: Client-side document upload interface
8. **Mobile Responsiveness**: Optimize dashboard for mobile devices

### Business Features to Consider
- Time tracking integration
- Project templates
- Automated invoice generation
- Contract signing (DocuSign/HelloSign)
- Client onboarding workflow
- Analytics dashboard
- Team collaboration (multiple users per client)

## Design System

### Colors
- Background: Gradient from slate-900 → slate-800 → indigo-900
- Cards: white/10 with backdrop-blur
- Primary: Blue (blue-400, blue-500)
- Status colors:
  - Success/Completed: Green (green-400)
  - Warning/Pending: Yellow (yellow-400)
  - Error/Overdue/Blocked: Red (red-400)
  - Info/Review: Blue (blue-400)
  - Design: Purple (purple-400)

### Typography
- Headers: Bold, white text
- Body: slate-300
- Metadata: slate-400
- Disabled: slate-500

### Components
- Rounded corners: rounded-xl, rounded-2xl
- Borders: border-white/10, border-white/20
- Hover states: hover:bg-white/15
- Transitions: transition-all, transition-colors

## Notes for New Business Owners

### What Makes a Professional Invoice
1. **Clear Invoice Number**: Sequential numbering for accounting
2. **Line Items**: Detailed breakdown of services/products
3. **Tax Calculation**: Separate line for tax (check your state requirements)
4. **Payment Terms**: Net 15, Net 30, Due on Receipt
5. **Payment Methods**: Accept multiple methods (credit card, bank transfer, check)
6. **Professional Notes**: Thank you message, payment instructions

### Essential Documents for Clients
- **Contracts**: Scope of work, terms, payment schedule
- **Design Files**: Figma links, mockups, brand assets
- **Deliverables**: Final code, images, documentation
- **Invoices**: PDF copies for client records

### Project Status Meanings
- **Discovery**: Initial research and planning phase
- **Design**: Creating mockups and user flows
- **Development**: Building the actual product
- **Review**: Client feedback and revisions
- **Blocked**: Waiting for client input/approval
- **Completed**: Project finished and delivered

## Support & Maintenance

For issues or questions:
- Check Supabase logs for database errors
- Review browser console for client-side errors
- Check middleware.ts for auth issues
- Verify RLS policies if data not showing

Last Updated: January 2025
