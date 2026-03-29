import { useState } from 'react';
import { Search, Plus, Filter, ArrowUpRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Navigate, useNavigate } from 'react-router-dom';

const MyExpenses = () => {
    const navigate = useNavigate();
    const mySubmissions = [
        { id: '1023', category: 'Software', amount: '$45.00', status: 'Approved', date: 'Mar 25, 2026', title: 'Adobe XD Subscription' },
        { id: '1025', category: 'Travel', amount: '$12.50', status: 'Pending', date: 'Mar 24, 2026', title: 'Airport Shuttle' },
        { id: '1019', category: 'Meals', amount: '$220.00', status: 'Rejected', date: 'Mar 18, 2026', title: 'Client Lunch meeting' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom duration-1000 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                   <h1 className="text-7xl font-black text-white leading-[0.8] tracking-tighter uppercase mb-6 group cursor-pointer transition selection:text-blue-500">My <br/><span className="text-blue-500 italic decoration-white decoration-8 underline underline-offset-8">Expenses</span></h1>
                   <p className="text-slate-500 text-2xl font-medium tracking-tight mt-6">Review your history and track status in real-time.</p>
                </div>
                <Button variant="primary" className="py-6 px-12 text-2xl font-black uppercase tracking-widest shadow-3xl shadow-blue-500/20" onClick={() => navigate('/employee/submit-expense')}>
                    <Plus size={28} /> New Request
                </Button>
            </header>

            <div className="flex flex-col md:flex-row gap-6">
                 <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
                    <input
                        type="text"
                        placeholder="Search your records..."
                        className="bg-slate-900/50 border border-white/5 text-white rounded-[2rem] p-6 pl-16 w-full focus:ring-4 focus:ring-blue-500/20 outline-none transition duration-500 font-black text-xl tracking-tight"
                    />
                 </div>
                 <Button variant="outline" className="p-6 border-white/5 bg-slate-900/40 backdrop-blur-3xl rounded-[2rem]"><Filter size={24} /> Filters</Button>
            </div>

            <div className="grid grid-cols-1 gap-8 relative">
                {mySubmissions.map((item, i) => (
                    <div key={item.id} className="group relative bg-slate-900/40 border border-white/5 rounded-[3rem] p-10 hover:bg-slate-950 hover:border-blue-500/30 transition-all duration-700 shadow-3xl overflow-hidden cursor-pointer">
                        <div className="flex flex-col lg:flex-row item-start lg:items-center justify-between gap-10">
                            <div className="flex items-center gap-8">
                                <div className={`w-20 h-20 rounded-[1.5rem] flex items-center justify-center transition duration-700 bg-slate-950 border border-white/5 text-slate-500 group-hover:scale-110 group-hover:-rotate-12 group-hover:bg-blue-600 group-hover:text-white`}>
                                     {item.status === 'Approved' ? <CheckCircle size={36} /> : item.status === 'Rejected' ? <XCircle size={36} /> : <Clock size={36} />}
                                </div>
                                <div>
                                    <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500 mb-2">{item.date} • {item.id}</p>
                                    <h3 className="text-4xl font-black text-white tracking-tighter group-hover:text-blue-500 transition">{item.title}</h3>
                                    <p className="text-slate-400 font-bold mt-2 uppercase text-xs tracking-widest">{item.category}</p>
                                </div>
                            </div>

                            {/* Timeline-ish view in small */}
                            <div className="flex gap-4 items-center px-4 py-2 bg-slate-950 border border-white/5 rounded-2xl">
                                <span className={`w-3 h-3 rounded-full ${item.status === 'Approved' ? 'bg-emerald-500' : item.status === 'Rejected' ? 'bg-rose-500' : 'bg-yellow-500'} animate-pulse shadow-glow`}></span>
                                <p className={`font-black uppercase tracking-widest text-xs ${item.status === 'Approved' ? 'text-emerald-500' : item.status === 'Rejected' ? 'text-rose-500' : 'text-yellow-500'}`}>
                                    {item.status}
                                </p>
                            </div>

                            <div className="text-right flex flex-col items-end">
                                <p className="text-5xl font-black text-white mb-2 tracking-tighter transition group-hover:scale-110 duration-700">{item.amount}</p>
                                <button className="flex items-center gap-2 text-slate-500 hover:text-white transition font-black uppercase tracking-widest text-[10px]">
                                    Details <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition duration-1000">
                             <TrendingUp size={150} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center pt-10">
                <Button variant="ghost" className="text-slate-500 font-black tracking-widest hover:text-blue-400 uppercase">Load Older Records ↓</Button>
            </div>
        </div>
    );
};

export default MyExpenses;
