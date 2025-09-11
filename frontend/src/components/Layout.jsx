import { Link, NavLink, Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { Home, Users, LogOut } from 'lucide-react'
import { logout } from '../store/slices/authSlice.js'

export default function Layout() {
  const { user } = useSelector((s) => s.auth)
  const dispatch = useDispatch()

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900">
      <aside className="hidden md:flex md:flex-col w-64 fixed inset-y-0 left-0 border-r border-gray-200 bg-white">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link to="/" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MiniCRM</Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLink to="/" end className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md ${isActive ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}>
            <Home size={18} /> Dashboard
          </NavLink>
          <NavLink to="/customers" className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-md ${isActive ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-gray-50 text-gray-700'}`}>
            <Users size={18} /> Customers
          </NavLink>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center justify-between px-3 py-2 rounded-md bg-gray-50">
            <span className="text-sm text-gray-700">{user?.name}</span>
            <button onClick={() => dispatch(logout())} className="text-red-600 hover:text-red-700 flex items-center gap-1 text-sm">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="h-16 border-b border-gray-200 bg-white/80 backdrop-blur px-4 md:px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="md:hidden font-semibold text-indigo-600">MiniCRM</div>
          <div className="text-sm text-gray-600 hidden md:block">Welcome back, {user?.name}</div>
        </header>
        <motion.main initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="p-4 md:p-6">
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}
