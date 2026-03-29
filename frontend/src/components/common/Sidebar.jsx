import { Link, useLocation } from 'react-router-dom';
import { CheckSquare, Settings, LayoutDashboard, Database, FilePlus, Users, ShieldAlert, History } from 'lucide-react';
import { ROLES } from '../../constants/roles';

const Sidebar = ({ userRole }) => {
    const location = useLocation();

    const menuItems = [
        { label: 'Overview', icon: <LayoutDashboard size={18} />, path: `/${userRole}/dashboard` },
    ];

    if (userRole === ROLES.EMPLOYEE) {
        menuItems.push(
            { label: 'Submit Expense', icon: <FilePlus size={18} />, path: '/employee/submit-expense' },
            { label: 'My Submissions', icon: <History size={18} />, path: '/employee/my-expenses' }
        );
    }

    if (userRole === ROLES.MANAGER || userRole === ROLES.ADMIN) {
        menuItems.push(
            { label: 'Review Pending', icon: <CheckSquare size={18} />, path: '/manager/approvals' }
        );
    }

    if (userRole === ROLES.ADMIN) {
        menuItems.push(
            { label: 'Global Audit', icon: <ShieldAlert size={18} />, path: '/admin/all-expenses' },
            { label: 'Manage Users', icon: <Users size={18} />, path: '/admin/manage-users' },
            { label: 'Approval Rules', icon: <Database size={18} />, path: '/admin/manage-rules' }
        );
    }

    return (
        <aside className="w-64 bg-white border-r border-[#E5E7EB] h-[calc(100vh-57px)] sticky top-[57px] hidden lg:flex flex-col overflow-y-auto py-6">
            {/* Navigation Group */}
            <div className="px-3 mb-2">
                <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-[0.2em] px-3 mb-2">Navigation</p>
                <nav className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm group ${
                                    isActive
                                        ? 'bg-indigo-50 text-[#4F46E5]'
                                        : 'text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827]'
                                }`}
                            >
                                <div className={`transition-colors duration-200 ${isActive ? 'text-[#4F46E5]' : 'text-[#9CA3AF] group-hover:text-[#6B7280]'}`}>
                                    {item.icon}
                                </div>
                                <span>{item.label}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4F46E5]"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Bottom Status Panel */}
            <div className="mt-auto px-3">
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
                        <p className="text-xs font-bold text-[#111827]">System Online</p>
                    </div>
                    <p className="text-[11px] text-[#6B7280]">All services running normally</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
