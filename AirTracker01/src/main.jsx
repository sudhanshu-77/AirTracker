import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './Components/Home/Home.jsx'
import About from './Components/About/About.jsx'
import Contact from './Components/Contact/Contact.jsx'
import Explore from './Components/Explore/Explore.jsx'
import ResultSearch from './Components/Result/ResulSearch.jsx'
import Signup from './Components/Signup/Signup.jsx'
import Login from './Components/Login/Login.jsx'
import { DataProvider } from './data.jsx'
import Booking from './Components/Booking/Booking.jsx'
import { AuthProvider } from './auth.jsx'
import ErrorBoundary from './Components/ErrorBoundary.jsx'
import NotFound from './Components/NotFound.jsx'
import Profile from './Components/Profile.jsx'
import Payment from './Components/Payment.jsx'
import ProtectedRoute from './Components/ProtectedRoute.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>,
//     children: [
//       {
//         path: "",
//         element: <Home />
//       },
//       {
//         path: "about",
//         element: <About />
//       },
//       {
//         path: "contact",
//         element: <Contact />
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='home' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='explore' element={<Explore />} />
      <Route path='result' element={<ResultSearch />} />
      <Route path='contact' element={<Contact />} />
      <Route path='login' element={<Login />} />
      <Route path='/result/book' element={<ProtectedRoute><Booking /></ProtectedRoute>} />
      <Route path='signup' element={<Signup />} />
      <Route path='profile' element={<Profile />} />
      <Route path='payment' element={<ProtectedRoute><Payment /></ProtectedRoute>} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <AuthProvider>
      <DataProvider>
        <React.StrictMode>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </React.StrictMode>
      </DataProvider>
    </AuthProvider>
  </ErrorBoundary>,
)