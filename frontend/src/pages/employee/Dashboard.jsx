import { DollarSign, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import Button from '../../components/ui/Button';

import { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/dashboardService';
import { getMyExpenses } from '../../services/expenseService';

const EmployeeDashboard = () => {
    const [data, setData] = useState({ total_submitted: 0, approved_amount: 0, pending_amount: 0 });
    const [recentExpenses, setRecentExpenses] = useState([]);

    useEffect(() => {
        getDashboardStats().then(setData).catch(console.error);
        getMyExpenses().then(expenses => setRecentExpenses(expenses.slice(0, 3))).catch(console.error);
    }, []);

    const stats = [
        { label: 'My Total Expenses', value: `$${data.total_submitted}`, icon: <DollarSign className="text-blue-400" />, trend: 'Dynamic', color: 'border-blue-500/20' },
        { label: 'Pending My Approval', value: `$${data.pending_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: <Clock className="text-yellow-400" />, trend: 'Pending', color: 'border-yellow-500/20' },
        { label: 'Successfully Reimbursed', value: `$${data.approved_amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: <CheckCircle2 className="text-emerald-400" />, trend: 'Approved', color: 'border-emerald-500/20' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                   <h1 className="text-3xl font-black text-slate-900 leading-tight tracking-tight uppercase group">My Financial <span className="text-blue-600 border-b-4 border-blue-600/20 inline-block transition">Snapshot</span></h1>
                   <p className="text-slate-600 text-sm font-medium mt-1">Welcome back! Here's your reimbursement summary.</p>
                </div>
                <div className="flex gap-4">
                     <Button variant="outline" className="py-3 px-6 text-sm font-black uppercase tracking-widest"><TrendingUp size={18} /> Trends</Button>
                     <Button variant="primary" className="py-3 px-6 text-sm font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-500 shadow-blue-500/20">Submit Receipt</Button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className={`bg-white border border-slate-200 p-6 rounded-[2rem] group hover:bg-slate-50 transition-all duration-500 shadow-lg overflow-hidden relative`}>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-100 rounded-[0.8rem] group-hover:bg-blue-600/10 transition duration-700">
                                    {stat.icon}
                                </div>
                                <span className="text-[8px] font-black px-2 py-0.5 bg-slate-100 text-emerald-600 rounded-lg tracking-widest uppercase border border-slate-200">
                                    {stat.trend}
                                </span>
                            </div>
                            <h3 className="text-slate-500 font-bold uppercase tracking-widest text-[8px] mb-1">{stat.label}</h3>
                            <p className="text-2xl font-black text-slate-900 mb-4 tracking-tighter">{stat.value}</p>
                            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-2/3 shadow-[0_0_8px_rgba(59,130,246,0.3)]"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-xl">
                <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Recent Submissions</h2>
                <div className="space-y-6">
                    {recentExpenses.length === 0 ? (
                        <p className="text-slate-600 italic font-medium">No recent expenses found.</p>
                    ) : (
                        recentExpenses.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4.5 bg-slate-50 rounded-[1.2rem] border border-slate-200 hover:border-blue-500/30 transition duration-500 group">
                                 <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-blue-600 font-black transition text-[8px] text-center px-1 shadow-sm">
                                        {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </div>
                                    <div>
                                        <p className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition tracking-tight capitalize">{item.description}</p>
                                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[8px]">{item.category}</p>
                                    </div>
                                 </div>
                                 <div className="text-right">
                                    <p className="text-lg font-black text-slate-900 mb-0.5 tracking-tighter">${parseFloat(item.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                                        item.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' :
                                        item.status === 'rejected' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                                    }`}>{item.status}</span>
                                 </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
