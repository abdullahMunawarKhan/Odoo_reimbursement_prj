import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { loginUser } from '../../services/authService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await loginUser(email, password);
            login(data.user, data.token);
            const role = data.user.role;
            if (role === 'admin') navigate('/admin/dashboard');
            else if (role === 'manager') navigate('/manager/dashboard');
            else navigate('/employee/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-black text-[#111827] mb-1">Welcome back</h2>
            <p className="text-[#6B7280] text-sm mb-8">Log in to your account to continue</p>

<<<<<<< HEAD
=======
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
                <span className="flex-shrink-0 mx-3 text-xs font-medium text-[#9CA3AF]">or continue with email</span>
                <div className="flex-grow border-t border-[#E5E7EB]"></div>
            </div>
>>>>>>> eb5776036fcf638add3e6b393a414f6cc5477775

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 mb-5 flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></div>
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
                <Input label="Email Address" type="email" placeholder="name@company.com" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} required />

                <div>
                    <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Your password"
                        icon={Lock}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        trailingIcon={showPassword ? EyeOff : Eye}
                        onTrailingIconClick={() => setShowPassword(!showPassword)}
                        required
                        className="mb-2"
                    />
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}
                                className="w-4 h-4 accent-[#4F46E5] rounded border-[#E5E7EB]" />
                            <span className="text-sm text-[#6B7280] group-hover:text-[#374151] transition-colors select-none">Remember me</span>
                        </label>
                        <button type="button" className="text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors">Forgot password?</button>
                    </div>
                </div>

                <Button type="submit" variant="primary" className="w-full py-3 text-base mt-2" disabled={loading}>
                    {loading ? "Signing in..." : <><LogIn size={16} /> Sign In</>}
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-[#6B7280]">
                New here?{' '}
                <Link to="/auth/signup" className="font-semibold text-[#4F46E5] hover:text-[#4338CA] transition-colors">Create an account</Link>
            </p>
        </div>
    );
};

export default Login;
