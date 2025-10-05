import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow, faPlaneUp, faBars, faTimes, faUser, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth'


export default function Header() {
  const {auth, setAuth} = useAuth()
  const navigate = useNavigate()
  const ls = JSON.parse(localStorage.getItem("auth"))
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logout = () => {
    if (ls?.user) {
      localStorage.removeItem("auth")
      setAuth(null)
      navigate('/home')
      window.location.reload()
    }
  }

  return (
    <header className={`sticky z-50 top-0 transition-all duration-300 ${scrolled ? 'shadow-lg backdrop-blur-md bg-white/95' : 'shadow-md bg-white'}`}>
      <nav className="px-4 lg:px-6 py-4">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <FontAwesomeIcon 
                icon={faLocationArrow} 
                className="text-3xl text-orange-600 group-hover:text-orange-700 transition-all duration-300 group-hover:rotate-12" 
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div className="ml-3">
              <h2 className="font-bold text-4xl bg-gradient-to-r from-orange-600 to-blue-600 bg-clip-text text-transparent">Air</h2>
              <h2 className="text-lg font-semibold text-gray-700 -mt-1">Tracker</h2>
            </div>
          </Link>
        
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-200"
            >
              <FontAwesomeIcon 
                icon={isOpen ? faTimes : faBars} 
                className="text-xl transition-transform duration-200" 
              />
            </button>
          </div>
          <div
            className={`${
              isOpen ? 'block' : 'hidden'
            } w-full lg:flex lg:w-auto lg:order-1 transition-all duration-300`}
          >
            <ul className="flex flex-col mt-6 lg:mt-0 font-medium lg:flex-row lg:space-x-8 bg-white lg:bg-transparent rounded-lg lg:rounded-none shadow-lg lg:shadow-none p-4 lg:p-0">
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg transition-all duration-200 font-semibold ${
                      isActive 
                        ? 'text-orange-600 bg-orange-50 dark:bg-orange-900/30 border-l-4 border-orange-600 lg:border-l-0 lg:border-b-2 lg:bg-transparent lg:dark:bg-transparent' 
                        : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-gray-700 lg:hover:bg-transparent lg:dark:hover:bg-transparent'
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/explore"
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg transition-all duration-200 font-semibold ${
                      isActive 
                        ? 'text-orange-600 bg-orange-50 border-l-4 border-orange-600 lg:border-l-0 lg:border-b-2 lg:bg-transparent' 
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 lg:hover:bg-transparent'
                    }`
                  }
                >
                  Explore
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg transition-all duration-200 font-semibold ${
                      isActive 
                        ? 'text-orange-600 bg-orange-50 border-l-4 border-orange-600 lg:border-l-0 lg:border-b-2 lg:bg-transparent' 
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 lg:hover:bg-transparent'
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block py-3 px-4 rounded-lg transition-all duration-200 font-semibold ${
                      isActive 
                        ? 'text-orange-600 bg-orange-50 border-l-4 border-orange-600 lg:border-l-0 lg:border-b-2 lg:bg-transparent' 
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 lg:hover:bg-transparent'
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>
              {ls?.user && (
                <li>
                  <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                      `flex items-center py-3 px-4 rounded-lg transition-all duration-200 font-semibold ${
                        isActive 
                          ? 'text-orange-600 bg-orange-50 border-l-4 border-orange-600 lg:border-l-0 lg:border-b-2 lg:bg-transparent' 
                          : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50 lg:hover:bg-transparent'
                      }`
                    }
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Profile
                  </NavLink>
                </li>
              )}
              <li className="mt-4 lg:mt-0">
                <Link
                  to={ls?.user ? "/" : "/login"}
                  onClick={logout}
                  className="flex items-center justify-center w-full lg:w-auto bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold rounded-lg px-6 py-3 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <FontAwesomeIcon 
                    icon={ls?.user ? faSignOutAlt : faSignInAlt} 
                    className="mr-2" 
                  />
                  {!ls?.user ? 'Sign In' : 'Log Out'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    );
}