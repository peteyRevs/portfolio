export type UserRole = 'client' | 'admin';

export type ProjectStatus = 'discovery' | 'design' | 'development' | 'review' | 'completed' | 'blocked';

export type InvoiceStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';

export type DocumentCategory = 'contract' | 'design' | 'asset' | 'deliverable' | 'invoice' | 'other';

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  created_at: string;
}

export interface User {
  id: string;
  email: string | null;
  role: UserRole;
  company_name: string | null;
  contact_person: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  client_id: string;
  project_name: string;
  description: string | null;
  status: ProjectStatus;
  start_date: string | null;
  end_date: string | null;
  progress_percentage: number;
  checklist: ChecklistItem[];
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  client_id: string;
  project_id: string | null;
  invoice_number: string;
  amount: number;
  status: InvoiceStatus;
  due_date: string;
  paid_date: string | null;
  invoice_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  project_id: string;
  sender_id: string;
  message: string;
  attachments: Array<{
    name: string;
    url: string;
    size?: number;
    type?: string;
  }>;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  project_id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  category: DocumentCategory | null;
  uploaded_by: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface SupportTicket {
  id: string;
  client_id: string;
  project_id: string | null;
  subject: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
}

// Joined types for when we need related data
export interface ProjectWithClient extends Project {
  client: User;
}

export interface MessageWithSender extends Message {
  sender: User;
}

export interface DocumentWithUploader extends Document {
  uploader: User | null;
}

export interface InvoiceWithProject extends Invoice {
  project: Project | null;
}

export interface TicketWithProject extends SupportTicket {
  project: Project | null;
}
