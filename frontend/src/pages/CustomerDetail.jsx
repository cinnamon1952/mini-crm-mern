import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeads, createLead, updateLead, deleteLead } from '../store/slices/leadsSlice.js';

export default function CustomerDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const leads = useSelector((s) => s.leads.byCustomerId[id] || []);
  const [customer, setCustomer] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [form, setForm] = useState({ title: '', description: '', status: 'New', value: 0 });

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/customers/${id}`);
      setCustomer(data);
    })();
  }, [id]);

  useEffect(() => {
    dispatch(fetchLeads({ customerId: id, status: statusFilter || undefined }));
  }, [dispatch, id, statusFilter]);

  const submitLead = async (e) => {
    e.preventDefault();
    const res = await dispatch(createLead({ customerId: id, payload: { ...form, value: Number(form.value) } }));
    if (res.meta.requestStatus === 'fulfilled') setForm({ title: '', description: '', status: 'New', value: 0 });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold">Customer Detail</h2>
        {customer ? (
          <div className="text-gray-600 mt-2">
            <div className="font-medium text-gray-900">{customer.name}</div>
            <div>{customer.email} · {customer.phone} · {customer.company}</div>
          </div>
        ) : <div className="text-gray-500">Loading customer...</div>}
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm text-gray-600">Filter by status</label>
        <select className="border border-gray-300 rounded-md px-2 py-1" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All</option>
          {['New', 'Contacted', 'Converted', 'Lost'].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left p-3">Title</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Value</th>
              <th className="text-left p-3">Created</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l._id} className="border-t border-gray-100">
                <td className="p-3">{l.title}</td>
                <td className="p-3">{l.status}</td>
                <td className="p-3">${l.value}</td>
                <td className="p-3">{new Date(l.createdAt).toLocaleString()}</td>
                <td className="p-3">
                  <button className="text-red-600 hover:underline" onClick={() => dispatch(deleteLead({ customerId: id, leadId: l._id }))}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium mb-3">Add Lead</h3>
        <form onSubmit={submitLead} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="border border-gray-300 rounded-md px-3 py-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="border border-gray-300 rounded-md px-3 py-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <select className="border border-gray-300 rounded-md px-3 py-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            {['New', 'Contacted', 'Converted', 'Lost'].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <input className="border border-gray-300 rounded-md px-3 py-2" placeholder="Value" type="number" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} />
          <div className="sm:col-span-2">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-2" type="submit">Create Lead</button>
          </div>
        </form>
      </div>
    </div>
  );
}


