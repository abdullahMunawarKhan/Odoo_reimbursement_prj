import { useState, useEffect } from 'react';
import { getTeamExpenses, updateExpenseStatus } from '../../services/expenseService';
import { CheckCircle, XCircle, Clock, Search, Filter, MessageSquare, ExternalLink } from 'lucide-react';

const Approvals = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const data = await getTeamExpenses();
            setRequests(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (id, status) => {
        try {
            await updateExpenseStatus(id, status);
            // Refresh local list
            setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
        } catch (err) {
            alert("Action failed!");
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2 underline decoration-blue-500/50 decoration-8 underline-offset-8">Expense Approvals</h1>
                    <p className="text-slate-600 text-lg mt-4">Review and manage expense reimbursement requests for your team.</p>
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
                </div>
            </header>

            <div className="bg-slate-800/20 rounded-[2rem] border border-slate-800 overflow-hidden backdrop-blur-3xl shadow-2xl min-h-[400px]">
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
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="p-20 text-center animate-pulse text-slate-500 font-bold tracking-widest">
                                    Syncing team ledger...
                                </td>
                            </tr>
                        ) : requests.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-20 text-center text-slate-500 font-bold uppercase tracking-widest">
                                    No requests discovered.
                                </td>
                            </tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req.id} className="group hover:bg-slate-800/40 transition">
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-white uppercase transform group-hover:rotate-[360deg] transition duration-700">
                                                {req.user_name ? req.user_name[0] : '?'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-lg">{req.user_name}</p>
                                                <p className="text-xs text-slate-500 uppercase font-bold tracking-tighter">ID: #{req.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <p className="font-medium text-slate-300 capitalize">{req.category}</p>
                                        <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">{req.description}</p>
                                        <p className="text-xs text-slate-600 mt-1">{new Date(req.created_at).toLocaleDateString()}</p>
                                    </td>
                                    <td className="p-6">
                                        <p className="text-xl font-black text-white">${parseFloat(req.amount).toLocaleString()}</p>
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
                                                    <button 
                                                        onClick={() => handleAction(req.id, 'rejected')}
                                                        className="bg-rose-600/10 border border-rose-600/20 hover:bg-rose-600 hover:text-white text-rose-500 p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110"
                                                    >
                                                        <XCircle size={20} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleAction(req.id, 'approved')}
                                                        className="bg-emerald-600/10 border border-emerald-600/20 hover:bg-emerald-600 hover:text-white text-emerald-500 p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110"
                                                    >
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
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Approvals;
