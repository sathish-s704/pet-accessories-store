import { Routes, Route, Navigate } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminUsers from './pages/AdminUsers';
import AdminOrders from './pages/AdminOrders';
import AdminIncome from './pages/AdminIncome';
import './App.css';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();
  return (
    <>
      <NavigationBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" replace />} />
          <Route path="/admin/products" element={user?.role === 'admin' ? <AdminProducts /> : <Navigate to="/" replace />} />
          <Route path="/admin/users" element={user?.role === 'admin' ? <AdminUsers /> : <Navigate to="/" replace />} />
          <Route path="/admin/orders" element={user?.role === 'admin' ? <AdminOrders /> : <Navigate to="/" replace />} />
          <Route path="/admin/income" element={user?.role === 'admin' ? <AdminIncome /> : <Navigate to="/" replace />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
