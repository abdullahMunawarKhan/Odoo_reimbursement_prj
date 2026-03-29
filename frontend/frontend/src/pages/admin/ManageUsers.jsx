import { useState } from 'react';
import { UserPlus, Search, Shield, Edit, Trash2, Mail } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const ManageUsers = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Employee', dept: 'Engineering' },
        { id: 2, name: 'Alice Smith', email: 'alice@example.com', role: 'Manager', dept: 'Finance' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Employee', dept: 'Marketing' },
    ]);

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-5xl font-black text-white leading-tight tracking-tighter uppercase mb-2 group">User <span className="text-blue-500 group-hover:rotate-12 inline-block transition">Management</span></h1>
                    <p className="text-slate-500 text-xl font-medium">Create and manage accounts within your organization.</p>
                </div>
                <Button variant="primary" className="py-4 px-8 text-lg font-black uppercase tracking-widest bg-emerald-600 shadow-emerald-500/20">
                    <UserPlus size={20} /> New User
                </Button>
            </header>

            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or department..."
                        className="w-full bg-slate-900 border border-white/5 text-white rounded-[1.5rem] pl-16 pr-6 p-5 focus:ring-4 focus:ring-blue-500/20 outline-none transition duration-500 font-bold"
                    />
                </div>
            </div>

            <div className="bg-slate-900/40 rounded-[3rem] border border-white/5 overflow-hidden backdrop-blur-3xl shadow-3xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-950/50 border-b border-white/5">
                            <th className="p-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Identity</th>
                            <th className="p-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Access Role</th>
                            <th className="p-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Department</th>
                            <th className="p-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] text-right">Ops Control</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {users.map((user) => (
                            <tr key={user.id} className="group hover:bg-slate-950 transition duration-700">
                                <td className="p-8">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 bg-slate-950 border border-white/5 rounded-2xl flex items-center justify-center font-black text-white text-xl uppercase group-hover:rotate-12 transition">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-black text-white text-2xl tracking-tighter">{user.name}</p>
                                            <p className="text-slate-500 font-bold text-sm">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-8">
                                    <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                        user.role === 'Manager' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-slate-800 text-slate-400'
                                    }`}>
                                        <Shield size={14} />
                                        {user.role}
                                    </div>
                                </td>
                                <td className="p-8">
                                    <p className="text-xl font-black text-slate-300 tracking-tight">{user.dept}</p>
                                </td>
                                <td className="p-8 text-right">
                                    <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition duration-500">
                                        <button className="bg-slate-900 border border-white/5 hover:border-blue-500 text-slate-400 hover:text-blue-400 p-4 rounded-2xl transition transform hover:scale-110">
                                            <Edit size={20} />
                                        </button>
                                        <button className="bg-slate-900 border border-white/5 hover:border-rose-500 text-slate-400 hover:text-rose-400 p-4 rounded-2xl transition transform hover:scale-110">
                                            <Trash2 size={20} />
                                        </button>
                                        <button className="bg-emerald-600 text-white p-4 rounded-2xl transition transform hover:scale-110 shadow-lg shadow-emerald-500/20">
                                            <Mail size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-12 p-12 bg-gradient-to-br from-blue-900/20 to-slate-900 border border-white/5 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="space-y-4">
                    <h3 className="text-4xl font-black text-white tracking-widest italic leading-tight">Bulk Credential Sync</h3>
                    <p className="text-slate-500 font-medium text-lg">Batch generate passwords and send login links to multiple employees instantly.</p>
                </div>
                <Button variant="secondary" className="py-6 px-12 text-2xl font-black italic uppercase tracking-widest border-4">Trigger Global Send</Button>
            </div>
        </div>
    );
};

export default ManageUsers;
