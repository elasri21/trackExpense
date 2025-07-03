import React from 'react'

const CheckInbox = () => {
  return (
    <div className='check-inbox min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <h2 className='text-xl font-bold mb-4'>✅ Signup Successful!</h2>
      <p className='mb-6 text-center'>We've sent you a verification email.</p>
      <p className='mb-6 text-center'>Please check your inbox and click the link to verify your email.</p>
      <p className='mb-6 text-center'>Didn't get it? Check your spam folder or try signing up again.</p>
    </div>
  )
}

export default CheckInbox