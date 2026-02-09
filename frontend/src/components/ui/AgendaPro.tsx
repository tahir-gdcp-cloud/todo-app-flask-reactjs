import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { Calendar, Clock, CheckCircle, XCircle, CalendarPlus } from 'lucide-react';

export const AgendaPro = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ client_name: '', appointment_time: '' });

  const fetchSchedule = async () => {
    const res = await axios.get("http://127.0.0.1:5000/api/v1/appointments");
    setAppointments(res.data);
  };

  useEffect(() => { fetchSchedule(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/api/v1/appointments", form);
      toast.success("Appointment Scheduled");
      setForm({ client_name: '', appointment_time: '' });
      fetchSchedule();
    } catch (err) { toast.error("Schedule conflict or error"); }
  };

  const updateStatus = async (id: number, status: string) => {
    await axios.patch(`http://127.0.0.1:5000/api/v1/appointments/${id}/status`, { status });
    fetchSchedule();
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-slate-50 min-h-screen">
      <Toaster richColors />
      
      {/* Professional Dashboard Header */}
      <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Calendar className="text-blue-600" /> AgendaPro
          </h1>
          <p className="text-slate-500">Professional Appointment Management</p>
        </div>
        <div className="flex gap-2">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-bold text-sm">
                {appointments.length} Total
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: New Appointment */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 h-fit">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <CalendarPlus size={20} className="text-blue-500"/> Book Client
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <input 
              type="text" placeholder="Client Name" required
              className="w-full p-3 bg-slate-50 rounded-xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setForm({...form, client_name: e.target.value})}
              value={form.client_name}
            />
            <input 
              type="datetime-local" required
              className="w-full p-3 bg-slate-50 rounded-xl border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setForm({...form, appointment_time: e.target.value})}
              value={form.appointment_time}
            />
            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all">
              Confirm Booking
            </button>
          </form>
        </div>

        {/* Main: Timeline */}
        <div className="lg:col-span-2 space-y-4">
          {appointments.map((appt: any) => (
            <div key={appt.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 flex items-center justify-between group">
              <div className="flex items-center gap-6">
                <div className="bg-slate-100 p-4 rounded-2xl text-slate-600">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{appt.client_name}</h3>
                  <p className="text-slate-500 text-sm">
                    {new Date(appt.appointment_time).toLocaleString([], { 
                      weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter 
                  ${appt.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                    appt.status === 'Canceled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                  {appt.status}
                </span>
                
                {appt.status === 'Scheduled' && (
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => updateStatus(appt.id, 'Completed')} className="p-2 hover:bg-green-50 text-green-600 rounded-lg">
                      <CheckCircle size={20} />
                    </button>
                    <button onClick={() => updateStatus(appt.id, 'Canceled')} className="p-2 hover:bg-red-50 text-red-600 rounded-lg">
                      <XCircle size={20} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};