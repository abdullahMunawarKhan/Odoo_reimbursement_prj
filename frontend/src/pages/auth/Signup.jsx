import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { signupUser } from '../../services/authService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Mail, Lock, User, UserPlus, Eye, EyeOff } from 'lucide-react';
import { ROLES } from '../../constants/roles';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            const data = await signupUser(name, email, password, role);
            login(data.user, data.token);
            navigate('/employee/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-black text-[#111827] mb-1">Create Account</h2>
            <p className="text-[#6B7280] text-sm mb-8">Join ReimburseIt to manage internal expenses</p>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="flex items-center justify-center gap-2 border border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB] text-[#374151] py-2.5 rounded-lg text-sm font-medium transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                </button>
                <button className="flex items-center justify-center gap-2 border border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB] text-[#374151] py-2.5 rounded-lg text-sm font-medium transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                    </svg>
                    GitHub
                </button>
            </div>

            <div className="relative flex items-center mb-6">
                <div className="flex-grow border-t border-[#E5E7EB]"></div>
                <span className="flex-shrink-0 mx-3 text-xs font-medium text-[#9CA3AF]">or sign up with email</span>
                <div className="flex-grow border-t border-[#E5E7EB]"></div>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 mb-5 flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></div>
                    {error}
                </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
                <Input label="Full Name" type="text" placeholder="John Doe" icon={User} value={name} onChange={(e) => setName(e.target.value)} required />
                <Input label="Work Email" type="email" placeholder="john@company.com" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required />
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

                <label className="flex items-start gap-2 cursor-pointer group pt-1">
                    <input type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 accent-[#4F46E5] rounded border-[#E5E7EB] flex-shrink-0" />
                    <span className="text-sm text-[#6B7280] leading-relaxed">
                        I agree to the{' '}
                        <span className="text-[#4F46E5] font-medium hover:text-[#4338CA] cursor-pointer">Terms of Service</span>
                        {' '}and{' '}
                        <span className="text-[#4F46E5] font-medium hover:text-[#4338CA] cursor-pointer">Privacy Policy</span>.
                    </span>
                </label>

                <Button type="submit" variant="primary" className="w-full py-3 text-base" disabled={loading}>
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
