import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Bell, Settings } from 'lucide-react';
import { useAuth } from '../../store/authStore';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    return (
        <nav className="bg-white border-b border-[#E5E7EB] px-6 py-3 flex justify-between items-center sticky top-0 z-50 shadow-sm">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white font-black text-sm">R</span>
                </div>
                <span className="text-xl font-black text-[#111827] tracking-tight">
                    Reimburse<span className="text-[#4F46E5]">It</span>
                </span>
            </Link>

            {/* Right Side */}
            <div className="flex items-center gap-3">
                {user ? (
                    <>
                        {/* Notification Bell */}
                        <button className="p-2 text-[#6B7280] hover:text-[#4F46E5] hover:bg-indigo-50 rounded-lg transition-all duration-200">
                            <Bell size={20} />
                        </button>

                        {/* Settings */}
                        <button className="p-2 text-[#6B7280] hover:text-[#4F46E5] hover:bg-indigo-50 rounded-lg transition-all duration-200">
                            <Settings size={20} />
                        </button>

                        {/* Divider */}
                        <div className="w-px h-6 bg-[#E5E7EB]"></div>

                        {/* User Chip */}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full">
                            <div className="w-7 h-7 rounded-full bg-[#4F46E5] flex items-center justify-center text-white font-bold text-sm uppercase">
                                {user.name[0]}
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-semibold text-[#111827] leading-tight">{user.name}</p>
                                <p className="text-[10px] text-[#4F46E5] font-bold uppercase tracking-widest leading-tight">{user.role}</p>
                            </div>
                        </div>

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            className="p-2 text-[#6B7280] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                            title="Log Out"
                        >
                            <LogOut size={20} />
                        </button>
                    </>
                ) : (
                    <div className="flex gap-3">
                        <Link to="/auth/login" className="text-[#6B7280] hover:text-[#111827] px-4 py-2 transition font-semibold text-sm">Log In</Link>
                        <Link to="/auth/signup" className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2 rounded-lg transition font-semibold text-sm shadow-sm">Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
