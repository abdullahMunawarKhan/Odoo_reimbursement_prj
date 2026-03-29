import { CheckCircle, XCircle, Clock, Search, Filter, MessageSquare, ExternalLink } from 'lucide-react';

const Approvals = () => {
    const requests = [
        { id: '1023', user: 'Sarah Jenkins', category: 'Software', amount: '$450.00', status: 'pending', date: 'Mar 25, 2026', desc: 'SaaS Subscription - Team Workspace' },
        { id: '1024', user: 'Michael Scott', category: 'Travel', amount: '$1,200.00', status: 'pending', date: 'Mar 24, 2026', desc: 'Paper Convention - Trip to Scranton' },
        { id: '1021', user: 'Pam Beesly', category: 'Office Supplies', amount: '$75.50', status: 'approved', date: 'Mar 20, 2026', desc: 'Whiteboard markers and sticky notes' },
        { id: '1019', user: 'Dwight Schrute', category: 'Others', amount: '$30.00', status: 'rejected', date: 'Mar 15, 2026', desc: 'Beet farm equipment maintenance' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2 underline decoration-blue-500 decoration-8 underline-offset-8">Expense Approvals</h1>
                    <p className="text-slate-400 text-lg mt-4">Review and manage expense reimbursement requests</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>
                    <button className="bg-slate-800 hover:bg-slate-700 p-3 rounded-xl border border-slate-700 transition flex items-center gap-2">
                        <Filter size={18} className="text-slate-300" />
                        <span className="hidden sm:inline">Filters</span>
                    </button>
                </div>
            </header>

            <div className="bg-slate-800/20 rounded-[2rem] border border-slate-800 overflow-hidden backdrop-blur-3xl shadow-2xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-900/50 border-b border-slate-800">
                            <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-widest">Requester</th>
                            <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-widest">Details</th>
                            <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                            <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                            <th className="p-6 text-sm font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {requests.map((req) => (
                            <tr key={req.id} className="group hover:bg-slate-800/40 transition">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-white uppercase transform group-hover:rotate-[360deg] transition duration-700">
                                            {req.user[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-white text-lg">{req.user}</p>
                                            <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">ID: #{req.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <p className="font-medium text-slate-300">{req.category}</p>
                                    <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">{req.desc}</p>
                                    <p className="text-xs text-slate-600 mt-1">{req.date}</p>
                                </td>
                                <td className="p-6">
                                    <p className="text-xl font-black text-white">{req.amount}</p>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase transition hover:text-blue-400 cursor-pointer flex items-center gap-1 mt-1">
                                        View Receipt <ExternalLink size={10} />
                                    </span>
                                </td>
                                <td className="p-6 text-center">
                                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                                        req.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                                        req.status === 'rejected' ? 'bg-rose-500/10 text-rose-500' :
                                        'bg-yellow-500/10 text-yellow-500'
                                    }`}>
                                        {req.status === 'approved' ? <CheckCircle size={14} /> :
                                         req.status === 'rejected' ? <XCircle size={14} /> :
                                         <Clock size={14} />}
                                        {req.status}
                                    </div>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end gap-3">
                                        {req.status === 'pending' ? (
                                            <>
                                                <button className="bg-rose-600/10 border border-rose-600/20 hover:bg-rose-600 hover:text-white text-rose-500 p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110">
                                                    <XCircle size={20} />
                                                </button>
                                                <button className="bg-emerald-600/10 border border-emerald-600/20 hover:bg-emerald-600 hover:text-white text-emerald-500 p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110">
                                                    <CheckCircle size={20} />
                                                </button>
                                            </>
                                        ) : (
                                            <button className="bg-slate-800 text-slate-400 p-2.5 rounded-xl transition cursor-not-allowed">
                                                <MessageSquare size={20} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Empty state simulation if no requests */}
            {false && (
                <div className="flex flex-col items-center justify-center py-40 text-center space-y-6 animate-pulse">
                    <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center text-slate-700">
                        <Clock size={48} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">No pending approvals</h3>
                        <p className="text-slate-500">Everything is caught up. Great job!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Approvals;
