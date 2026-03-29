import { useState, useEffect } from 'react';
import { UserPlus, Search, Shield, Edit, Trash2, Mail, Check, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { getUsers, createInvite } from '../../services/userService';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [pendingInvites, setPendingInvites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', role: 'employee', designation: '', manager_id: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const fetchData = () => {
        setLoading(true);
        getUsers()
            .then(data => {
                setUsers(data.users || []);
                setPendingInvites(data.pendingInvites || []);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    const managers = users.filter(u => u.role === 'manager');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        try {
            await createInvite(formData);
            setIsModalOpen(false);
            setFormData({ name: '', email: '', role: 'employee', designation: '', manager_id: '' });
            fetchData();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create user');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom duration-1000">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight tracking-tight uppercase group">User <span className="text-blue-600 border-b-4 border-blue-600/20 inline-block transition">Management</span></h1>
                    <p className="text-slate-600 text-base font-medium mt-2">Create and manage accounts within your organization.</p>
                </div>
                <Button 
                    variant="primary" 
                    className="py-3 px-6 text-sm font-black uppercase tracking-widest bg-blue-600 hover:bg-blue-500 shadow-blue-500/20"
                    onClick={() => setIsModalOpen(true)}
                >
                    <UserPlus size={18} /> New User
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

            <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-xl">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="p-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Identity</th>
                            <th className="p-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Access Role</th>
                            <th className="p-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em]">Department</th>
                            <th className="p-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] text-right">Ops Control</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="p-20 text-center text-slate-500 font-bold animate-pulse">
                                    Syncing organization ledger...
                                </td>
                            </tr>
                        ) : [...users, ...pendingInvites].length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-20 text-center text-slate-500 font-bold">
                                    No users found in organization.
                                </td>
                            </tr>
                        ) : (
                            [...users, ...pendingInvites].map((user) => (
                                <tr key={user.email} className={`group hover:bg-slate-50 transition duration-500 ${user.status === 'pending' ? 'opacity-70 italic' : ''}`}>
                                    <td className="p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center font-black text-slate-900 text-base uppercase transition">
                                                {user.name ? user.name[0] : '?'}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-lg tracking-tight">{user.name || 'Invited User'}</p>
                                                <p className="text-slate-500 font-bold text-xs">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            user.role === 'manager' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 
                                            user.role === 'admin' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-800 text-slate-400'
                                        }`}>
                                            <Shield size={12} />
                                            {user.role}
                                        </div>
                                        {user.status === 'pending' && (
                                            <span className="ml-2 text-[8px] text-amber-500 font-black uppercase tracking-widest">Pending</span>
                                        )}
                                    </td>
                                    <td className="p-6 text-sm font-bold text-slate-400">
                                        {user.designation || 'TBD'}
                                    </td>
                                    <td className="p-6 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
                                            <button className="bg-slate-900 border border-white/5 hover:border-blue-500 text-slate-400 hover:text-blue-400 p-2.5 rounded-xl transition">
                                                <Edit size={16} />
                                            </button>
                                            <button className="bg-slate-900 border border-white/5 hover:border-rose-500 text-slate-400 hover:text-rose-400 p-2.5 rounded-xl transition">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-12 p-10 bg-gradient-to-br from-blue-50 via-white to-white border border-blue-100 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-widest uppercase italic leading-tight">Bulk Credential Sync</h3>
                    <p className="text-slate-600 font-medium text-sm">Batch generate passwords and send login links to multiple employees instantly.</p>
                </div>
                <Button variant="secondary" className="py-4 px-8 text-base font-black italic uppercase tracking-widest border-2 border-slate-900 bg-slate-900 text-white hover:bg-slate-800">Trigger Sync</Button>
            </div>
            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                title="Invite New User"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-4 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl flex items-center gap-2 border border-rose-100">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <Input 
                            label="Full Name" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="e.g. Abdullah Khan"
                            required
                        />
                        <Input 
                            label="Email Address" 
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="e.g. employee@company.com"
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        />
                        <div className="space-y-1.5">
                            <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Role</label>
                            <select 
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold focus:ring-4 focus:ring-blue-500/20 outline-none transition"
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value, manager_id: ''})}
                            >
                                <option value="employee">Employee</option>
                                <option value="manager">Manager</option>
                            </select>
                        </div>
                        {formData.role === 'employee' && (
                            <div className="space-y-1.5">
                                <label className="text-[10px] uppercase font-black tracking-widest text-slate-500 ml-1">Assigned Manager</label>
                                <select 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-bold focus:ring-4 focus:ring-blue-500/20 outline-none transition"
                                    value={formData.manager_id}
                                    onChange={(e) => setFormData({...formData, manager_id: e.target.value})}
                                    required
                                >
                                    <option value="">Select a Manager</option>
                                    {managers.map(m => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <Input 
                            label="Designation/Department" 
                            value={formData.designation}
                            onChange={(e) => setFormData({...formData, designation: e.target.value})}
                            placeholder="e.g. Senior Developer"
                        />
                    </div>
                    <div className="pt-4 flex gap-4">
                        <Button 
                            type="button" 
                            variant="outline" 
                            className="flex-1 py-4"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            variant="primary" 
                            className="flex-1 py-4 bg-blue-600"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Invite'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ManageUsers;
