import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/users/register', { name, email, password });
      login(res.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex justify-center items-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-neutral-900 p-10 rounded-2xl border border-neutral-800 shadow-2xl">
        <h2 className="text-3xl font-serif text-white mb-2 text-center">Create Account</h2>
        <p className="text-neutral-400 text-center mb-8">Join ShopSync today</p>

        {error && <p className="bg-red-900/30 text-red-400 p-3 rounded mb-6 text-sm border border-red-900/50">{error}</p>}

        <label className="block text-sm font-medium text-neutral-300 mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
          className="w-full p-3 mb-6 bg-neutral-950 border border-neutral-800 text-white rounded-lg focus:outline-none focus:border-amber-500 transition placeholder-neutral-600"
        />

        <label className="block text-sm font-medium text-neutral-300 mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full p-3 mb-6 bg-neutral-950 border border-neutral-800 text-white rounded-lg focus:outline-none focus:border-amber-500 transition placeholder-neutral-600"
        />

        <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full p-3 mb-8 bg-neutral-950 border border-neutral-800 text-white rounded-lg focus:outline-none focus:border-amber-500 transition placeholder-neutral-600"
        />

        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-500 text-black font-bold py-3 rounded-lg uppercase tracking-wider transition shadow-lg shadow-amber-500/10">
          Register
        </button>

        <p className="text-center text-neutral-400 mt-6 text-sm">
          Already have an account? <Link to="/login" className="text-amber-500 hover:text-amber-400 font-semibold">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;