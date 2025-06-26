import { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';


function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const { token, logout } = useAuth();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!token) {
      // No token, redirect to login/signup app
      logout();
      window.location.href = 'http://localhost:5173/login';
      return;
    }

    // Fetch expenses
    const fetchExpenses = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/expenses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setExpenses(data);
        } else {
          alert(data.error || 'Failed to fetch expenses');
        }
      } catch (err) {
        console.error('Error fetching expenses:', err);
      }
    };

    fetchExpenses();
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, amount }),
      });
      const data = await res.json();
      if (res.ok) {
        setExpenses((prev) => [...prev, data]);
        setTitle('');
        setAmount('');
      } else {
        alert(data.error || 'Failed to add expense');
      }
    } catch (err) {
      console.error("Add expense error:", err);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Not authenticated");
      return;
    }
    const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
    if (!confirmDelete) {
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/expenses/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await res.json();
    if (!res.ok) {
      alert(data.error || 'Failed to delete');
    } else {
      // Remove the deleted item from local state
      setExpenses(prev => prev.filter(exp => exp.id !== id));
    }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };


  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Your Expenses</h1>
      <div className='container flex'>
        <form onSubmit={handleAddExpense} className="bg-white p-6 rounded shadow-md w-full w-1/2 bg-blue-100 p-4">
          <h3 className="text-xl font-bold p-6 mb-3">Add new expense</h3>
          <input
            type="text" placeholder="title"
            className="w-full mb-3 px-3 py-2 border rounded"
            value={title} required
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number" placeholder="Amount"
            className="w-full mb-3 px-3 py-2 border rounded"
            value={amount} required
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >Add expense</button>
        </form>
        <div className='w-full w-1/2 bg-blue-100 p-4'>
          <h2 className="text-xl font-bold mb-4">Welcome To Expense Tracker</h2>
          <h3 className='text-xl font-bold pt-4 pb-4 mb-3'>Name: {JSON.parse(localStorage.getItem('currentUser')).name}</h3>
          {expenses.length ?
          <ul className="bg-white p-6 rounded shadow-md w-full mb-3 flex flex-col gap-y-2">
            {expenses.map(exp => (
              <li key={exp.id}
                className="flex justify-between items-center border p-2 mb-2"
              >
                <div>
                  <p>
                    <strong>{exp.title}</strong> - <span>${exp.amount}</span>
                  </p>
                  <p className="text-sm text-gray-500">{(new Date(exp.date)).toISOString().slice(0, 16).replace("T", " ")}</p>
                </div>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="bg-red-500 text-white px-4 py-2 mb-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul> : <p>No Expenses added</p>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
