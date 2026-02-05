import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import { Package, Plus, Minus, AlertTriangle, ListPlus } from 'lucide-react';

export const StockMaster = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', quantity: 0, price: 0 });

  const fetchProducts = async () => {
    const res = await axios.get("http://127.0.0.1:5000/api/v1/products");
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const adjustStock = async (id: number, amount: number) => {
    try {
      await axios.patch(`http://127.0.0.1:5000/api/v1/products/${id}/stock`, { quantity: amount });
      fetchProducts();
    } catch (err) {
      toast.error("Stock update failed");
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await axios.post("http://127.0.0.1:5000/api/v1/products", formData);
    toast.success("Product added!");
    
    // THIS LINE IS CRITICAL:
    fetchProducts(); 
    
    setFormData({ name: '', quantity: 0, price: 0 });
  } catch (err) {
    toast.error("Failed to add product");
  }
};

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white min-h-screen">
      <Toaster richColors />
      
      {/* Header & Stats */}
      <div className="flex justify-between items-end mb-8 border-b pb-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3">
            <Package className="text-indigo-600" size={40} /> StockMaster Pro
          </h1>
          <p className="text-slate-500 mt-2">Enterprise Resource Planning & Inventory</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border text-center min-w-[120px]">
            <div className="text-2xl font-bold">{products.length}</div>
            <div className="text-xs uppercase text-slate-400 font-bold">Items</div>
          </div>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 text-center min-w-[120px]">
            <div className="text-2xl font-bold text-amber-600">
              {products.filter((p: any) => p.quantity < 10).length}
            </div>
            <div className="text-xs uppercase text-amber-500 font-bold">Low Stock</div>
          </div>
        </div>
      </div>

      {/* Quick Add Form */}
      <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
        <input 
          type="text" placeholder="Product Name" value={formData.name} required
          className="p-3 rounded-xl border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="number" placeholder="Qty" value={formData.quantity} required
          className="p-3 rounded-xl border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value)})}
        />
        <input 
          type="number" step="0.01" placeholder="Price ($)" value={formData.price} required
          className="p-3 rounded-xl border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
        />
        <button className="bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
          <ListPlus size={20} /> Add to Stock
        </button>
      </form>

      {/* Professional Data Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-600 text-sm">PRODUCT</th>
              <th className="p-4 font-bold text-slate-600 text-sm">PRICE</th>
              <th className="p-4 font-bold text-slate-600 text-sm">STOCK LEVEL</th>
              <th className="p-4 font-bold text-slate-600 text-sm text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product: any) => (
              <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-semibold text-slate-800">{product.name}</td>
                <td className="p-4 text-slate-600">${product.price.toFixed(2)}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${product.quantity < 10 ? 'text-amber-500' : 'text-slate-700'}`}>
                      {product.quantity} units
                    </span>
                    {product.quantity < 10 && (
                      <span className="flex items-center gap-1 text-[10px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase">
                        <AlertTriangle size={10} /> Low
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => adjustStock(product.id, -1)}
                      className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-colors border"
                    >
                      <Minus size={16} />
                    </button>
                    <button 
                      onClick={() => adjustStock(product.id, 1)}
                      className="p-2 hover:bg-green-50 text-slate-400 hover:text-green-500 rounded-lg transition-colors border"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};