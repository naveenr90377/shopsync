import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import api from '../services/api';

function Profile() {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/mine');
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to load orders');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/users/profile', { name, email, password });
      setMessage('Profile updated successfully!');
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      userInfo.name = res.data.name;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      window.location.reload();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating profile');
    }
  };

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif text-white mb-10">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Update Profile Form */}
          <div className="md:col-span-1 bg-neutral-900 p-8 rounded-2xl border border-neutral-800 h-fit">
            <h2 className="text-xl font-bold mb-6 text-white">Update Profile</h2>
            {message && <div className="bg-green-900/30 text-green-400 p-3 rounded mb-6 text-sm border border-green-900/50">{message}</div>}
            
            <form onSubmit={submitHandler} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 text-white rounded-lg focus:outline-none focus:border-amber-500 transition" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-neutral-950 border border-neutral-800 text-white rounded-lg focus:outline-none focus:border-amber-500 transition" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">New Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep current" className="w-full p-3 bg-neutral-950 border border-neutral-800 text-white rounded-lg focus:outline-none focus:border-amber-500 transition placeholder-neutral-600" />
              </div>
              <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-black font-bold py-3 rounded-lg uppercase tracking-wider transition">Update</button>
            </form>
          </div>

          {/* Order History */}
          <div className="md:col-span-2 bg-neutral-900 p-8 rounded-2xl border border-neutral-800">
            <h2 className="text-xl font-bold mb-6 text-white">Order History</h2>
            {orders.length === 0 ? (
              <p className="text-neutral-500">You have no past orders.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-neutral-800 text-sm text-neutral-400 uppercase tracking-wider">
                      <th className="pb-4">Order ID</th>
                      <th className="pb-4">Date</th>
                      <th className="pb-4">Total</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm text-white">
                    {orders.map((order) => (
                      <tr key={order._id} className="border-b border-neutral-800 last:border-0">
                        <td className="py-4 font-mono text-xs text-neutral-400">{order._id.substring(0, 8)}...</td>
                        <td className="py-4 text-neutral-300">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="py-4 font-bold text-amber-500">₹{order.totalPrice}</td>
                        <td className="py-4">
                          <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs font-semibold border border-green-900/50">Paid</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;