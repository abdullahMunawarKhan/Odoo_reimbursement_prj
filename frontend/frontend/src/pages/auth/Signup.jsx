import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/authStore';
import { signupUser } from '../../services/authService';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { ROLES } from '../../constants/roles';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(ROLES.EMPLOYEE);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const data = await signupUser(name, email, password, role);
            login(data.user, data.token);
            navigate('/employee/dashboard'); // Default
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed! Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-900/40 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-slate-800 shadow-3xl shadow-emerald-500/10 transition hover:border-emerald-500/30 duration-700">
            <h2 className="text-4xl font-extrabold mb-2 text-white text-center">Join Us</h2>
            <p className="text-slate-500 text-center mb-10">Create your account to start managing reimbursements</p>

            {error && <div className="bg-rose-500/10 text-rose-500 p-4 rounded-xl border border-rose-500/20 mb-6 text-center animate-in zoom-in">{error}</div>}

            <form onSubmit={handleSignup} className="space-y-6">
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

                <div className="mb-4">
                    <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2 px-1">Role / Job Title</label>
                    <div className="relative group">
                        <select
                            className="bg-slate-900 border border-slate-800 text-white rounded-2xl p-4 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-300 appearance-none font-bold"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value={ROLES.EMPLOYEE}>Employee</option>
                            <option value={ROLES.MANAGER}>Manager</option>
                            <option value={ROLES.ADMIN}>Admin</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover:text-emerald-500 transition-colors">
                            <UserPlus size={20} />
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    variant="emerald"
                    className="w-full py-5 text-xl font-black"
                    disabled={loading}
                >
                    {loading ? "Creating Account..." : <div className="flex items-center gap-2">Build Account <UserPlus size={20} /></div>}
                </Button>
            </form>

            <div className="mt-8 text-center text-slate-500 mb-6 font-medium">
                Already have an account? <Link to="/auth/login" className="text-emerald-400 hover:text-emerald-300 font-extrabold decoration-emerald-500/20 underline decoration-4 underline-offset-4 transition">Log In Here</Link>
            </div>
        </div>
    );
};

export default Signup;
