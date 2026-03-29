import { useState } from 'react';
import { Settings, Plus, Trash2, ArrowRight, Save, CheckCircle, AlertCircle } from 'lucide-react';

const Toggle = ({ enabled, onChange }) => (
    <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none ${
            enabled ? 'bg-[#4F46E5]' : 'bg-[#E5E7EB]'
        }`}
    >
        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300 ${
            enabled ? 'left-5' : 'left-0.5'
        }`}></div>
    </button>
);

const AdminRules = () => {
    const [rules, setRules] = useState([
        {
            id: 1,
            name: 'Miscellaneous Expenses Approval',
            description: "Standard approval workflow for general business expenses that don't fall under travel or client entertainment categories.",
            manager: 'Sarah Jenkins (Operations)',
            minApprovalPct: 60,
            approvers: [
                { id: 1, name: 'John D. Smith', title: 'Financial Analyst', required: true, avatar: 'https://i.pravatar.cc/100?img=12' },
                { id: 2, name: 'Mitchell Vane', title: 'Dept. Manager', required: true, avatar: 'https://i.pravatar.cc/100?img=15' },
                { id: 3, name: 'Andreas Muller', title: 'Senior Controller', required: false, avatar: 'https://i.pravatar.cc/100?img=8' },
            ],
            sequentialApproval: true,
            isManagerApprover: true,
            allowProxyApproval: false,
            autoRejectOverLimit: false,
        }
    ]);

    const [activeRule] = useState(rules[0]);
    const [localRule, setLocalRule] = useState(activeRule);

    const toggleApproverRequired = (approverId) => {
        setLocalRule(prev => ({
            ...prev,
            approvers: prev.approvers.map(a => a.id === approverId ? { ...a, required: !a.required } : a)
        }));
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <nav className="flex items-center gap-1 text-sm text-[#6B7280] mb-2">
                        <span className="hover:text-[#111827] cursor-pointer transition-colors">Settings</span>
                        <span className="text-[#D1D5DB] mx-1">›</span>
                        <span className="text-[#4F46E5] font-semibold">Approval Rules</span>
                    </nav>
                    <h1 className="text-3xl font-black text-[#111827] tracking-tight">Approval Rules Configuration</h1>
                    <p className="text-[#6B7280] mt-1">Define the workflow logic and mandatory approvers for organizational expenses.</p>
                </div>
                <button className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 shadow-sm whitespace-nowrap">
                    <Plus size={16} />
                    New Rule
                </button>
            </div>

            {/* Main 2-col Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Left: Rule Information */}
                <div className="space-y-6">
                    {/* Rule Info Card */}
                    <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <Settings size={18} className="text-[#4F46E5]" />
                            </div>
                            <h2 className="text-base font-bold text-[#111827]">Rule Information</h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-1.5">Rule Name</label>
                                <input
                                    type="text"
                                    value={localRule.name}
                                    onChange={(e) => setLocalRule(p => ({ ...p, name: e.target.value }))}
                                    className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-1.5">Description</label>
                                <textarea
                                    value={localRule.description}
                                    onChange={(e) => setLocalRule(p => ({ ...p, description: e.target.value }))}
                                    rows={3}
                                    className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all resize-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-1.5">Default Manager</label>
                                <div className="relative">
                                    <select
                                        value={localRule.manager}
                                        onChange={(e) => setLocalRule(p => ({ ...p, manager: e.target.value }))}
                                        className="w-full border border-[#E5E7EB] rounded-lg px-3 py-2.5 text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all appearance-none bg-white"
                                    >
                                        <option>Sarah Jenkins (Operations)</option>
                                        <option>Michael Chen (Finance)</option>
                                        <option>Lisa Park (HR)</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] pointer-events-none">▾</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Approver Sequence Card */}
                    <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 rounded-lg">
                                    <ArrowRight size={18} className="text-[#4F46E5]" />
                                </div>
                                <h2 className="text-base font-bold text-[#111827]">Approver Sequence</h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-[#6B7280] font-medium">Sequential Approval</span>
                                <Toggle
                                    enabled={localRule.sequentialApproval}
                                    onChange={() => setLocalRule(p => ({ ...p, sequentialApproval: !p.sequentialApproval }))}
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {localRule.approvers.map((approver, index) => (
                                <div key={approver.id} className="flex items-center gap-4 p-3 border border-[#E5E7EB] rounded-lg hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
                                    <span className="text-sm font-bold text-[#9CA3AF] w-4 text-center">{index + 1}</span>
                                    <img src={approver.avatar} alt={approver.name} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-[#111827] truncate">{approver.name}</p>
                                        <p className="text-xs text-[#6B7280] truncate">{approver.title}</p>
                                    </div>
                                    <div className="flex items-center gap-3 flex-shrink-0">
                                        <div className="flex flex-col items-center gap-0.5">
                                            <span className="text-[9px] font-bold text-[#9CA3AF] uppercase tracking-wide">Required</span>
                                            <Toggle
                                                enabled={approver.required}
                                                onChange={() => toggleApproverRequired(approver.id)}
                                            />
                                        </div>
                                        <button className="text-[#D1D5DB] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100">
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="mt-4 w-full border-2 border-dashed border-[#E5E7EB] hover:border-[#4F46E5] hover:bg-indigo-50/50 text-[#9CA3AF] hover:text-[#4F46E5] py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200">
                            <Plus size={16} />
                            Add Another Approver
                        </button>
                    </div>
                </div>

                {/* Right: Global Conditions */}
                <div className="space-y-6">
                    <div className="bg-white border border-[#E5E7EB] rounded-xl shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-indigo-50 rounded-lg">
                                <CheckCircle size={18} className="text-[#4F46E5]" />
                            </div>
                            <h2 className="text-base font-bold text-[#111827]">Global Conditions</h2>
                        </div>

                        {/* Min Approval % */}
                        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-4 mb-4">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Min. Approval %</span>
                                <span className="text-[10px] font-bold text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-widest">Strict</span>
                            </div>
                            <div className="flex items-end gap-3 mt-2">
                                <span className="text-3xl font-black text-[#4F46E5]">{localRule.minApprovalPct}%</span>
                                <p className="text-xs text-[#6B7280] mb-1 leading-snug">Percentage of approvers required to authorize the expense before finalization.</p>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={localRule.minApprovalPct}
                                onChange={(e) => setLocalRule(p => ({ ...p, minApprovalPct: Number(e.target.value) }))}
                                className="w-full mt-3 accent-[#4F46E5]"
                            />
                        </div>

                        {/* Toggle Rows */}
                        <div className="space-y-4">
                            {[
                                { key: 'isManagerApprover', label: 'Is Manager an Approver' },
                                { key: 'allowProxyApproval', label: 'Allow Proxy Approval' },
                                { key: 'autoRejectOverLimit', label: 'Auto-reject Over Limit' },
                            ].map(({ key, label }) => (
                                <div key={key} className="flex items-center justify-between py-3 border-b border-[#F3F4F6] last:border-0">
                                    <span className="text-sm font-medium text-[#374151]">{label}</span>
                                    <Toggle
                                        enabled={localRule[key]}
                                        onChange={() => setLocalRule(p => ({ ...p, [key]: !p[key] }))}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pro Tip */}
                    <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex gap-4">
                        <AlertCircle size={20} className="text-[#4F46E5] flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-[#4F46E5] mb-1">Pro-Tip: Multi-Stage Audits</p>
                            <p className="text-xs text-[#6B7280] leading-relaxed">For expenses exceeding $5,000, we recommend a 3-stage sequential flow involving both a Department Manager and a Senior Finance Controller.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB]">
                <button className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-semibold transition-all">
                    <Trash2 size={15} />
                    Delete Configuration
                </button>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 text-sm font-semibold text-[#6B7280] hover:text-[#111827] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-lg transition-all">
                        Cancel
                    </button>
                    <button className="flex items-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm">
                        <Save size={15} />
                        Save Rule
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminRules;
