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
            
            // Dynamic redirection based on role
            const role = data.user.role;
            if (role === 'admin') navigate('/admin/dashboard');
            else if (role === 'manager') navigate('/manager/dashboard');
            else navigate('/employee/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || "Login fail! Please check credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-4xl font-extrabold mb-2 text-white">Welcome back</h2>
            <p className="text-slate-400 mb-8">Log in to your account to continue</p>


            {error && <div className="bg-rose-500/10 text-rose-500 p-4 rounded-xl border border-rose-500/20 mb-6 flex items-center gap-3 animate-in zoom-in-95"><div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>{error}</div>}

            <form onSubmit={handleLogin} className="space-y-6">
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="name@company.com"
                    icon={Mail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                
                <div className="space-y-2">
                    <Input
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        icon={Lock}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        trailingIcon={showPassword ? EyeOff : Eye}
                        onTrailingIconClick={() => setShowPassword(!showPassword)}
                        required
                        className="mb-0"
                    />
                    
                    <div className="flex items-center justify-between pb-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input 
                                    type="checkbox" 
                                    className="peer appearance-none w-5 h-5 border-2 border-slate-700 rounded-md bg-transparent checked:bg-blue-500 checked:border-blue-500 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <div className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-200">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors select-none">Remember me</span>
                        </label>

                        <button type="button" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                            Forgot password?
                        </button>
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-4 text-lg font-bold mt-4"
                    disabled={loading}
                >
                    {loading ? "Authenticating..." : <div className="flex items-center gap-2">Sign In <LogIn size={20} /></div>}
                </Button>
            </form>

            <div className="mt-8 text-center text-slate-500 font-medium">
                New around here?{' '}
                <Link to="/auth/signup" className="text-white hover:text-blue-400 transition-colors font-bold decoration-blue-500/30 underline decoration-2 underline-offset-4">
                    Create an account
                </Link>
            </div>
        </div>
    );
};

export default Login;
