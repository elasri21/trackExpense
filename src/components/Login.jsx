import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      alert("email is not valid!");
      return;
    }
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        alert(data.error || 'Invalid credentials');
        navigate('/signup');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" name="email"
          placeholder='email' value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input type={show ? "text" : "password"} name="password"
          placeholder='password' value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <label>
          <input type="checkbox" 
            checked={show}
            onChange={() => setShow(!show)}
            className='mr-3'
          />
          {show ? 'hide' : 'show'}
        </label>
        <button type="submit" className="w-full bg-blue-500 mt-3 text-white py-2 rounded hover:bg-blue-600">Sign up</button>
      </form>
    </div>
  );
}

export default Login;