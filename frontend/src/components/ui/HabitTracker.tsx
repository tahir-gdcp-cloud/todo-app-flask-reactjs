import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { CheckCircle2, Circle, Plus, Trophy, Activity } from 'lucide-react';

export const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchHabits = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/v1/habits");
      setHabits(response.data);
    } catch (err) {
      console.error("Failed to fetch habits");
    }
  };

  useEffect(() => { fetchHabits(); }, []);

  const addHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://127.0.0.1:5000/api/v1/habits", { name });
      toast.success("Habit added!");
      setName('');
      fetchHabits();
    } catch (err) {
      toast.error("Failed to add habit");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleHabit = async (id: number) => {
    try {
      await axios.patch(`http://127.0.0.1:5000/api/v1/habits/${id}/toggle`);
      fetchHabits(); // Refresh the UI to show the new status
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen bg-gray-50">
      <Toaster richColors />
      
      {/* Header with Progress Stats */}
      <div className="flex items-center justify-between mb-8 bg-indigo-600 p-8 rounded-3xl text-white shadow-lg">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            Habit Hero <Trophy className="text-yellow-400" />
          </h1>
          <p className="opacity-80">Stay consistent, stay heroic.</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black">{habits.filter((h: any) => h.is_completed).length} / {habits.length}</div>
          <div className="text-xs uppercase tracking-widest opacity-70">Done Today</div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={addHabit} className="flex gap-3 mb-10">
        <input 
          type="text" 
          value={name}
          placeholder="New habit (e.g., Drink Water)"
          className="flex-1 p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button 
          disabled={isLoading}
          className="bg-indigo-600 text-white px-8 rounded-2xl font-bold hover:bg-indigo-700 transition-all active:scale-95"
        >
          {isLoading ? <Activity className="animate-spin" /> : <Plus />}
        </button>
      </form>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map((habit: any) => (
          <div 
            key={habit.id} 
            onClick={() => toggleHabit(habit.id)}
            className={`flex items-center justify-between p-6 rounded-3xl cursor-pointer transition-all border-2 
              ${habit.is_completed 
                ? 'bg-green-50 border-green-200 shadow-sm' 
                : 'bg-white border-transparent shadow-sm hover:border-gray-200'}`}
          >
            <div className="flex items-center gap-4">
              <div className={habit.is_completed ? 'text-green-600' : 'text-gray-300'}>
                {habit.is_completed ? <CheckCircle2 size={32} /> : <Circle size={32} />}
              </div>
              <span className={`text-lg font-semibold ${habit.is_completed ? 'text-green-800 line-through opacity-60' : 'text-gray-700'}`}>
                {habit.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};