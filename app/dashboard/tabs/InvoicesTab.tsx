import { Invoice } from '@/types/database';

interface InvoicesTabProps {
  invoices: Invoice[];
}

export default function InvoicesTab({ invoices }: InvoicesTabProps) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Invoices</h1>
        <p className="text-slate-300">View and manage your invoices</p>
      </div>

      {invoices && invoices.length > 0 ? (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-white/10">
                  <th className="pb-3 text-slate-300 font-medium">Invoice #</th>
                  <th className="pb-3 text-slate-300 font-medium">Amount</th>
                  <th className="pb-3 text-slate-300 font-medium">Due Date</th>
                  <th className="pb-3 text-slate-300 font-medium">Status</th>
                  <th className="pb-3 text-slate-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-white/5">
                    <td className="py-4 text-white font-medium">{invoice.invoice_number}</td>
                    <td className="py-4 text-white">${invoice.amount.toFixed(2)}</td>
                    <td className="py-4 text-slate-400">
                      {new Date(invoice.due_date).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          invoice.status === 'paid'
                            ? 'bg-green-500/20 text-green-400'
                            : invoice.status === 'overdue'
                            ? 'bg-red-500/20 text-red-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4">
                      {invoice.invoice_url && (
                        <a
                          href={invoice.invoice_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                          Download
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 shadow-xl text-center">
          <p className="text-slate-400 text-lg">No invoices yet</p>
          <p className="text-slate-500 text-sm mt-2">
            Your invoices will appear here once they are created
          </p>
        </div>
      )}
    </div>
  );
}
