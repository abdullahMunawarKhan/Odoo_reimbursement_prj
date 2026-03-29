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
            <h2 className="text-2xl font-black text-slate-900 mb-1">Welcome back</h2>
            <p className="text-slate-600 text-sm mb-8">Log in to your account to continue</p>



            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 mb-5 flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></div>
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
                <Input 
                    label="Email Address" 
                    type="email" 
                    placeholder="name@company.com" 
                    icon={Mail} 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />

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
