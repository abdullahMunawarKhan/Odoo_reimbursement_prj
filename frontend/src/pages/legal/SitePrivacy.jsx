import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Eye, Database, Lock, Bell, UserCheck, Mail } from 'lucide-react';

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

const SitePrivacy = () => {
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
                <div className="bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] rounded-2xl p-10 mb-10 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-16 -translate-y-16 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-x-12 translate-y-12 pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-white/15 backdrop-blur-sm rounded-xl border border-white/20">
                                <Shield size={24} />
                            </div>
                            <span className="text-indigo-200 font-semibold text-sm uppercase tracking-widest">Legal Document</span>
                        </div>
                        <h1 className="text-4xl font-black mb-3 leading-tight">Privacy Policy</h1>
                        <p className="text-indigo-200 text-base max-w-xl leading-relaxed">
                            Your privacy is our priority. This document explains how ReimburseIt collects, uses, and safeguards your information.
                        </p>
                        <div className="mt-6 flex items-center gap-4 text-sm text-indigo-200">
                            <span>Last updated: October 2023</span>
                            <span className="w-1 h-1 rounded-full bg-indigo-300"></span>
                            <span>Version 2.1</span>
                        </div>
                    </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-8 md:p-10 space-y-2">

                    <Section icon={Eye} title="1. Information We Collect">
                        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p>
                        <ul className="mt-3 space-y-1.5">
                            {['Full name and email address', 'Company or organization details', 'Expense and receipt data submitted through the platform', 'Usage data and browser metadata for security purposes'].map(item => (
                                <li key={item} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] flex-shrink-0"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section icon={Database} title="2. How We Use Your Information">
                        <p>We use the information we collect in various ways, including to provide, operate, and maintain our platform, and to improve user experience.</p>
                        <ul className="mt-3 space-y-1.5">
                            {['Process employee reimbursement workflows', 'Perform AI-assisted OCR parsing on uploaded receipts', 'Send notifications regarding approval status', 'Generate anonymized analytics for administrators'].map(item => (
                                <li key={item} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] flex-shrink-0"></div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section icon={Lock} title="3. Data Security">
                        <p>We protect the data we store within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
                        <p>All data is encrypted in transit using TLS 1.3, and sensitive fields are encrypted at rest using AES-256.</p>
                    </Section>

                    <Section icon={Bell} title="4. Third-Party Disclosure">
                        <p>We don't sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, as long as those parties agree to keep this information confidential.</p>
                    </Section>

                    <Section icon={UserCheck} title="5. Your Rights">
                        <p>You have the right to access, update, or delete all information we hold about you. You may also withdraw consent for data processing at any time by contacting our support team.</p>
                    </Section>

                    <section>
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-100 flex-shrink-0 mt-0.5">
                                <Mail size={18} className="text-[#4F46E5]" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-[#111827] mb-2">6. Contact Us</h2>
                                <p className="text-[#6B7280] text-sm">If you have any questions about this Privacy Policy, please contact us at{' '}
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
                        <Link to="/terms" className="hover:text-[#4F46E5] transition-colors">Terms of Service</Link>
                        <Link to="/auth/signup" className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                            Back to Sign Up →
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SitePrivacy;
