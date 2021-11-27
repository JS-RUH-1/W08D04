
import { Link } from "react-router-dom";
import { useState } from "react"
// import { ContextStore } from "../context";
// // import { showLogin, showSignup } from "../reducers/assets";
// // import UserDropdown from "./UserDropdown";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // const state = useSelector((state) => ({ ...state.assets }));
//   // const { user, setToken } = useContext(ContextStore);
//   // const dispatch = useDispatch();
//   // const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
    <div class="relative flex items-center justify-between">
      <div class="flex items-center">
        <a
          href="/"
          aria-label="Company"
          title="Company"
          class="inline-flex items-center mr-8"
        >
          <svg
            class="w-8  text-pink-700"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            stroke="currentColor"
            fill="none"
          >
            <rect x="3" y="1" width="7" height="12" />
            <rect x="3" y="17" width="7" height="6" />
            <rect x="14" y="1" width="7" height="6" />
            <rect x="14" y="11" width="7" height="12" />
          </svg>
          <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
            Library
          </span>
        </a>
        <ul class="flex items-center hidden space-x-8 lg:flex">
          <li>
            <a
              href="/"
              aria-label="Our product"
              title="Our product"
              class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-pink-700"
            >
              Books
            </a>
          </li>
          <li>
            <a
              href="/"
              aria-label="Our product"
              title="Our product"
              class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-pink-700"
            >
              Authors
            </a>
          </li>
        
         
        </ul>
      </div>
      <ul class="flex items-center hidden space-x-8 lg:flex">
        <li>
          <a
            href="/"
            aria-label="Sign in"
            title="Sign in"
            class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-pink-700"
          >
            Sign in
          </a>
        </li>
        <li>
          <a
            href="/"
            class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-pink-700 hover:bg-pink-200 focus:shadow-outline focus:outline-none"
            aria-label="Sign up"
            title="Sign up"
          >
            Sign up
          </a>
        </li>
      </ul>
    </div>
  </div>
  );
}
