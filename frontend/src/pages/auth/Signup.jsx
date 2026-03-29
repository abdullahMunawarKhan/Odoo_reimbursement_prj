import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { signupUser } from '../../services/authService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Mail, Lock, User, UserPlus, Eye, EyeOff, Info, Building } from 'lucide-react';
import { ROLES } from '../../constants/roles';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState(ROLES.EMPLOYEE);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        
        if (!agreedToTerms) {
            setError('You must agree to the Terms of Service to continue.');
            return;
        }
        
        setLoading(true);
        setError('');
        try {
            const data = await signupUser(name, email, password, role, companyName);
            login(data.user, data.token);
            
            const userRole = data.user.role;
            if (userRole === 'admin') navigate('/admin/dashboard');
            else if (userRole === 'manager') navigate('/manager/dashboard');
            else navigate('/employee/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed! Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-4xl font-extrabold mb-2 text-white">Create Account</h2>
            <p className="text-slate-400 mb-8">Join ReimburseIt to manage internal processes</p>


            {error && <div className="bg-rose-500/10 text-rose-500 p-4 rounded-xl border border-rose-500/20 mb-6 flex items-center gap-3 animate-in zoom-in-95"><div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>{error}</div>}

            <form onSubmit={handleSignup} className="space-y-5">
                <Input
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    icon={User}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    label="Work Email"
                    type="email"
                    placeholder="john@company.com"
                    icon={Mail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="username"
                />
                
                <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    trailingIcon={showPassword ? EyeOff : Eye}
                    onTrailingIconClick={() => setShowPassword(!showPassword)}
                    required
                    autoComplete="current-password"
                />

                <div className="mb-2">
                    <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 px-1 flex items-center gap-2">
                        Organizational Role
                        <div className="relative group/tooltip">
                            <Info size={14} className="text-slate-600 hover:text-emerald-400 cursor-help" />
                            <div className="absolute left-1/2 -top-10 -translate-x-1/2 bg-slate-800 text-xs text-white p-2 text-center rounded hidden group-hover/tooltip:block w-48 shadow-lg pointer-events-none z-20">
                                This determines your initial dashboard view.
                            </div>
                        </div>
                    </label>
                    <div className="relative group">
                        <select
                            className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 appearance-none shadow-inner"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value={ROLES.EMPLOYEE}>Employee</option>
                            <option value={ROLES.MANAGER}>Manager</option>
                            <option value={ROLES.ADMIN}>Administrator</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover:text-emerald-500 transition-colors">
                            <UserPlus size={20} />
                        </div>
                    </div>
                </div>

                {role === ROLES.ADMIN && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
                        <Input
                            label="Company Name"
                            type="text"
                            placeholder="Acme Corp"
                            icon={Building}
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </div>
                )}

                <div className="pt-2 pb-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-1">
                            <input 
                                type="checkbox" 
                                className="peer appearance-none w-5 h-5 border-2 border-slate-700 rounded-md bg-transparent checked:bg-emerald-500 checked:border-emerald-500 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                            />
                            <div className="absolute text-slate-950 opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200">
                                <svg className="w-3.5 h-3.5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        <span className="text-sm text-slate-400 leading-relaxed select-none">
                            I agree to the{' '}
                            <span className="text-white hover:text-emerald-400 transition-colors font-medium decoration-emerald-500/30 underline decoration-2 underline-offset-4">Terms of Service</span>
                            {' '}and{' '}
                            <span className="text-white hover:text-emerald-400 transition-colors font-medium decoration-emerald-500/30 underline decoration-2 underline-offset-4">Privacy Policy</span>.
                        </span>
                    </label>
                </div>

                <Button
                    type="submit"
                    variant="emerald"
                    className="w-full py-4 text-lg font-bold"
                    disabled={loading}
                >
                    {loading ? "Creating..." : <div className="flex items-center gap-2">Create Account <UserPlus size={20} /></div>}
                </Button>
            </form>

            <div className="mt-8 text-center text-slate-500 font-medium">
                Already have an account?{' '}
                <Link to="/auth/login" className="text-white hover:text-emerald-400 transition-colors font-bold decoration-emerald-500/30 underline decoration-2 underline-offset-4">
                    Sign in here
                </Link>
            </div>
        </div>
    );
};

export default Signup;
