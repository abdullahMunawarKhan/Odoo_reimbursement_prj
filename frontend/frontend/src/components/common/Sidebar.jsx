import { Link, useLocation } from 'react-router-dom';
import { Home, FilePlus, CheckSquare, Settings, LayoutDashboard, Database, TrendingUp, Users, ShieldAlert, History } from 'lucide-react';
import { ROLES } from '../../constants/roles';

const Sidebar = ({ userRole }) => {
    const location = useLocation();

    const menuItems = [
        { label: 'Overview', icon: <LayoutDashboard size={20} />, path: `/${userRole}/dashboard` },
    ];

    if (userRole === ROLES.EMPLOYEE) {
        menuItems.push(
            { label: 'Submit Ticket', icon: <FilePlus size={20} />, path: '/employee/submit-expense' },
            { label: 'My Submissions', icon: <History size={20} />, path: '/employee/my-expenses' }
        );
    }

    if (userRole === ROLES.MANAGER || userRole === ROLES.ADMIN) {
        menuItems.push(
            { label: 'Review Pending', icon: <CheckSquare size={20} />, path: '/manager/approvals' }
        );
    }

    if (userRole === ROLES.ADMIN) {
        menuItems.push(
            { label: 'Global Audit', icon: <ShieldAlert size={20} />, path: '/admin/all-expenses' },
            { label: 'Identity Hub', icon: <Users size={20} />, path: '/admin/manage-users' },
            { label: 'Workflow Rules', icon: <Database size={20} />, path: '/admin/manage-rules' }
        );
    }

    return (
        <aside className="w-85 bg-slate-900 border-r border-slate-800 h-[calc(100vh-80px)] sticky top-[80px] hidden lg:flex flex-col overflow-y-auto p-8 space-y-16">
            <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6 px-4">Navigation</p>
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-5 px-6 py-5 rounded-[2rem] transition-all duration-500 font-black tracking-tight group ${
                            location.pathname === item.path
                                ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl shadow-blue-500/30'
                                : 'text-slate-500 hover:bg-slate-800/50 hover:text-white border border-transparent'
                        }`}
                    >
                        <div className={`transition duration-700 ${location.pathname === item.path ? 'scale-110 rotate-6' : 'group-hover:scale-110 group-hover:-rotate-6'}`}>
                            {item.icon}
                        </div>
                        <span className="text-[13px] uppercase tracking-widest">{item.label}</span>
                    </Link>
                ))}
            </div>

            <div className="mt-auto pt-10 border-t border-white/5">
                <div className="bg-slate-950 p-8 rounded-[2.5rem] space-y-4 border border-white/5 relative group cursor-pointer overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-2">Sync Status</p>
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                             <p className="text-sm font-black text-white">Cloud Synced</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
