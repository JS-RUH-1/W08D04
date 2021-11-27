// /* This example requires Tailwind CSS v2.0+ */
// import { Fragment, useContext } from "react";
// import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/solid";
// import { ContextStore } from "../context";
// import { Link } from "react-router-dom";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }
// export default function UserDropdown() {
//   const { user, setToken } = useContext(ContextStore);
//   return (
//     <Menu as="a" className="p-4 ">
//       <>
//         <Menu.Button
//           as="a"
//           className="inline cursor-pointer text-purple1 hover:text-darkpurple"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="mr-2 mb-1 ml-2 h-5 w-5 inline"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>{" "}
//           Hello {user.name}
//           <ChevronDownIcon
//             className="inline mb-1 -mr-1 ml-2 h-5 w-5"
//             aria-hidden="true"
//           />
//         </Menu.Button>
//       </>

//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-100"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-75"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <Menu.Items className="origin-top-right absolute text-purple1 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
//           <div className="py-1">
//             <Menu.Item>
//               {({ active }) => (
//                 <Link
//                   to="/mytickets"
//                   className={classNames(
//                     active ? "bg-graylight" : " text-purple1",
//                     "block px-4 py-2 text-sm"
//                   )}
//                 >
//                   My Tickets
//                 </Link>
//               )}
//             </Menu.Item>
//             <form method="POST" action="#">
//               <Menu.Item>
//                 {({ active }) => (
//                   <button
//                     onClick={() => setToken(undefined)}
//                     type="submit"
//                     className={classNames(
//                       active ? "bg-graylight" : " text-purple1",
//                       "block w-full text-left px-4 py-2 text-sm"
//                     )}
//                   >
//                     Sign out
//                   </button>
//                 )}
//               </Menu.Item>
//             </form>
//           </div>
//         </Menu.Items>
//       </Transition>
//     </Menu>
//   );
// }
