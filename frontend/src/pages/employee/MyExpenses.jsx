import { useState, useEffect } from 'react';
import { Search, Plus, Filter, ArrowUpRight, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Navigate, useNavigate } from 'react-router-dom';
import { getMyExpenses } from '../../services/expenseService';

const MyExpenses = () => {
    const navigate = useNavigate();
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyExpenses()
            .then(setExpenses)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom duration-1000 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                   <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight uppercase group">My <br/><span className="text-blue-600 border-b-4 border-blue-600/20 inline-block transition">Expenses</span></h1>
                   <p className="text-slate-600 text-base font-medium mt-4">Review your history and track status in real-time.</p>
                </div>
                <Button variant="primary" className="py-3 px-8 text-sm font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-500 shadow-blue-500/20" onClick={() => navigate('/employee/submit-expense')}>
                    <Plus size={18} /> New Request
                </Button>
            </header>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                 <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search your records..."
                        className="bg-white border border-slate-200 text-slate-900 rounded-xl p-4 pl-14 w-full focus:ring-4 focus:ring-blue-500/20 outline-none transition duration-500 font-bold"
                    />
                 </div>
                 <Button variant="outline" className="p-4 border-slate-200 bg-white rounded-xl"><Filter size={20} /> Filters</Button>
            </div>

            <div className="grid grid-cols-1 gap-8 relative min-h-[300px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-20 animate-pulse text-slate-500 font-black uppercase tracking-[0.3em]">
                        Scanning History Ledger...
                    </div>
                ) : expenses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-20 text-slate-500 font-black uppercase tracking-[0.3em] border-4 border-dashed border-slate-900 rounded-[3rem]">
                        Nothing here yet.
                    </div>
                ) : (
                    expenses.map((item, i) => (
                        <div key={item.id} className="group relative bg-white border border-slate-200 rounded-[2rem] p-8 hover:bg-slate-50 transition-all duration-500 shadow-lg overflow-hidden cursor-pointer">
                            <div className="flex flex-col lg:flex-row item-start lg:items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition duration-500 bg-slate-50 border border-slate-200 text-slate-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white shadow-sm`}>
                                         {item.status === 'approved' ? <CheckCircle size={28} /> : item.status === 'rejected' ? <XCircle size={28} /> : <Clock size={28} />}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{new Date(item.created_at).toLocaleDateString()} • EXP-{item.id}</p>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tighter group-hover:text-blue-600 transition capitalize">{item.description}</h3>
                                        <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">{item.category}</p>
                                    </div>
                                </div>
    
                                <div className="flex gap-3 items-center px-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                                    <span className={`w-2 h-2 rounded-full ${item.status === 'approved' ? 'bg-emerald-500' : item.status === 'rejected' ? 'bg-rose-500' : 'bg-yellow-500'} animate-pulse`}></span>
                                    <p className={`font-black uppercase tracking-widest text-[9px] ${item.status === 'approved' ? 'text-emerald-600' : item.status === 'rejected' ? 'text-rose-600' : 'text-amber-600'}`}>
                                        {item.status}
                                    </p>
                                </div>
    
                                <div className="text-right flex flex-col items-end">
                                    <p className="text-3xl font-black text-slate-900 mb-1 tracking-tighter group-hover:scale-105 transition duration-500">${parseFloat(item.amount).toLocaleString()}</p>
                                    <button className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition font-black uppercase tracking-widest text-[9px]">
                                        Details <ArrowUpRight size={12} />
                                    </button>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 p-8 opacity-5 transition duration-1000 blur-2xl">
                                 <TrendingUp size={100} />
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="flex justify-center pt-10">
                <Button variant="ghost" className="text-slate-500 font-black tracking-widest hover:text-blue-400 uppercase">Load Older Records ↓</Button>
            </div>
        </div>
    );
};

export default MyExpenses;
