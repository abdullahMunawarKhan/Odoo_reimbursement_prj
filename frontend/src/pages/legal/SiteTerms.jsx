import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, AlertCircle, ShieldCheck, Users, Ban, RefreshCw, Mail } from 'lucide-react';

const Section = ({ icon: Icon, title, children }) => (
    <section className="group">
        <div className="flex items-start gap-4 mb-4">
            <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100 flex-shrink-0 mt-0.5 group-hover:bg-[#4F46E5] group-hover:border-[#4F46E5] transition-colors duration-300">
                <Icon size={18} className="text-[#4F46E5] group-hover:text-white transition-colors duration-300" />
            </div>
            <div>
                <h2 className="text-lg font-bold text-[#111827] mb-2">{title}</h2>
                <div className="text-[#6B7280] leading-relaxed space-y-2 text-sm">{children}</div>
            </div>
        </div>
        <div className="border-b border-[#F3F4F6] mb-6 pb-2"></div>
    </section>
);

const SiteTerms = () => {
    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            {/* Header Bar */}
            <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-10 shadow-sm">
                <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#4F46E5] rounded-lg flex items-center justify-center shadow-sm">
                            <span className="text-white font-black text-sm">R</span>
                        </div>
                        <span className="text-lg font-black text-[#111827]">Reimburse<span className="text-[#4F46E5]">It</span></span>
                    </div>
                    <Link to="/auth/signup" className="flex items-center gap-1.5 text-sm font-semibold text-[#6B7280] hover:text-[#4F46E5] transition-colors">
                        <ArrowLeft size={15} /> Back to Sign Up
                    </Link>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="bg-gradient-to-br from-[#111827] to-[#1F2937] rounded-2xl p-10 mb-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-16 -translate-y-16 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#4F46E5]/10 rounded-full -translate-x-12 translate-y-12 pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/15">
                                <FileText size={24} />
                            </div>
                            <span className="text-gray-400 font-semibold text-sm uppercase tracking-widest">Legal Document</span>
                        </div>
                        <h1 className="text-4xl font-black mb-3 leading-tight">Terms of Service</h1>
                        <p className="text-gray-400 text-base max-w-xl leading-relaxed">
                            Please read these terms carefully before using ReimburseIt. By accessing our service, you agree to be bound by the following.
                        </p>
                        <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
                            <span>Last updated: October 2023</span>
                            <span className="w-1 h-1 rounded-full bg-gray-500"></span>
                            <span>Version 2.1</span>
                        </div>
                    </div>
                </div>

                {/* Quick Summary Banner */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 flex items-start gap-3">
                    <AlertCircle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm font-bold text-amber-800 mb-1">Summary (not a substitute for the full terms)</p>
                        <p className="text-sm text-amber-700">By using ReimburseIt you agree to use the platform for lawful business expense management only, not to misuse the system, and that we may discontinue access if terms are violated.</p>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8 md:p-10 space-y-2">

                    <Section icon={FileText} title="1. Agreement to Terms">
                        <p>By accessing or using ReimburseIt, you confirm that you are at least 18 years old, that you have read and understood these Terms, and that you agree to be bound by them.</p>
                        <p>If you are using this service on behalf of an organization, you represent that you have authority to bind that organization to these terms.</p>
                    </Section>

                    <Section icon={ShieldCheck} title="2. Use License">
                        <p>Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to use the ReimburseIt platform for your internal business expense management.</p>
                        <ul className="mt-3 space-y-1.5">
                            {['Submit and track reimbursement requests', 'Review and approve expense claims (if authorized)', 'Generate and export financial reports', 'Manage organizational users (if an administrator)'].map(item => (
                                <li key={item} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] flex-shrink-0"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section icon={Ban} title="3. Prohibited Activities">
                        <p>You may not use our service for any of the following:</p>
                        <ul className="mt-3 space-y-1.5">
                            {['Submitting fraudulent or falsified expense claims', 'Attempting to bypass approval workflows', 'Unauthorized access to other user accounts or data', 'Uploading malicious files or scripts', 'Reverse engineering or disassembling the platform'].map(item => (
                                <li key={item} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section icon={AlertCircle} title="4. Disclaimer of Warranties">
                        <p>The service is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
                        <p>ReimburseIt does not warrant that the service will be uninterrupted, error-free, or completely secure.</p>
                    </Section>

                    <Section icon={Users} title="5. Limitation of Liability">
                        <p>To the maximum extent permitted by applicable law, ReimburseIt shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, goodwill, or other intangible losses.</p>
                    </Section>

                    <Section icon={RefreshCw} title="6. Changes to Terms">
                        <p>We reserve the right to modify these terms at any time. If we make material changes, we will notify you via email or a prominent notice on the platform. Continued use of the service after changes constitutes acceptance of the new terms.</p>
                    </Section>

                    <section>
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100 flex-shrink-0 mt-0.5">
                                <Mail size={18} className="text-[#4F46E5]" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#111827] mb-2">7. Contact Us</h2>
                                <p className="text-[#6B7280] text-sm">If you have any questions about these Terms of Service, please contact us at{' '}
                                    <span className="text-[#4F46E5] font-medium cursor-pointer hover:underline">legal@reimburseit.io</span>
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#9CA3AF]">
                    <p>© 2024 ReimburseIt. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link to="/privacy" className="hover:text-[#4F46E5] transition-colors">Privacy Policy</Link>
                        <Link to="/auth/signup" className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                            Back to Sign Up →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteTerms;
