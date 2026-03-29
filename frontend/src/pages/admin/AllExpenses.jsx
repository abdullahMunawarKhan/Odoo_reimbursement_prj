import { useState } from 'react';
import { Search, Filter, Shield, ExternalLink, TrendingUp, DollarSign } from 'lucide-react';
import Button from '../../components/ui/Button';

const AllExpenses = () => {
    const expenses = [
        { id: 'EXP-9021', user: 'George White', category: 'Travel', amount: '$4,200.00', status: 'Approved', auditor: 'Admin (Auto)' },
        { id: 'EXP-9022', user: 'Lara Croft', category: 'Software', amount: '$1,850.50', status: 'Pending', auditor: 'Pending' },
        { id: 'EXP-9023', user: 'John Wick', category: 'Gear', amount: '$12,999.00', status: 'Rejected', auditor: 'Audit Flag' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                   <h1 className="text-6xl font-black text-white leading-tight underline decoration-rose-500 decoration-8 underline-offset-8">Organization <span className="text-rose-500">Audit</span></h1>
                   <p className="text-slate-500 text-xl font-medium mt-6 tracking-tight italic">Super-Admin Oversight: Monitoring all expenditures across all departments.</p>
                </div>
                <Button variant="outline" className="text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/10 py-4 px-8 text-xl font-black uppercase tracking-widest"><TrendingUp size={24} /> Export Report</Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Global Total', value: '$245,000', icon: <DollarSign size={20} />, color: 'text-rose-500' },
                    { label: 'Weekly Delta', value: '+14.2%', icon: <TrendingUp size={20} />, color: 'text-emerald-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-900 border border-white/5 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                        <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 px-1">{stat.label}</p>
                        <p className={`text-4xl font-black ${stat.color} tracking-tighter`}>{stat.value}</p>
                        <div className="absolute -right-2 -bottom-2 opacity-5 text-white/40 rotate-12 transition group-hover:rotate-0 duration-700">
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
                        {expenses.map((exp) => (
                            <tr key={exp.id} className="group hover:bg-slate-950 transition duration-700 cursor-pointer">
                                 <td className="p-8">
                                    <p className="text-2xl font-black text-white tracking-tighter group-hover:text-rose-500 transition">{exp.user}</p>
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">{exp.id} • {exp.category}</p>
                                 </td>
                                 <td className="p-8">
                                    <p className="text-3xl font-black text-white tracking-tighter">{exp.amount}</p>
                                    <div className="flex items-center gap-1.5 text-slate-500 font-black text-[10px] uppercase tracking-tighter mt-1">
                                        <Shield size={10} /> {exp.auditor}
                                    </div>
                                 </td>
                                 <td className="p-8">
                                    <span className={`px-5 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest border ${
                                        exp.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                        exp.status === 'Rejected' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                                        'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                    }`}>{exp.status}</span>
                                 </td>
                                 <td className="p-8 text-right">
                                     <div className="flex justify-end gap-3 translate-x-10 group-hover:translate-x-0 transition-transform duration-700 opacity-0 group-hover:opacity-100">
                                         <Button variant="outline" className="p-4 border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white">Flag for Investigation</Button>
                                         <Button variant="ghost" className="p-4"><ExternalLink size={20} /></Button>
                                     </div>
                                 </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllExpenses;
