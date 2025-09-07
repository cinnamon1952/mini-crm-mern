import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { LogOut, User, Home, Users } from 'lucide-react';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Customers from './pages/Customers.jsx';
import CustomerDetail from './pages/CustomerDetail.jsx';
import { logout } from './store/slices/authSlice.js';

function PrivateRoute({ children }) {
  const token = useSelector((s) => s.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { user } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
          <div className="mx-auto max-w-7xl px-6 h-16 flex items-center gap-8">
            <Link to="/" className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              MiniCRM
            </Link>
            {user && (
              <div className="flex items-center gap-6">
                <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Home size={18} />
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link to="/customers" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Users size={18} />
                  <span className="font-medium">Customers</span>
                </Link>
              </div>
            )}
            <div className="ml-auto flex items-center gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2 bg-white/60 rounded-full">
                    <User size={18} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                  </div>
                  <button 
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl" 
                    onClick={() => dispatch(logout())}
                  >
                    <LogOut size={16} />
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link className="px-4 py-2 text-gray-600 hover:text-blue-600 font-medium transition-colors" to="/login">
                    Login
                  </Link>
                  <Link className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium" to="/register">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-7xl px-6 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
            <Route path="/customers/:id" element={<PrivateRoute><CustomerDetail /></PrivateRoute>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
