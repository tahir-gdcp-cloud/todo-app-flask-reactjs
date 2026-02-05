import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { Link2, Plus, ExternalLink, Bookmark } from 'lucide-react';


export const BookmarkManager = () => {
  const [formData, setFormData] = useState({ title: '', url: '', category: 'General' });
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState([]); // Array to store bookmarks
const fetchBookmarks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/v1/bookmarks");
      setBookmarks(response.data);
    } catch (err) {
      console.error("Failed to load bookmarks");
    }
  };

  // Run this once when the component mounts
  useEffect(() => {
    fetchBookmarks();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/v1/bookmarks", formData);
      if (response.status === 201) {
        toast.success("Bookmark saved!");
        setFormData({ title: '', url: '', category: 'General' });
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      toast.error("Failed to save bookmark.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <Toaster richColors />
      
      {/* 1. The Input Card (Top Section) */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
            <Bookmark size={24} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">New Bookmark</h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            type="text" 
            placeholder="Title (e.g. GitHub)"
            required
            className="p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <input 
            type="url" 
            placeholder="URL (https://...)"
            required
            className="p-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, url: e.target.value})}
          />
          <button 
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold py-3 px-6 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            {isLoading ? <Plus className="animate-spin" /> : <Plus size={20} />}
            Add Bookmark
          </button>
        </form>
      </div>

      {/* 2. The Bento Grid Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {bookmarks.map((item: any) => (
    <div key={item.id} className="group bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer">
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-1 rounded-md">
          {item.category || "General"}
        </span>
        <Link2 size={18} className="text-gray-400 group-hover:text-blue-500" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-1">{item.url}</p>
      <a 
        href={item.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:underline"
      >
        Visit Site <ExternalLink size={14} />
      </a>
    </div>
  ))}
</div>
    </div>
  );
};