import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../store/slices/customersSlice.js';
import { Link } from 'react-router-dom';

export default function Customers() {
  const dispatch = useDispatch();
  const { items, page, pages, loading } = useSelector((s) => s.customers);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });

  useEffect(() => { dispatch(fetchCustomers({ page: 1, search })); }, [dispatch, search]);

  const submitNew = async (e) => {
    e.preventDefault();
    const res = await dispatch(createCustomer(form));
    if (res.meta.requestStatus === 'fulfilled') setForm({ name: '', email: '', phone: '', company: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Customers</h2>
        <input className="w-64 border border-gray-300 rounded-md px-3 py-2" placeholder="Search name/email" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div>
        {loading ? (
          <div className="text-gray-500">Loading...</div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Phone</th>
                  <th className="text-left p-3">Company</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((c) => (
                  <tr key={c._id} className="border-t border-gray-100">
                    <td className="p-3"><Link className="text-indigo-600" to={`/customers/${c._id}`}>{c.name}</Link></td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3">{c.phone}</td>
                    <td className="p-3">{c.company}</td>
                    <td className="p-3">
                      <button className="text-red-600 hover:underline" onClick={() => dispatch(deleteCustomer(c._id))}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium mb-3">Add Customer</h3>
        <form onSubmit={submitNew} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input className="border border-gray-300 rounded-md px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="border border-gray-300 rounded-md px-3 py-2" placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="border border-gray-300 rounded-md px-3 py-2" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className="border border-gray-300 rounded-md px-3 py-2" placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          <div className="sm:col-span-2">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-4 py-2" type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}


