import { DollarSign, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import Button from '../../components/ui/Button';

const EmployeeDashboard = () => {
    const stats = [
        { label: 'My Total Expenses', value: '$850.00', icon: <DollarSign className="text-blue-400" />, trend: '+5%', color: 'border-blue-500/20' },
        { label: 'Pending My Approval', value: '2 Request', icon: <Clock className="text-yellow-400" />, trend: '-1', color: 'border-yellow-500/20' },
        { label: 'Successfully Reimbursed', value: '$620.50', icon: <CheckCircle2 className="text-emerald-400" />, trend: '+10%', color: 'border-emerald-500/20' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                   <h1 className="text-6xl font-black text-white leading-tight tracking-tighter">My Financial <br/><span className="text-blue-500 italic">Snapshot</span></h1>
                   <p className="text-slate-500 text-xl font-medium mt-4">Welcome back! Here's your reimbursement summary for March.</p>
                </div>
                <div className="flex gap-4">
                     <Button variant="outline"><TrendingUp size={20} /> Trends</Button>
                     <Button variant="primary">Submit New Receipt</Button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className={`bg-slate-900/40 backdrop-blur-3xl border ${stat.color} p-10 rounded-[3rem] group hover:bg-slate-900 transition-all duration-700 shadow-2xl overflow-hidden relative`}>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-8">
                                <div className="p-5 bg-slate-950 rounded-[1.5rem] group-hover:scale-110 group-hover:bg-blue-600/10 transition duration-700">
                                    {stat.icon}
                                </div>
                                <span className="text-xs font-black px-3 py-1 bg-slate-950 text-emerald-400 rounded-lg tracking-widest uppercase border border-white/5">
                                    {stat.trend}
                                </span>
                            </div>
                            <h3 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-2">{stat.label}</h3>
                            <p className="text-5xl font-black text-white mb-6 tracking-tighter">{stat.value}</p>
                            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-2/3 shadow-[0_0_20px_#3b82f6]"></div>
                            </div>
                        </div>
                        <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition duration-1000">
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900/30 border border-white/5 p-12 rounded-[3.5rem] backdrop-blur-3xl shadow-3xl">
                <h2 className="text-3xl font-black text-white mb-10 tracking-tight">Recent Submissions</h2>
                <div className="space-y-6">
                    {[
                        { title: 'Airport Taxi Fare', cat: 'Travel', amount: '$45.00', status: 'Pending', date: 'Mar 25' },
                        { title: 'Software Subscription', cat: 'Office', amount: '$29.99', status: 'Approved', date: 'Mar 22' },
                        { title: 'Client Dinner Buffet', cat: 'Meals', amount: '$120.50', status: 'Rejected', date: 'Mar 18' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-8 bg-slate-950/50 rounded-[2rem] border border-white/5 hover:border-blue-500/30 transition duration-500 group">
                             <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-slate-950 border border-white/5 rounded-2xl flex items-center justify-center text-blue-400 font-black group-hover:rotate-12 transition">
                                    {item.date}
                                </div>
                                <div>
                                    <p className="text-2xl font-black text-white group-hover:text-blue-400 transition tracking-tight">{item.title}</p>
                                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">{item.cat}</p>
                                </div>
                             </div>
                             <div className="text-right">
                                <p className="text-2xl font-black text-white mb-1 tracking-tighter">{item.amount}</p>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                    item.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' :
                                    item.status === 'Rejected' ? 'bg-rose-500/10 text-rose-500' : 'bg-yellow-500/10 text-yellow-500'
                                }`}>{item.status}</span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
