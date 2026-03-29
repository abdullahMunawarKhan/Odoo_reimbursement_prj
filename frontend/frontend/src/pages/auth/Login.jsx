import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { loginUser } from '../../services/authService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        <div className="bg-slate-900/40 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-slate-800 shadow-3xl shadow-blue-500/10 transition hover:border-blue-500/30 duration-700">
            <h2 className="text-4xl font-extrabold mb-2 text-white text-center">Login</h2>
            <p className="text-slate-500 text-center mb-10">Access your business finance dashboard</p>

            {error && <div className="bg-rose-500/10 text-rose-500 p-4 rounded-xl border border-rose-500/20 mb-6 text-center animate-in zoom-in">{error}</div>}

            <form onSubmit={handleLogin} className="space-y-6">
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    icon={Mail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="********"
                    icon={Lock}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-5 text-xl font-black"
                    disabled={loading}
                >
                    {loading ? "Authenticating..." : <div className="flex items-center gap-2">Log In <LogIn size={20} /></div>}
                </Button>
            </form>

            <div className="mt-8 text-center">
                <span className="text-slate-500 font-medium">New around here? </span>
                <Link to="/auth/signup" className="text-blue-400 hover:text-blue-300 font-black decoration-blue-500/20 underline decoration-4 underline-offset-4 transition">Create FREE Account</Link>
            </div>
        </div>
    );
};

export default Login;
