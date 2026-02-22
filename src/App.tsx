// import { useState } from 'react'
// //importnya per files
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css' 

// function App() {
  //   const [count, setCount] = useState(0)
  
  //   return (
    //     <>
    //       <div>
    //         <a href="https://vite.dev" target="_blank">
    //           <img src={viteLogo} className="logo" alt="Vite logo" />
    //         </a>
    //         <a href="https://react.dev" target="_blank">
    //           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}> //tombolnya jd nambah 1, kl mau 2 ya ubah aja jd 2
//           count is {count}
//         </button>
//         <p>
//           kelas PBP tanggal 30 januari 2026
//         </p>
//       </div>
//       <p className="read-the-docs">
//         hello world
//       </p>
//     </>
//   )
// }

// export default App

// import { useState } from 'react'
// import { isEmail } from './utils/isEmail';
// import { ToDo } from './ToDo'
// import { PostList } from './PostList';

// function App() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return <PostList></PostList>
//   const login = async () => {
//     if (!isEmail(email)) {
//       alert(`invalid email`);
//       return;
//     }
    // if (password.length < 8) {
    //   alert("password must be atleast 8 char");
    //   return;
    // }
//     const response = await fetch('http://localhost:5173/api/auth/login', {
//       method: 'POST',
//       headers: {
//         "content-type": "application/json"
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       })
//     })
//     if (response.status !== 200) {
//       alert('Login failed');
//       return;
//     }
//     setIsLoggedIn(true);
//     alert(`logging in for ${email}`);
//   }

//   const logout = () => {
//     setIsLoggedIn(false);
//     setEmail('');
//     setPassword('');
//   }

//   if (isLoggedIn) {
//     return <div>
//       <div>Hello, {email}</div>
//       <ToDo/>
//       <div>
//         <button onClick={logout}>logout</button>
//       </div>
//       </div>
//   }

//     return (
//         <div>
//             <h4>Login</h4>
//             <div>
//                 <p>email</p>
//                 <input type="text" 
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <p>password</p>
//                 <input type='password'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 />
//             </div>
//             <div>
//             <button onClick={login}>login</button> 
//             {/* //pas dipencet ada alertnya */}
//             </div>
//             <br />
//             <div>email : {email}</div>
//             <div>password : {password}</div>
//         </div>
//     )
// }

// export default App

import { LearningHooks } from "./LearningHooks";

function App() {
  return <LearningHooks/>
}