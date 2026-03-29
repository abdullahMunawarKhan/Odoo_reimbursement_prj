import { Settings, ShieldCheck, Database, LayoutDashboard, Globe, Lock } from 'lucide-react';
import Button from '../../components/ui/Button';

import { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/dashboardService';

const AdminDashboard = () => {
    const [data, setData] = useState({ active_rules: 0, total_users: 0 });

    useEffect(() => {
        getDashboardStats().then(setData).catch(console.error);
    }, []);

    const controls = [
        { label: 'System Health', value: '100% Online', icon: <Database className="text-emerald-400" />, trend: 'Good', color: 'border-emerald-500/10' },
        { label: 'Total Users', value: `${data.total_users} Active`, icon: <ShieldCheck className="text-blue-400" />, trend: 'Healthy', color: 'border-blue-500/10' },
        { label: 'Global Rules', value: `${data.active_rules} Configs`, icon: <Globe className="text-amber-400" />, trend: 'Synced', color: 'border-amber-500/10' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-8">
                <div>
                   <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight uppercase group"><span className="text-emerald-600">Master</span> Control</h1>
                   <p className="text-slate-600 text-lg font-medium mt-2 tracking-tight">Administrator Dashboard • Global Configuration Hub</p>
                </div>
                <div className="flex gap-4">
                     <Button variant="outline" className="py-3 px-6 text-sm font-black uppercase tracking-widest"><Settings size={18} /> Config</Button>
                     <Button variant="secondary" className="py-3 px-6 text-sm font-black uppercase tracking-widest"><Lock size={18} /> Permissions</Button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {controls.map((control, i) => (
                    <div key={i} className={`bg-white backdrop-blur-3xl border border-slate-200 p-10 rounded-[3rem] group hover:bg-slate-50 transition-all duration-[0.5s] shadow-xl overflow-hidden relative`}>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-10">
                                <div className="p-4 bg-slate-100 rounded-[1.5rem] group-hover:bg-emerald-600/10 transition duration-700">
                                    {control.icon}
                                </div>
                                <span className="text-[9px] font-black px-4 py-1 bg-slate-100 text-emerald-600 rounded-full tracking-widest uppercase border border-slate-200 transition duration-500">
                                    {control.trend}
                                </span>
                            </div>
                            <h3 className="text-slate-500 font-black uppercase tracking-[0.2em] text-[9px] mb-2">{control.label}</h3>
                            <p className="text-3xl font-black text-slate-900 tracking-widest">{control.value}</p>
                        </div>
                        <div className="absolute top-0 right-0 p-8 opacity-5 transition duration-1000 blur-2xl">
                            {control.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-12 bg-slate-900/30 p-16 rounded-[5rem] border border-white/5 backdrop-blur-3xl">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                     <div className="space-y-4 flex-1">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase leading-tight italic">System Configuration</h2>
                        <p className="text-slate-600 font-medium text-lg leading-relaxed">Globalize expense rules, modify team hierarchies, and ensure financial security across the entire organization using Admin tools.</p>
                     </div>
                     <div className="flex flex-col gap-3 w-full md:w-auto">
                        <Button variant="primary" className="py-4 px-8 text-lg font-black uppercase tracking-widest w-full hover:scale-105 shadow-xl shadow-blue-500/20">Open Hub</Button>
                        <Button variant="outline" className="py-4 px-8 text-base font-black uppercase tracking-widest w-full border-2">Organization Setup</Button>
                     </div>
                 </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
