import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import EmailVerification from './components/auth/EmailVerification';
import Home from './views/Home';

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: '/signup',
      element: <SignUp/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/email/:token",
      element: <EmailVerification/>
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          theme="colored"
        />
    </>
  )
}

export default App
