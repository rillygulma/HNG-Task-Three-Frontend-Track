import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FiShoppingCart, FiSearch, FiUser } from "react-icons/fi"; // Import necessary icons from react-icons library

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useSelector((state) => state.cart);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-customPink text-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={handleMenuToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block">
              <div className="flex space-x-4">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-customPink"
                      : "font-normal text-white"
                  }
                  to="/search"
                >
                  <FiSearch className="h-6 w-6" />
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "font-bold text-customPink"
                      : "font-normal text-white"
                  }
                  to="/account"
                >
                  <FiUser className="h-6 w-6" />
                </NavLink>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-customPink"
                  : "font-normal text-white"
              }
              to="/cart"
            >
              {/* Cart Icon */}
              <FiShoppingCart className="h-6 w-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {cart?.length}
              </span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle classes based on menu state */}
      {menuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "block px-3 py-2 rounded-md text-base font-bold text-customPink"
                  : "block px-3 py-2 rounded-md text-base font-normal text-white"
              }
              to="/search"
            >
              <FiSearch className="h-6 w-6" />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "block px-3 py-2 rounded-md text-base font-bold text-customPink"
                  : "block px-3 py-2 rounded-md text-base font-normal text-white"
              }
              to="/account"
            >
              <FiUser className="h-6 w-6" />
            </NavLink>
          </div>
        </div>
      )}
      <div className="absolute button-0 left-0 right-0 h-1 bg-red-500"></div>
    </nav>
  );
};

export default Navbar;
