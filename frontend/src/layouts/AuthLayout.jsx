import React from 'react';
import { Outlet } from 'react-router-dom';
import { ShieldCheck, BarChart3, Clock, DollarSign } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, description }) => (
    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition duration-300">
        <div className="bg-emerald-500/20 p-3 rounded-xl border border-emerald-500/30 text-emerald-400">
            <Icon size={24} />
        </div>
        <div>
            <h3 className="text-white font-bold text-lg">{title}</h3>
            <p className="text-slate-400 text-sm">{description}</p>
        </div>
    </div>
);

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-slate-950">
            {/* Left Side: Dynamic Branding Presentation */}
            <div className="hidden lg:flex lg:w-5/12 xl:w-1/2 relative overflow-hidden bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 p-12 lg:p-16 flex-col justify-between border-r border-slate-800">
                {/* Visual Background Elements */}
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none"></div>

                {/* Top: Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="bg-gradient-to-br from-emerald-400 to-blue-500 text-slate-950 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
                        <DollarSign size={28} className="stroke-[2.5]" />
                    </div>
                    <span className="text-3xl font-black bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        ReimburseIt
                    </span>
                </div>

                {/* Middle: Value Proposition */}
                <div className="relative z-10 max-w-lg mt-12">
                    <h1 className="text-5xl xl:text-6xl font-extrabold text-white leading-tight mb-6">
                        Enterprise expenses, <br/>
                        <span className="text-emerald-400 italic font-medium">effortlessly resolved.</span>
                    </h1>
                    <p className="text-lg text-slate-400 mb-12">
                        The fully automated, multi-tiered approval engine built for scaling companies. Stop tracking receipts, start making decisions.
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 gap-4">
                        <FeatureItem 
                            icon={ShieldCheck} 
                            title="Multi-Level Security" 
                            description="Strict role-based access control and encrypted sessions." 
                        />
                        <FeatureItem 
                            icon={Clock} 
                            title="Real-Time Processing" 
                            description="AI-simulated OCR extraction for lightning fast submissions." 
                        />
                        <FeatureItem 
                            icon={BarChart3} 
                            title="Advanced Analytics" 
                            description="Global converted views and manager-level auditing." 
                        />
                    </div>
                </div>

                {/* Bottom: Testimonial/Trust Marker */}
                <div className="relative z-10 mt-12 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl flex items-center gap-4">
                    <div className="flex -space-x-4">
                        <img className="w-12 h-12 rounded-full border-2 border-slate-900 shadow-xl" src="https://i.pravatar.cc/100?img=3" alt="Avatar 1" />
                        <img className="w-12 h-12 rounded-full border-2 border-slate-900 shadow-xl" src="https://i.pravatar.cc/100?img=1" alt="Avatar 2" />
                        <img className="w-12 h-12 rounded-full border-2 border-slate-900 shadow-xl" src="https://i.pravatar.cc/100?img=5" alt="Avatar 3" />
                    </div>
                    <div>
                        <div className="flex items-center gap-1 text-emerald-400 mb-1">
                            {/* 5 Stars */}
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-white font-bold text-sm">Trusted by 10,000+ teams</p>
                    </div>
                </div>
            </div>

            {/* Right Side: Form Content Area */}
            <div className="w-full lg:w-7/12 xl:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden h-screen overflow-y-auto">
                {/* Mobile Background Elements (hidden on large screens to avoid clashing) */}
                <div className="absolute top-20 right-[-20%] w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] lg:hidden"></div>
                <div className="absolute bottom-[-10%] left-[-20%] w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] lg:hidden"></div>
                
                <div className="w-full max-w-md z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
                    {/* Mobile Logo Only */}
                    <div className="lg:hidden flex justify-center mb-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-emerald-400 to-blue-500 text-slate-950 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
                                <DollarSign size={24} className="stroke-[2.5]" />
                            </div>
                            <span className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                                ReimburseIt
                            </span>
                        </div>
                    </div>
                    
                    <Outlet />
                    
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
