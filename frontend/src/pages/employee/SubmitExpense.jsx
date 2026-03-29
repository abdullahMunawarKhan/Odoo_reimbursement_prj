import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api'; // Use our axios instance
import { Upload, DollarSign, Calendar, FileText, ChevronRight, Check, Plus } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SubmitExpense = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [category, setCategory] = useState('Travel');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/expenses/submit', { amount, currency, category, description, date });
            alert('Expense submitted successfully! 🚀');
            navigate('/employee/dashboard');
        } catch (err) {
            console.error(err);
            alert("Submission error!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom duration-1000 pb-20 pt-10">
            <header className="text-center mb-10">
                <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tight">Submit Expense</h1>
                <p className="text-slate-600 text-base font-medium tracking-tight">Convert your receipts into reimbursements instantly</p>
            </header>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Receipt Upload Section */}
                <div className="space-y-6">
                    <label className="block text-xl font-black mb-4 text-emerald-600 flex items-center gap-2">
                        <Upload size={20} /> Step 1: Upload
                    </label>
                    <div className="relative group cursor-pointer border-4 border-dashed border-slate-100 bg-white rounded-[2rem] p-10 flex flex-col items-center justify-center hover:bg-slate-50 hover:border-emerald-500/30 transition-all duration-700 shadow-lg">
                        <div className="p-4 bg-slate-50 rounded-[1.2rem] border border-slate-200 mb-4 group-hover:scale-110 transition duration-700">
                            <Upload className="text-emerald-500" size={36} />
                        </div>
                        <p className="text-slate-900 font-extrabold text-lg mb-1 tracking-tight">Tap to upload receipt</p>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">PNG, JPG or PDF • 5MB Limit</p>
                        <input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        {file && (
                            <div className="mt-6 p-3 bg-emerald-500 text-white rounded-2xl flex items-center gap-2 font-black animate-in zoom-in shadow-xl shadow-emerald-500/20">
                                <Check size={16} /> {file.name}
                            </div>
                        )}
                        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition duration-700">
                             <div className="bg-emerald-500 text-white p-3 rounded-full shadow-lg"><Plus size={20} /></div>
                        </div>
                    </div>
                    {/* Simulated OCR result if file uploaded */}
                    {file && (
                        <div className="p-8 bg-white border border-slate-100 rounded-[2rem] animate-in slide-in-from-left duration-1000 shadow-md">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">AI Receipt Parser (BETA)</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <span className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">Merchant</span>
                                    <span className="text-slate-900 font-extrabold text-base">Starbucks London</span>
                                </div>
                                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <span className="text-slate-500 font-bold uppercase text-[9px] tracking-widest">Total Found</span>
                                    <span className="text-emerald-600 font-black text-xl tracking-tighter">$14.25</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Form Details Section */}
                <div className="space-y-8">
                    <label className="block text-xl font-black mb-4 text-blue-600 flex items-center gap-2">
                        <FileText size={20} /> Step 2: Information
                    </label>

                    <div className="space-y-6 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl">
                        <div>
                            <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] block mb-4 px-1">Expense Category</label>
                            <div className="relative group">
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-4 focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-500 font-bold appearance-none"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option>Travel</option>
                                    <option>Meals</option>
                                    <option>Office Supplies</option>
                                    <option>Software</option>
                                    <option>Marketing</option>
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-hover:text-blue-400 transition">
                                    <ChevronRight size={24} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-1">
                                <Input
                                    label="Amount"
                                    type="number"
                                    placeholder="00.00"
                                    icon={DollarSign}
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    min="0.01"
                                    step="0.01"
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] block mb-4 px-1">Currency</label>
                                <div className="relative group">
                                    <select
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-4 focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-500 font-bold appearance-none"
                                        value={currency}
                                        onChange={(e) => setCurrency(e.target.value)}
                                    >
                                        <option>USD</option>
                                        <option>EUR</option>
                                        <option>GBP</option>
                                        <option>PKR</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <Input
                             label="Transaction Date"
                             type="date"
                             icon={Calendar}
                             value={date}
                             onChange={(e) => setDate(e.target.value)}
                        />

                        <div className="space-y-4">
                             <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] block mb-2 px-1">Description / Proof</label>
                             <textarea
                                placeholder="What was this expense for?"
                                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-5 min-h-[120px] focus:ring-4 focus:ring-blue-500/10 outline-none transition duration-500 resize-none font-medium text-sm"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                             ></textarea>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full py-4 text-lg font-black uppercase tracking-tight shadow-xl shadow-blue-500/20"
                        disabled={loading}
                    >
                        {loading ? "Vaulting Receipts..." : (
                            <div className="flex items-center gap-4">
                                Complete Submission <ChevronRight size={28} />
                            </div>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SubmitExpense;
