import { Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../store/authStore';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/auth/login');
    };

    return (
        <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent transform transition hover:scale-105">
                ReimburseIt
            </Link>

            <div className="flex items-center gap-6">
                {user ? (
                    <>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full border border-slate-700">
                            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold uppercase transition hover:rotate-[360deg] duration-500">
                                {user.name[0]}
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-black text-white leading-tight">{user.name}</p>
                                <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest leading-tight">{user.role}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-3 bg-slate-800 hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 rounded-xl transition-all duration-300"
                            title="Log Out"
                        >
                            <LogOut size={20} />
                        </button>
                    </>
                ) : (
                    <div className="flex gap-4">
                        <Link to="/auth/login" className="text-slate-500 hover:text-white px-4 py-2 transition font-bold uppercase text-xs tracking-widest">Log In</Link>
                        <Link to="/auth/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition font-black uppercase text-xs tracking-widest shadow-lg shadow-blue-500/20">Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
