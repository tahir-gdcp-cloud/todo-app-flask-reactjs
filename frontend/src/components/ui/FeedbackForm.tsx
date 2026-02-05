import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast, Toaster } from 'sonner';

export const FeedbackForm = () => {
  const [formData, setFormData] = useState({ title: '', detail: '', rating: 5 });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start spinner

    try {
      const response = await axios.post("http://localhost:5000/api/v1/feedback", formData);
      
      if (response.status === 201) {
        toast.success("Feedback submitted successfully!");
        setFormData({ title: '', detail: '', rating: 5 }); // Clear form
        (e.target as HTMLFormElement).reset(); // Reset UI fields
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false); // Stop spinner regardless of success/fail
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[750px] bg-slate-50 p-6">
      <Toaster position="top-center" /> {/* This renders the toast messages */}
      
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-slate-200">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">Send Feedback</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-600 mb-1">Subject</label>
          <input 
            type="text" 
            disabled={isLoading}
            className="w-full p-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-slate-100"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-1">Details</label>
          <textarea 
            disabled={isLoading}
            className="w-full p-2 rounded-md border border-slate-300 h-24 focus:ring-2 focus:ring-indigo-500 outline-none disabled:bg-slate-100"
            onChange={(e) => setFormData({...formData, detail: e.target.value})}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex justify-center items-center gap-2 disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Sending...
            </>
          ) : (
            "Submit Feedback"
          )}
        </button>
      </form>
    </div>
  );
};