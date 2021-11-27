// import React, { useContext, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ContextStore } from "../context";
// import { showLogin } from "../reducers/assets";
// import axios from "axios";

// export default function Login() {
//   const state = useSelector((state) => ({ ...state.assets }));
//   const dispatch = useDispatch();
//   const { Toast, setToken, token } = useContext(ContextStore);

//   const [email, setEmail] = useState("");
//   const [password, setPass] = useState("");

//   const login = () => {
//     axios
//       .post("/user/login", { email, password })
//       .then((res) => {
//         setToken(`Bearer ${res.data.token}`);
//         dispatch(showLogin());
//         Toast.fire({
//           icon: "success",
//           title: "Signed in successfully",
//         });
//       })
//       .catch((err) => {
//         Toast.fire({
//           icon: "error",
//           title: "Wrong username or password",
//         });
//       });
//   };

//   return (
//     <div>
//       {state.showLogin ? (
//         <>
//           <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none bg-black bg-opacity-30 focus:outline-none">
//             <div className="relative w-auto my-6 mx-auto ">
//               {/*content*/}
//               <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                 {/*header*/}
//                 <div className=" flex items-start justify-items-center  p-5 border-b border-solid border-graylight rounded-t">
//                   <h3
//                     style={{ width: "15rem" }}
//                     className="justify-self-start text-3xl text-darkblue font-semibold"
//                   >
//                     Login
//                   </h3>
//                   <button
//                     className="justify-self-end p-1 ml-auto bg-transparent border-0 text-darkblue opacity-30 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
//                     onClick={() => dispatch(showLogin())}
//                   >
//                     {" "}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6  "
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 </div>

//                 <form className="relative p-6 flex-auto">
//                   <div className="relative w-full mb-3">
//                     <label
//                       className="block uppercase text-darkblue text-xs font-bold mb-2"
//                       htmlFor="grid-password"
//                     >
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="border-0 px-3 py-3 placeholder-graylight  bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                       placeholder="Email"
//                       style={{ transition: "all .15s ease" }}
//                     />
//                   </div>

//                   <div className="relative w-full mb-3">
//                     <label
//                       className="block uppercase text-darkblue text-xs font-bold mb-2"
//                       htmlFor="grid-password"
//                     >
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPass(e.target.value)}
//                       className="border-0 px-3 py-3 placeholder-graylight bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
//                       placeholder="Password"
//                       style={{ transition: "all .15s ease" }}
//                     />
//                   </div>
//                   <div>
//                     <label className="inline-flex items-center cursor-pointer">
//                       <input
//                         id="customCheckLogin"
//                         type="checkbox"
//                         className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
//                         style={{ transition: "all .15s ease" }}
//                       />
//                       <span className="ml-2 text-sm font-semibold text-darkblue">
//                         Remember me
//                       </span>
//                     </label>
//                   </div>

//                   <div className="text-center mt-6">
//                     <button
//                       className="bg-orang1 text-white  text-sm font-bold uppercase px-6 py-3 rounded shadow hover:bg-orang2 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
//                       type="button"
//                       style={{ transition: "all .15s ease" }}
//                       onClick={() => login()}
//                     >
//                       Sign In
//                     </button>
//                   </div>
//                 </form>
//                 {/*footer*/}
//               </div>
//             </div>
//           </div>
//           <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//         </>
//       ) : null}
//     </div>
//   );
// }
