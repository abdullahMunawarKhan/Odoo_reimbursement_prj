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
        if (!agreedToTerms) { setError('You must agree to the Terms of Service to continue.'); return; }
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
            setError(err.response?.data?.error || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-black text-slate-900 mb-1">Create Account</h2>
            <p className="text-slate-600 text-sm mb-8">Join ReimburseIt to manage internal expenses</p>


            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 mb-5 flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></div>
                    {error}
                </div>
            )}

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
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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

                <div>
                    <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-1.5">Organizational Role</label>
                    <div className="relative">
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full border border-[#E5E7EB] rounded-lg px-3 py-3 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all appearance-none bg-white"
                        >
                            <option value={ROLES.EMPLOYEE}>Employee</option>
                            <option value={ROLES.MANAGER}>Manager</option>
                            <option value={ROLES.ADMIN}>Administrator</option>
                        </select>
                        <UserPlus size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none" />
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

                <label className="flex items-center gap-2.5 cursor-pointer pt-1 mb-2">
                    <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-[18px] h-[18px] accent-[#3832D0] cursor-pointer shrink-0 rounded-sm" />
                    <span className="text-[15px] text-[#5A6376]">
                        I agree to the{' '}
                        <Link to="/terms" target="_blank" className="text-[#3832D0] hover:underline cursor-pointer">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" target="_blank" className="text-[#3832D0] hover:underline cursor-pointer">Privacy Policy</Link>.
                    </span>
                </label>

                <Button type="submit" variant="primary" className="w-full py-3 text-base" disabled={loading || !agreedToTerms}>
                    {loading ? "Creating..." : <><UserPlus size={16} /> Create Account</>}
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-[#6B7280]">
                Already have an account?{' '}
                <Link to="/auth/login" className="font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors">Sign in here</Link>
            </p>
        </div>
    );
};

export default Signup;
