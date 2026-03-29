import { DollarSign, Clock, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import Button from '../../components/ui/Button';

const ManagerDashboard = () => {
    const stats = [
        { label: 'Team Total Expenses', value: '$12,450.00', icon: <DollarSign className="text-blue-400" />, trend: '+15%', color: 'border-blue-500/20' },
        { label: 'Pending My Approval', value: '8 Request', icon: <Clock className="text-yellow-400" />, trend: 'Critical', color: 'border-yellow-500/20' },
        { label: 'Total Team Headcount', value: '14 Active', icon: <Users className="text-indigo-400" />, trend: 'Stable', color: 'border-indigo-500/20' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                   <h1 className="text-6xl font-black text-white leading-tight tracking-tighter uppercase"><span className="text-indigo-500">Manager</span> Control</h1>
                   <p className="text-slate-500 text-xl font-medium mt-4">Oversee your team's spending and streamline approvals.</p>
                </div>
                <div className="flex gap-4">
                     <Button variant="outline"><TrendingUp size={20} /> Analytics</Button>
                     <Button variant="emerald">Bulk Approve</Button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className={`bg-slate-900/40 backdrop-blur-3xl border ${stat.color} p-12 rounded-[3.5rem] group hover:bg-slate-900 transition-all duration-700 shadow-3xl`}>
                        <div className="flex justify-between items-start mb-8">
                            <div className="p-5 bg-slate-950 rounded-[1.5rem] group-hover:scale-110 group-hover:bg-indigo-600/10 transition duration-700">
                                {stat.icon}
                            </div>
                            <span className="text-xs font-black px-4 py-1.5 bg-slate-950 text-indigo-400 rounded-xl tracking-[0.2em] uppercase border border-white/5">
                                {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs mb-3">{stat.label}</h3>
                        <p className="text-5xl font-black text-white mb-8 tracking-tighter">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
                 <div className="bg-slate-900/30 border border-white/5 p-12 rounded-[4rem] backdrop-blur-3xl">
                    <h2 className="text-3xl font-black text-white mb-10 tracking-tight">Pending Approval Queue</h2>
                    <p className="text-slate-500 font-medium mb-10 text-lg italic">"Decisions make your team more productive."</p>
                    <div className="flex gap-4">
                        <Button variant="primary" className="flex-1 py-5">Review Requests</Button>
                    </div>
                 </div>

                <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 p-12 rounded-[4rem] backdrop-blur-3xl relative overflow-hidden group">
                     <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Team Compliance</h2>
                        <p className="text-slate-400 font-medium text-lg leading-relaxed">92% of your team is submitting expenses accurately according to the company rules.</p>
                        <div className="w-full h-4 bg-slate-950 rounded-full mt-10 p-1">
                             <div className="h-full bg-indigo-500 rounded-full w-[92%] shadow-[0_0_20px_#6366f1]"></div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerDashboard;
