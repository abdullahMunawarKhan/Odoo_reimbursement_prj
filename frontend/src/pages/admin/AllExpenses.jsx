import { useState, useEffect } from 'react';
import { Search, Filter, Shield, ExternalLink, TrendingUp, DollarSign } from 'lucide-react';
import Button from '../../components/ui/Button';
import { getAllExpenses } from '../../services/expenseService';
import { getDashboardStats } from '../../services/dashboardService';

const AllExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [stats, setStats] = useState({ total_expenses: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                const [expData, statsData] = await Promise.all([
                    getAllExpenses(),
                    getDashboardStats()
                ]);
                setExpenses(expData);
                setStats(statsData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                   <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight">Organization <span className="text-blue-600 border-b-4 border-blue-600/20">Audit</span></h1>
                   <p className="text-slate-600 text-base font-medium mt-3 tracking-tight italic">Super-Admin Oversight: Monitoring all expenditures across all departments.</p>
                </div>
                <Button variant="outline" className="text-blue-600 border-blue-600/30 hover:bg-blue-600/10 py-3 px-6 text-sm font-black uppercase tracking-widest"><TrendingUp size={18} /> Export Report</Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Global Total', value: `$${stats.total_expenses.toLocaleString()}`, icon: <DollarSign size={20} />, color: 'text-slate-900' },
                    { label: 'Weekly Delta', value: '+0.0%', icon: <TrendingUp size={20} />, color: 'text-emerald-600' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 px-1">{stat.label}</p>
                        <p className={`text-3xl font-black ${stat.color} tracking-tighter`}>{stat.value}</p>
                        <div className="absolute -right-2 -bottom-2 opacity-5 text-slate-900 rotate-12 transition group-hover:rotate-0 duration-700">
                             {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900/40 border border-white/5 rounded-[3.5rem] shadow-3xl backdrop-blur-3xl overflow-hidden relative">
                <div className="p-10 border-b border-white/5 flex flex-col md:flex-row gap-6 justify-between items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                        <input
                            type="text"
                            placeholder="Filter by ID, employee or status..."
                            className="bg-slate-950 border border-white/5 text-white rounded-[1.5rem] p-5 pl-16 w-full focus:ring-4 focus:ring-rose-500/20 outline-none transition duration-500 font-bold"
                        />
                    </div>
                    <Button variant="outline"><Filter size={20} /> Advanced Filters</Button>
                </div>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-950/50">
                            <th className="p-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Submission</th>
                            <th className="p-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Value Audit</th>
                            <th className="p-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">State</th>
                            <th className="p-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] text-right">Overrides</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="p-20 text-center text-slate-500 font-bold animate-pulse">
                                    Scanning organization records...
                                </td>
                            </tr>
                        ) : expenses.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-20 text-center text-slate-500 font-bold">
                                    No organization expenses found.
                                </td>
                            </tr>
                        ) : (
                            expenses.map((exp) => (
                                <tr key={exp.id} className="group hover:bg-white/[0.02] transition duration-500 cursor-pointer">
                                     <td className="p-6">
                                        <p className="text-lg font-bold text-white tracking-tight group-hover:text-blue-400 transition">{exp.user_name}</p>
                                        <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] mt-1">EXP-{exp.id} • {exp.category}</p>
                                     </td>
                                     <td className="p-6">
                                        <p className="text-xl font-black text-white tracking-tighter">${parseFloat(exp.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                                        <div className="flex items-center gap-1.5 text-slate-600 font-bold text-[9px] uppercase tracking-tighter mt-1">
                                            <Shield size={10} /> {exp.user_email}
                                        </div>
                                     </td>
                                     <td className="p-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                            exp.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                            exp.status === 'rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                            'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                        }`}>{exp.status}</span>
                                     </td>
                                     <td className="p-6 text-right">
                                         <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                             <Button variant="outline" className="py-2 px-4 text-[10px] border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white uppercase font-black tracking-widest">Flag Audit</Button>
                                             <Button variant="ghost" className="p-2 text-slate-500 hover:text-white"><ExternalLink size={16} /></Button>
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

export default AllExpenses;
