import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { Users, UserPlus, Mail, Filter, MoreVertical, ShieldCheck } from 'lucide-react';

export const NexusCRM = () => {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', source: 'LinkedIn' });

  const fetchLeads = async () => {
    const res = await axios.get("http://127.0.0.1:5000/api/v1/leads");
    setLeads(res.data);
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/api/v1/leads", form);
      toast.success("Lead added to pipeline");
      setForm({ name: '', email: '', source: 'LinkedIn' });
      fetchLeads();
    } catch (err) { toast.error("Error adding lead"); }
  };

  const updateStatus = async (id: number, status: string) => {
    await axios.patch(`http://127.0.0.1:5000/api/v1/leads/${id}/status`, { status });
    fetchLeads();
  };

  // Function to get initials for the avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-[#F8FAFC] min-h-screen font-sans">
      <Toaster richColors />
      
      {/* Top Navbar */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2 italic">
            <ShieldCheck className="text-indigo-600" /> NEXUS<span className="text-indigo-600">CRM</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">Sales Pipeline & Relationship Manager</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border shadow-sm">
          <button className="p-2 hover:bg-slate-50 rounded-xl text-slate-400"><Filter size={20} /></button>
          <div className="h-6 w-[1px] bg-slate-200"></div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all">
            Export Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Lead Entry Form */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <UserPlus size={22} className="text-indigo-500" /> New Lead
          </h2>
          <form onSubmit={handleAddLead} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Full Name</label>
              <input 
                type="text" required value={form.name}
                className="w-full mt-1 p-3.5 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                onChange={(e) => setForm({...form, name: e.target.value})}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Email Address</label>
              <input 
                type="email" required value={form.email}
                className="w-full mt-1 p-3.5 bg-slate-50 rounded-2xl border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>
            <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all active:scale-95">
              Create Contact
            </button>
          </form>
        </div>

        {/* Pipeline List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between px-4 mb-2">
            <h2 className="text-slate-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <Users size={14} /> Active Pipeline ({leads.length})
            </h2>
          </div>
          
          {leads.map((lead: any) => (
            <div key={lead.id} className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center justify-between group hover:shadow-md transition-all">
              <div className="flex items-center gap-5">
                {/* Dynamic Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-lg border border-indigo-100">
                  {getInitials(lead.name)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 leading-tight">{lead.name}</h3>
                  <p className="text-slate-400 text-sm flex items-center gap-1">
                    <Mail size={12} /> {lead.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className={`px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider
                    ${lead.status === 'New' ? 'bg-blue-50 text-blue-600' : 
                      lead.status === 'Closed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {lead.status}
                  </span>
                  <p className="text-[10px] font-bold text-slate-300 mt-1 uppercase tracking-widest">{lead.source}</p>
                </div>
                
                <select 
                  className="bg-slate-50 border-none text-xs font-bold rounded-lg p-1.5 outline-none opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  value={lead.status}
                  onChange={(e) => updateStatus(lead.id, e.target.value)}
                >
                  <option value="New">Mark as New</option>
                  <option value="Discovery">Discovery</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Closed">Won / Closed</option>
                </select>
                <MoreVertical className="text-slate-300 cursor-pointer" size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};