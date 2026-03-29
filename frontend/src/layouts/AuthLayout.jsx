import React from 'react';
import { Outlet } from 'react-router-dom';
import { ShieldCheck, BarChart3, Clock, DollarSign } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-3">
        <div className="bg-indigo-100 p-2.5 rounded-lg text-[#4F46E5] flex-shrink-0">
            <Icon size={18} />
        </div>
        <div>
            <h3 className="text-[#111827] font-semibold text-sm">{title}</h3>
            <p className="text-[#6B7280] text-xs mt-0.5">{description}</p>
        </div>
    </div>
);

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#F9FAFB]">
            {/* Left Side: Branding */}
            <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 bg-[#4F46E5] p-12 xl:p-16 flex-col justify-between relative overflow-hidden">
                {/* Subtle pattern */}
                <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '60px 60px'}}></div>
                <div className="absolute top-[-10%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-indigo-800/40 rounded-full blur-3xl pointer-events-none"></div>

                {/* Logo */}
                <div className="relative z-10 flex items-center gap-2">
                    <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                        <DollarSign size={20} className="text-white stroke-[2.5]" />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tight">ReimburseIt</span>
                </div>

                {/* Middle Content */}
                <div className="relative z-10">
                    <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-4">
                        Enterprise expenses,<br/>
                        <span className="text-indigo-200 font-medium italic">effortlessly resolved.</span>
                    </h1>
                    <p className="text-indigo-200 text-base mb-10 leading-relaxed">
                        The fully automated, multi-tiered approval engine built for scaling companies. Stop tracking receipts, start making decisions.
                    </p>
                    <div className="space-y-4">
                        <FeatureItem icon={ShieldCheck} title="Multi-Level Security" description="Strict role-based access control and encrypted sessions." />
                        <FeatureItem icon={Clock} title="Real-Time Processing" description="AI-simulated OCR extraction for lightning fast submissions." />
                        <FeatureItem icon={BarChart3} title="Advanced Analytics" description="Global converted views and manager-level auditing." />
                    </div>
                </div>

                {/* Bottom Testimonial */}
                <div className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 p-5 rounded-2xl flex items-center gap-4">
                    <div className="flex -space-x-3">
                        <img className="w-10 h-10 rounded-full border-2 border-indigo-400 shadow" src="https://i.pravatar.cc/100?img=3" alt="Avatar" />
                        <img className="w-10 h-10 rounded-full border-2 border-indigo-400 shadow" src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
                        <img className="w-10 h-10 rounded-full border-2 border-indigo-400 shadow" src="https://i.pravatar.cc/100?img=5" alt="Avatar" />
                    </div>
                    <div>
                        <div className="flex text-yellow-300 gap-0.5 mb-0.5">
                            {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                        </div>
                        <p className="text-white font-semibold text-sm">Trusted by 10,000+ teams worldwide</p>
                    </div>
                </div>
            </div>

<<<<<<< HEAD
            {/* Right Side: Form Content Area */}
            <div className="w-full lg:w-7/12 xl:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden min-h-screen">
                {/* Mobile Background Elements (hidden on large screens to avoid clashing) */}
                <div className="absolute top-20 right-[-20%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] lg:hidden"></div>
                <div className="absolute bottom-[-10%] left-[-20%] w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] lg:hidden"></div>
                
                <div className="w-full max-w-md z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
                    {/* Mobile Logo Only */}
=======
            {/* Right Side: Form */}
            <div className="w-full lg:w-7/12 xl:w-1/2 flex items-center justify-center p-6 sm:p-12 h-screen overflow-y-auto">
                <div className="w-full max-w-md z-10 pb-8">
                    {/* Mobile Logo */}
>>>>>>> eb5776036fcf638add3e6b393a414f6cc5477775
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center">
                                <DollarSign size={18} className="text-white stroke-[2.5]" />
                            </div>
                            <span className="text-xl font-black text-[#111827]">Reimburse<span className="text-[#4F46E5]">It</span></span>
                        </div>
                    </div>

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
