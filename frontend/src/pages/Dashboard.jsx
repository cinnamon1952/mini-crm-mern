import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TrendingUp, Users, DollarSign, BarChart3 } from 'lucide-react';
import { fetchCustomers } from '../store/slices/customersSlice.js';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items } = useSelector((s) => s.customers);
  useEffect(() => { dispatch(fetchCustomers({ page: 1, limit: 100 })); }, [dispatch]);

  const data = useMemo(() => {
    // Fake lead status distribution by counting customers (placeholder, real chart on detail page)
    const total = items.length || 1;
    return [
      { name: 'New', value: Math.round(total * 0.4) },
      { name: 'Contacted', value: Math.round(total * 0.3) },
      { name: 'Converted', value: Math.round(total * 0.2) },
      { name: 'Lost', value: Math.round(total * 0.1) },
    ];
  }, [items]);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f7f'];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Dashboard</h1>
          <p className="text-gray-600">Welcome to your CRM overview</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-700">Total Customers</p>
              <p className="text-2xl font-bold text-blue-900">{items.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-600 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-700">Active Leads</p>
              <p className="text-2xl font-bold text-green-900">{data.reduce((sum, item) => sum + item.value, 0)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-600 rounded-xl">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-700">Revenue</p>
              <p className="text-2xl font-bold text-purple-900">$24,500</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Lead Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={data} outerRadius={80} label>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Lead Performance</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}


