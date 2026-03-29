import { useState } from 'react';
import { Settings, CheckCircle, Save, Plus, Trash2, ArrowRight } from 'lucide-react';

const AdminRules = () => {
    const [rules, setRules] = useState([
        { id: 1, type: 'percentage', value: '45', approver: 'Finance Manager', status: 'Enabled' },
        { id: 2, type: 'specific', value: '$1,000+', approver: 'CEO', status: 'Enabled' },
        { id: 3, type: 'hybrid', value: 'Any Value', approver: 'Direct Manager', status: 'Disabled' },
    ]);

    const toggleRule = (id) => {
        setRules(rules.map(rule => rule.id === id ? { ...rule, status: rule.status === 'Enabled' ? 'Disabled' : 'Enabled' } : rule));
    };

    return (
        <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom duration-700">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-5xl font-black text-white mb-2 tracking-tighter">Workflow Rules</h1>
                    <p className="text-slate-400 text-xl font-medium">Define how reimbursements are processed</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-3xl font-black text-lg shadow-2xl transition duration-500 transform hover:scale-110 flex items-center gap-3">
                    <Plus size={24} /> New Workflow
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-8 bg-slate-800/20 p-10 rounded-[3rem] border border-slate-800 backdrop-blur-3xl shadow-2xl">
                    <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-widest flex items-center gap-3 border-b border-white/5 pb-6">
                        <Settings size={24} className="text-indigo-500" /> Active Configurations
                    </h2>
                    <div className="space-y-6">
                        {rules.map((rule) => (
                            <div key={rule.id} className="group relative bg-slate-900 border border-slate-800 p-8 rounded-3xl hover:border-indigo-500/50 transition duration-500">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-4 bg-indigo-500/10 text-indigo-400 rounded-2xl group-hover:scale-110 transition duration-500">
                                        <ArrowRight size={24} />
                                    </div>
                                    <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition duration-500 ${
                                        rule.status === 'Enabled' ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'
                                    }`}>
                                        {rule.status}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                                        <span>RULE TYPE</span>
                                        <span>VALUE</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-6">
                                        <p className="text-2xl font-black text-white">{rule.type}</p>
                                        <p className="text-2xl font-black text-indigo-400">{rule.value}</p>
                                    </div>
                                    <div className="pt-6 border-t border-slate-800 flex justify-between items-center bg-transparent">
                                        <div>
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Approver</p>
                                            <p className="text-lg font-bold text-slate-200">{rule.approver}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => toggleRule(rule.id)} className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition text-slate-400 hover:text-white">
                                                <Trash2 size={18} />
                                            </button>
                                            <button className="p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition text-slate-400 hover:text-indigo-400">
                                                <Settings size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 p-12 rounded-[3.5rem] relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 p-10 opacity-10 blur-xl group-hover:blur-none transition duration-[2s]">
                        <Settings size={300} className="text-white animate-spin-slow" />
                    </div>
                    <div className="relative z-10 space-y-10 mt-10">
                        <h2 className="text-4xl font-black text-white leading-tight">Global System Control Settings</h2>
                        <div className="space-y-8">
                            {[
                                { label: 'Multi-Level Approval', desc: 'Require sequence of approvals for large amounts', enabled: true },
                                { label: 'OCR Auto-Scanning', desc: 'Automatically extract data from uploaded receipts', enabled: true },
                                { label: 'Auto-Currency Conversion', desc: 'Convert all expenses to base USD automatically', enabled: false },
                                { label: 'Daily Expense Limit', desc: 'Warn users if daily total exceeds limit', enabled: true },
                            ].map((setting, i) => (
                                <div key={i} className="flex justify-between items-center group cursor-pointer">
                                    <div className="space-y-1 pr-6">
                                        <p className="text-xl font-bold text-white group-hover:text-indigo-400 transition">{setting.label}</p>
                                        <p className="text-slate-400 font-medium text-sm">{setting.desc}</p>
                                    </div>
                                    <div className={`w-16 h-8 rounded-full transition-all duration-500 relative cursor-pointer border-2 ${
                                        setting.enabled ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-800 border-slate-700'
                                    }`}>
                                        <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full transition-all duration-500 shadow-xl ${
                                            setting.enabled ? 'left-9 shadow-indigo-400/50 scale-110' : 'left-1 scale-90'
                                        }`}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full bg-white text-indigo-900 text-xl font-black py-6 rounded-3xl transition duration-500 transform hover:scale-105 shadow-3xl flex items-center justify-center gap-4 mt-12 group">
                             <Save size={24} /> Sync Configurations
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRules;
