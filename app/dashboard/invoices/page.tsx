'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Invoice } from '@/types/database';
import { Download, Eye, X, Calendar, CreditCard } from 'lucide-react';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvoices() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from('invoices')
        .select('*')
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      setInvoices(data || []);
      setLoading(false);
    }

    fetchInvoices();
  }, []);

  // Calculate summary stats
  const totalOwed = invoices
    .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.total_amount, 0);

  const totalPaid = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total_amount, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-400">Loading invoices...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Header with Summary Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Invoices</h1>
        <p className="text-slate-300 mb-6">Track payments and billing history</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-sm text-slate-400 mb-1">Total Outstanding</div>
            <div className="text-2xl font-bold text-red-400">${totalOwed.toFixed(2)}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-sm text-slate-400 mb-1">Total Paid</div>
            <div className="text-2xl font-bold text-green-400">${totalPaid.toFixed(2)}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20">
            <div className="text-sm text-slate-400 mb-1">Total Invoices</div>
            <div className="text-2xl font-bold text-white">{invoices.length}</div>
          </div>
        </div>
      </div>

      {invoices && invoices.length > 0 ? (
        <div className="space-y-4">
          {invoices.map((invoice) => {
            const isOverdue = invoice.status === 'overdue';
            const isPaid = invoice.status === 'paid';

            return (
              <div
                key={invoice.id}
                className={`bg-white/10 backdrop-blur-xl rounded-xl p-6 border transition-all hover:bg-white/15 ${
                  isOverdue ? 'border-red-500/50' : 'border-white/20'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        Invoice #{invoice.invoice_number}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isPaid
                            ? 'bg-green-500/20 text-green-400'
                            : isOverdue
                            ? 'bg-red-500/20 text-red-400'
                            : invoice.status === 'cancelled'
                            ? 'bg-slate-500/20 text-slate-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Issued: {new Date(invoice.invoice_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className={isOverdue ? 'text-red-400 font-medium' : ''}>
                          Due: {new Date(invoice.due_date).toLocaleDateString()}
                        </span>
                      </div>
                      {invoice.paid_date && (
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4" />
                          <span>Paid: {new Date(invoice.paid_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white mb-1">
                      ${invoice.total_amount.toFixed(2)}
                    </div>
                    {invoice.payment_method && (
                      <div className="text-xs text-slate-400">
                        via {invoice.payment_method}
                      </div>
                    )}
                  </div>
                </div>

                {/* Line Items Preview */}
                {invoice.line_items && invoice.line_items.length > 0 && (
                  <div className="mb-4 space-y-1">
                    {invoice.line_items.slice(0, 2).map((item) => (
                      <div key={item.id} className="text-sm text-slate-300 flex justify-between">
                        <span>{item.description}</span>
                        <span>${item.amount.toFixed(2)}</span>
                      </div>
                    ))}
                    {invoice.line_items.length > 2 && (
                      <div className="text-xs text-slate-500">
                        +{invoice.line_items.length - 2} more items
                      </div>
                    )}
                  </div>
                )}

                {/* Notes */}
                {invoice.notes && (
                  <div className="mb-4 p-3 bg-white/5 rounded-lg border border-white/10">
                    <div className="text-xs text-slate-400 mb-1">Notes</div>
                    <div className="text-sm text-slate-300">{invoice.notes}</div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setSelectedInvoice(invoice)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  {invoice.invoice_url && (
                    <a
                      href={invoice.invoice_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-xl text-center">
          <p className="text-slate-400 text-lg">No invoices yet</p>
          <p className="text-slate-500 text-sm mt-2">
            Your invoices will appear here once they are created
          </p>
        </div>
      )}

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-slate-900">
              <h2 className="text-2xl font-bold text-white">
                Invoice #{selectedInvoice.invoice_number}
              </h2>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Invoice Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Invoice Date</div>
                  <div className="text-white">{new Date(selectedInvoice.invoice_date).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Due Date</div>
                  <div className="text-white">{new Date(selectedInvoice.due_date).toLocaleDateString()}</div>
                </div>
                {selectedInvoice.paid_date && (
                  <>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Paid Date</div>
                      <div className="text-green-400">{new Date(selectedInvoice.paid_date).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Payment Method</div>
                      <div className="text-white">{selectedInvoice.payment_method || 'N/A'}</div>
                    </div>
                  </>
                )}
              </div>

              {/* Line Items */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Line Items</h3>
                <div className="space-y-2">
                  {selectedInvoice.line_items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start p-3 bg-white/5 rounded-lg">
                      <div className="flex-1">
                        <div className="text-white font-medium">{item.description}</div>
                        <div className="text-sm text-slate-400">
                          {item.quantity} × ${item.rate.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-white font-semibold">${item.amount.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t border-white/10 pt-4">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span>${selectedInvoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Tax ({selectedInvoice.tax_rate}%)</span>
                  <span>${selectedInvoice.tax_amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span>${selectedInvoice.total_amount.toFixed(2)}</span>
                </div>
              </div>

              {/* Notes */}
              {selectedInvoice.notes && (
                <div className="p-4 bg-white/5 rounded-lg">
                  <div className="text-sm text-slate-400 mb-2">Notes</div>
                  <div className="text-white">{selectedInvoice.notes}</div>
                </div>
              )}

              {/* Download Button */}
              {selectedInvoice.invoice_url && (
                <a
                  href={selectedInvoice.invoice_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
                >
                  <Download className="w-5 h-5" />
                  Download Invoice PDF
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
