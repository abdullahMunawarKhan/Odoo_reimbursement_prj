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
            <header className="text-center">
                <h1 className="text-6xl font-black text-white mb-6 uppercase tracking-tighter decoration-emerald-500/20 underline decoration-[12px] underline-offset-8">Submit Expense</h1>
                <p className="text-slate-500 text-xl font-medium tracking-tight">Convert your receipts into reimbursements instantly</p>
            </header>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Receipt Upload Section */}
                <div className="space-y-6">
                    <label className="block text-2xl font-black mb-4 text-emerald-400 flex items-center gap-3">
                        <Upload size={24} /> Step 1: Upload
                    </label>
                    <div className="relative group cursor-pointer border-4 border-dashed border-slate-800 bg-slate-900/50 rounded-[3rem] p-12 flex flex-col items-center justify-center hover:bg-slate-900 hover:border-emerald-500/30 transition-all duration-700 overflow-hidden shadow-2xl">
                        <div className="p-6 bg-slate-950 rounded-[2rem] border border-white/5 mb-6 group-hover:scale-110 group-hover:rotate-[360deg] transition duration-1000">
                            <Upload className="text-emerald-500" size={48} />
                        </div>
                        <p className="text-white font-black text-xl mb-1 tracking-tight">Tap to upload receipt</p>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">PNG, JPG or PDF • 5MB Limit</p>
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
                        <div className="p-10 bg-slate-900/50 border border-white/5 rounded-[2.5rem] animate-in slide-in-from-left duration-1000 shadow-3xl">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-6">AI Receipt Parser (BETA)</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-slate-950 p-6 rounded-2xl border border-white/5">
                                    <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Merchant</span>
                                    <span className="text-white font-black text-lg">Starbucks London</span>
                                </div>
                                <div className="flex justify-between items-center bg-slate-950 p-6 rounded-2xl border border-white/5">
                                    <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Total Found</span>
                                    <span className="text-amber-500 font-black text-2xl tracking-tighter">$14.25</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Form Details Section */}
                <div className="space-y-8">
                    <label className="block text-2xl font-black mb-4 text-blue-400 flex items-center gap-3">
                        <FileText size={24} /> Step 2: Information
                    </label>

                    <div className="space-y-8 bg-slate-900/50 p-10 rounded-[3rem] border border-white/5 backdrop-blur-3xl shadow-3xl">
                        <div>
                            <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] block mb-4 px-1">Expense Category</label>
                            <div className="relative group">
                                <select
                                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-[1.5rem] p-5 focus:ring-4 focus:ring-blue-500/20 outline-none transition duration-500 font-black appearance-none"
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
                                />
                            </div>
                            <div>
                                <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] block mb-4 px-1">Currency</label>
                                <div className="relative group">
                                    <select
                                        className="w-full bg-slate-950 border border-slate-800 text-white rounded-[1.5rem] p-5 focus:ring-4 focus:ring-blue-500/20 outline-none transition duration-500 font-black appearance-none"
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
                                className="w-full bg-slate-950 border border-slate-800 text-white rounded-[1.5rem] p-6 min-h-[160px] focus:ring-4 focus:ring-blue-500/20 outline-none transition duration-500 resize-none font-medium"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                             ></textarea>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full py-6 text-2xl font-black uppercase tracking-tighter"
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
