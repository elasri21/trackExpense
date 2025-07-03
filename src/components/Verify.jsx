import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


const Verify = () => {
  const [status, setStatus] = useState('Verifying...');
  const hasRun = useRef(false);
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false)

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    const verifyEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      console.log('Token from URL:', token);

      if (!token) {
        setStatus('Verification token not found in URL.');
        return;
      }

      try {
        // const res = await fetch('http://localhost:5000/api/verify', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ token }),
        // });

        const res = await fetch(`http://localhost:5000/api/verify?token=${token}`);

        const data = await res.json();

        if (res.ok) {
          setStatus('✅ Email verified successfully! You can now log in.');
        } else {
          setStatus(`❌ Verification failed: ${data.error}`);
        }
      } catch (err) {
        console.error(err);
        setStatus('❌ An error occurred during verification.');
      }
    };

    verifyEmail();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-xl font-semibold mb-4">Email Verification</h1>
      <p>{status}</p>
      {status[0] === "✅" && 
        <button onClick={() => {
          setLogged(false);
          navigate('/login');
        }}
        className="w-fit bg-blue-500 mt-6 pl-6 pr-6 text-white py-2 rounded hover:bg-blue-600"
        >Login</button>
      }
    </div>
  );
};

export default Verify;
