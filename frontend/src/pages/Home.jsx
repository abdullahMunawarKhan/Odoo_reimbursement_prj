import { Link } from 'react-router-dom';
import {
    Receipt, ShieldCheck, Clock, BarChart3, Users, CheckCircle2,
    ArrowRight, Zap, Globe, Lock, Star, ChevronRight
} from 'lucide-react';

const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E5E7EB]/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
                    <span className="text-white font-black text-sm">R</span>
                </div>
                <span className="text-lg font-black text-[#111827]">Reimburse<span className="text-[#4F46E5]">It</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="text-sm font-medium text-[#6B7280] hover:text-[#4F46E5] transition-colors">Features</a>
                <a href="#how-it-works" className="text-sm font-medium text-[#6B7280] hover:text-[#4F46E5] transition-colors">How It Works</a>
                <a href="#stats" className="text-sm font-medium text-[#6B7280] hover:text-[#4F46E5] transition-colors">Why Us</a>
            </div>
            <div className="flex items-center gap-3">
                <Link to="/auth/login" className="px-4 py-2 text-sm font-semibold text-[#374151] hover:text-[#4F46E5] transition-colors">
                    Sign In
                </Link>
                <Link to="/auth/signup" className="px-4 py-2 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold shadow-md shadow-indigo-200 transition-all hover:shadow-lg hover:shadow-indigo-200 hover:-translate-y-px">
                    Get Started Free
                </Link>
            </div>
        </div>
    </nav>
);

const FeatureCard = ({ icon: Icon, title, description, accent }) => (
    <div className="group bg-white rounded-2xl p-7 border border-[#F3F4F6] hover:border-[#4F46E5]/30 shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-300 hover:-translate-y-1">
        <div className={`inline-flex p-3 rounded-xl mb-5 ${accent}`}>
            <Icon size={22} className="text-[#4F46E5]" />
        </div>
        <h3 className="text-base font-bold text-[#111827] mb-2">{title}</h3>
        <p className="text-sm text-[#6B7280] leading-relaxed">{description}</p>
    </div>
);

const StepCard = ({ number, title, description }) => (
    <div className="flex gap-5">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4F46E5] text-white font-black text-sm flex items-center justify-center shadow-md shadow-indigo-200">
            {number}
        </div>
        <div className="pt-1">
            <h3 className="font-bold text-[#111827] mb-1.5">{title}</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">{description}</p>
        </div>
    </div>
);

const StatCard = ({ value, label, icon: Icon }) => (
    <div className="text-center">
        <div className="flex justify-center mb-3">
            <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                <Icon size={22} className="text-[#4F46E5]" />
            </div>
        </div>
        <div className="text-3xl font-black text-[#111827] mb-1">{value}</div>
        <div className="text-sm text-[#6B7280] font-medium">{label}</div>
    </div>
);

const Home = () => {
    const features = [
        {
            icon: Receipt,
            title: 'Smart Expense Submission',
            description: 'Submit receipts instantly with AI-powered OCR that automatically extracts amounts, dates, and vendor information.',
            accent: 'bg-indigo-50 border border-indigo-100'
        },
        {
            icon: ShieldCheck,
            title: 'Multi-Level Approval',
            description: 'Configure sequential or parallel approval chains. Managers and admins get instant notifications for pending requests.',
            accent: 'bg-emerald-50 border border-emerald-100'
        },
        {
            icon: BarChart3,
            title: 'Real-Time Analytics',
            description: 'Gain instant visibility into spending patterns, pending approvals, and reimbursement status across the entire organization.',
            accent: 'bg-violet-50 border border-violet-100'
        },
        {
            icon: Clock,
            title: 'Faster Processing',
            description: 'Reduce reimbursement cycles from weeks to days. Automated workflows eliminate manual back-and-forth communication.',
            accent: 'bg-amber-50 border border-amber-100'
        },
        {
            icon: Users,
            title: 'Role-Based Access',
            description: 'Granular permissions for Employees, Managers, and Administrators. Everyone sees exactly what they need.',
            accent: 'bg-rose-50 border border-rose-100'
        },
        {
            icon: Lock,
            title: 'Enterprise Security',
            description: 'AES-256 encryption at rest, TLS 1.3 in transit, and audit logs for every action. Your financial data is always protected.',
            accent: 'bg-slate-50 border border-slate-100'
        }
    ];

    const steps = [
        {
            number: '1',
            title: 'Submit Your Expense',
            description: 'Upload a receipt photo and fill in the details. Our AI pre-fills the form from your receipt automatically.'
        },
        {
            number: '2',
            title: 'Manager Reviews & Approves',
            description: 'Your manager receives an instant notification and can approve or reject with a single click from any device.'
        },
        {
            number: '3',
            title: 'Get Reimbursed',
            description: 'Once approved, finance processes the payment. You get a notification and a full audit trail of the entire request.'
        }
    ];

    return (
        <div className="bg-[#F9FAFB] min-h-screen font-sans">
            <Navbar />

            {/* ── Hero ── */}
            <section className="relative pt-36 pb-24 px-6 overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#4F46E5]/5 rounded-full blur-3xl"></div>
                    <div className="absolute top-32 right-10 w-72 h-72 bg-violet-400/10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-2xl"></div>
                </div>

                <div className="relative max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-[#4F46E5] rounded-full px-4 py-1.5 text-sm font-semibold mb-8 shadow-sm">
                        <Zap size={14} className="fill-[#4F46E5]" />
                        AI-Powered Reimbursement Platform
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black text-[#111827] leading-[1.1] tracking-tight mb-6">
                        Expense Reimbursement,{' '}
                        <span className="relative">
                            <span className="text-[#4F46E5]">Finally Simple</span>
                            <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 300 6" fill="none">
                                <path d="M0 3 Q75 0 150 3 Q225 6 300 3" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
                            </svg>
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-[#6B7280] max-w-2xl mx-auto mb-10 leading-relaxed">
                        Stop chasing approvals over email. ReimburseIt brings employees, managers, and finance teams onto one seamless platform — with full visibility at every step.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                        <Link to="/auth/signup"
                            className="flex items-center gap-2 px-7 py-3.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl shadow-lg shadow-indigo-300/50 transition-all hover:shadow-xl hover:shadow-indigo-300/60 hover:-translate-y-0.5 text-base">
                            Start for Free <ArrowRight size={18} />
                        </Link>
                        <Link to="/auth/login"
                            className="flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-[#F9FAFB] border border-[#E5E7EB] text-[#374151] font-bold rounded-xl shadow-sm transition-all hover:border-[#4F46E5]/30 text-base">
                            Sign In <ChevronRight size={18} className="text-[#9CA3AF]" />
                        </Link>
                    </div>

                    {/* Social Proof Strip */}
                    <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-[#9CA3AF]">
                        {['No credit card required', 'Free for teams under 10', 'GDPR compliant'].map((item, i) => (
                            <div key={i} className="flex items-center gap-1.5">
                                <CheckCircle2 size={15} className="text-emerald-500" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Stats ── */}
            <section id="stats" className="py-16 px-6">
                <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-[#E5E7EB] shadow-sm px-8 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                        <StatCard value="10x" label="Faster Processing" icon={Zap} />
                        <StatCard value="99.9%" label="Uptime SLA" icon={Globe} />
                        <StatCard value="500+" label="Companies Trust Us" icon={Users} />
                        <StatCard value="$2M+" label="Processed Monthly" icon={BarChart3} />
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section id="features" className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <p className="text-sm font-bold text-[#4F46E5] uppercase tracking-widest mb-3">Everything You Need</p>
                        <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-4">
                            Powerful features for modern teams
                        </h2>
                        <p className="text-[#6B7280] max-w-xl mx-auto">
                            Everything you need to manage company expense reimbursements, from submission to payment, in one place.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((f, i) => <FeatureCard key={i} {...f} />)}
                    </div>
                </div>
            </section>

            {/* ── How It Works ── */}
            <section id="how-it-works" className="py-20 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-sm font-bold text-[#4F46E5] uppercase tracking-widest mb-3">Simple Process</p>
                            <h2 className="text-3xl md:text-4xl font-black text-[#111827] mb-4">
                                From receipt to payment in 3 steps
                            </h2>
                            <p className="text-[#6B7280] mb-10 leading-relaxed">
                                No more spreadsheets, no more lost receipts. ReimburseIt digitizes and automates the entire reimbursement workflow.
                            </p>
                            <div className="space-y-8">
                                {steps.map((s) => <StepCard key={s.number} {...s} />)}
                            </div>
                            <div className="mt-10">
                                <Link to="/auth/signup"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-xl shadow-md shadow-indigo-200 transition-all hover:-translate-y-0.5">
                                    Get Started <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        {/* Visual mockup */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-3xl blur-xl"></div>
                            <div className="relative bg-gradient-to-br from-[#EEF2FF] to-[#F5F3FF] rounded-3xl p-8 border border-indigo-100">
                                {/* Fake expense card */}
                                <div className="bg-white rounded-2xl p-5 shadow-md border border-[#E5E7EB] mb-4">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <p className="font-bold text-[#111827] text-sm">Team Lunch — Client Visit</p>
                                            <p className="text-xs text-[#9CA3AF] mt-0.5">Submitted by Riya Sharma</p>
                                        </div>
                                        <span className="px-2.5 py-1 bg-amber-50 text-amber-600 text-xs font-semibold rounded-full border border-amber-100">Pending</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[#6B7280]">Amount</span>
                                        <span className="text-xl font-black text-[#111827]">₹4,250</span>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <button className="flex-1 py-2 bg-[#4F46E5] text-white text-xs font-bold rounded-lg">Approve</button>
                                        <button className="flex-1 py-2 bg-red-50 text-red-500 text-xs font-bold rounded-lg border border-red-100">Reject</button>
                                    </div>
                                </div>
                                {/* Fake approved card */}
                                <div className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-100">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <p className="font-bold text-[#111827] text-sm">Flight — Bangalore Office</p>
                                            <p className="text-xs text-[#9CA3AF] mt-0.5">Submitted by Arjun Dev</p>
                                        </div>
                                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full border border-emerald-100 flex items-center gap-1">
                                            <CheckCircle2 size={11} /> Approved
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-[#6B7280]">Amount</span>
                                        <span className="text-xl font-black text-[#111827]">₹12,800</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-3xl px-10 py-16 text-center text-white relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-20 -translate-y-20"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-x-16 translate-y-16"></div>
                        </div>
                        <div className="relative z-10">
                            <div className="flex justify-center mb-5">
                                <div className="flex -space-x-2">
                                    {['RK', 'AS', 'PM', 'DJ'].map((initials, i) => (
                                        <div key={i} className="w-9 h-9 rounded-full border-2 border-white/40 bg-indigo-400 flex items-center justify-center text-xs font-bold text-white">{initials}</div>
                                    ))}
                                </div>
                                <div className="ml-3 flex items-center gap-1 text-sm text-indigo-200">
                                    <Star size={14} className="fill-amber-300 text-amber-300" />
                                    <span className="font-semibold text-white">4.9</span> from 200+ reviews
                                </div>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
                                Ready to simplify<br />your expense workflow?
                            </h2>
                            <p className="text-indigo-200 mb-8 max-w-lg mx-auto">
                                Join hundreds of companies that have cut their reimbursement processing time by 90% with ReimburseIt.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <Link to="/auth/signup"
                                    className="px-7 py-3.5 bg-white text-[#4F46E5] font-black rounded-xl hover:bg-indigo-50 transition-all shadow-lg hover:-translate-y-0.5 text-base">
                                    Create Free Account
                                </Link>
                                <Link to="/auth/login"
                                    className="px-7 py-3.5 bg-white/15 backdrop-blur-sm border border-white/25 text-white font-bold rounded-xl hover:bg-white/20 transition-all text-base">
                                    Sign In Instead
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="bg-white border-t border-[#E5E7EB] py-10 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-[#4F46E5] rounded-lg flex items-center justify-center">
                            <span className="text-white font-black text-xs">R</span>
                        </div>
                        <span className="font-black text-[#111827]">Reimburse<span className="text-[#4F46E5]">It</span></span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-[#9CA3AF]">
                        <Link to="/terms" className="hover:text-[#4F46E5] transition-colors">Terms of Service</Link>
                        <Link to="/privacy" className="hover:text-[#4F46E5] transition-colors">Privacy Policy</Link>
                        <span>© 2024 ReimburseIt. All rights reserved.</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
