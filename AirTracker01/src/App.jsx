import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Contact from './Components/Contact/Contact'
import Explore from './Components/Explore/Explore'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import ResulSearch from './Components/Result/ResulSearch'
import Booking from './Components/Booking/Booking'
import Payment from './Components/Payment'
import Profile from './Components/Profile'
import NotFound from './Components/NotFound'
import ProtectedRoute from './Components/ProtectedRoute'
import { AuthProvider } from './auth'
import { DataProvider } from './data'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from './Components/ErrorBoundary'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'explore', element: <Explore /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'result', element: <ResulSearch /> },
      {
        path: 'result/book',
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        )
      },
      {
        path: 'payment',
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      }
    ]
  }
])

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <DataProvider>
          <div className="App min-h-screen">
            <RouterProvider router={router} />
            <ToastContainer 
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              className="toast-container"
            />
          </div>
        </DataProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
