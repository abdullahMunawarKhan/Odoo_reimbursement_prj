import { DollarSign, Clock, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import Button from '../../components/ui/Button';

import { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/dashboardService';

const ManagerDashboard = () => {
    const [data, setData] = useState({ team_total: 0, pending_count: 0, team_count: 0 });

    useEffect(() => {
        getDashboardStats().then(setData).catch(console.error);
    }, []);

    const stats = [
        { label: 'Team Total Expenses', value: `$${data.team_total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, icon: <DollarSign className="text-blue-400" />, trend: 'Dynamic', color: 'border-blue-500/20' },
        { label: 'Pending My Approval', value: `${data.pending_count} Request(s)`, icon: <Clock className="text-yellow-400" />, trend: data.pending_count > 0 ? 'Critical' : 'All Clear', color: 'border-yellow-500/20' },
        { label: 'Total Team Headcount', value: `${data.team_count} Active`, icon: <Users className="text-indigo-400" />, trend: 'Stable', color: 'border-indigo-500/20' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight uppercase group"><span className="text-indigo-600 border-b-4 border-indigo-600/20 inline-block transition">Manager</span> Control</h1>
                    <p className="text-slate-600 text-base font-medium mt-2">Oversee your team's spending and streamline approvals.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="py-3 px-6 text-sm font-black uppercase tracking-widest"><TrendingUp size={18} /> Analytics</Button>
                    <Button variant="emerald" className="py-3 px-6 text-sm font-black uppercase tracking-widest">Bulk Approve</Button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className={`bg-white border border-slate-200 p-10 rounded-[2.5rem] group hover:bg-slate-50 transition-all duration-[0.5s] shadow-xl relative overflow-hidden`}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-slate-100 rounded-[1.2rem] group-hover:bg-indigo-600/10 transition duration-700">
                                {stat.icon}
                            </div>
                            <span className="text-[9px] font-black px-3 py-1 bg-slate-100 text-indigo-600 rounded-lg tracking-widest uppercase border border-slate-200 transition duration-500">
                                {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-slate-500 font-black uppercase tracking-[0.2em] text-[9px] mb-2">{stat.label}</h3>
                        <p className="text-3xl font-black text-slate-900 mb-6 tracking-tighter">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                <div className="bg-white border border-slate-200 p-10 rounded-[3rem] shadow-xl group hover:shadow-2xl transition duration-500">
                    <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">Pending Approval Queue</h2>
                    <p className="text-slate-500 font-medium mb-8 text-base leading-relaxed italic border-l-4 border-indigo-600/20 pl-6">"Clear decisions make productive teams."</p>
                    <div className="flex gap-4">
                        <Button variant="primary" className="flex-1 py-4 text-sm font-black uppercase tracking-widest bg-indigo-600 shadow-xl shadow-indigo-500/15 hover:scale-105 transition duration-500" onClick={() => navigate('/manager/approvals')}>Review Requests</Button>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 via-white to-white border border-indigo-100 p-10 rounded-[3rem] shadow-xl relative overflow-hidden group">
                    <div className="relative z-10 space-y-4">
                        <h2 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">Team Compliance</h2>
                        <p className="text-slate-600 font-medium text-base leading-relaxed">92% of your team is submitting expenses accurately according to the company rules.</p>
                        <div className="w-full h-3 bg-slate-200 rounded-full mt-8 p-0.5">
                            <div className="h-full bg-indigo-600 rounded-full w-[92%] shadow-[0_0_15px_rgba(99,102,241,0.4)]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
