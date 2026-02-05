import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Loader2, Send } from 'lucide-react'; // Modern icons

export const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      sender_name: formData.name,
      content: formData.message
    };

    try {
      // Fixed the double /api/v1 prefix in the URL
      const response = await axios.post(
        "http://127.0.0.1:5000/api/v1/messages", 
        payload
      );

      if (response.status === 201) {
        toast.success("Message sent successfully!");
        setFormData({ name: '', message: '' });
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10 bg-gray-50">
      <Toaster richColors position="top-right" />
      
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100 transition-all hover:shadow-2xl"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-sm text-gray-500">We'll get back to you as soon as possible.</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              required
              disabled={isLoading}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
            <textarea 
              placeholder="How can we help you?" 
              required
              disabled={isLoading}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full p-3 rounded-lg border border-gray-200 h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-blue-200 flex justify-center items-center gap-2 transition-all active:scale-95 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};