'use client';

import { useState } from 'react';
import { User, Project, Invoice, Message, Document, SupportTicket } from '@/types/database';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import ProjectsTab from './tabs/ProjectsTab';
import InvoicesTab from './tabs/InvoicesTab';
import MessagesTab from './tabs/MessagesTab';
import DocumentsTab from './tabs/DocumentsTab';
import SupportTab from './tabs/SupportTab';

interface DashboardTabsProps {
  user: User | null;
  projects: Project[];
  invoices: Invoice[];
  messages: Message[];
  documents: Document[];
  tickets: SupportTicket[];
}

export type TabType = 'projects' | 'invoices' | 'messages' | 'documents' | 'support';

export default function DashboardTabs({
  user,
  projects,
  invoices,
  messages,
  documents,
  tickets,
}: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('projects');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-8">
          <div className="max-w-7xl">
            {/* Tab Content */}
            <div className="animate-in fade-in duration-300">
              {activeTab === 'projects' && <ProjectsTab projects={projects} />}
              {activeTab === 'invoices' && <InvoicesTab invoices={invoices} />}
              {activeTab === 'messages' && <MessagesTab messages={messages} />}
              {activeTab === 'documents' && <DocumentsTab documents={documents} />}
              {activeTab === 'support' && <SupportTab tickets={tickets} />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
