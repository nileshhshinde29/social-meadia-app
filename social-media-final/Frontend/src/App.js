
import react from 'react'
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { BrowserRouter, Routes, Route ,Navigate} from "react-router-dom";
import Feed from './Components/Feed';
import Login from "./Components/Login";
import Signup from './Components/Signup';
import Header from './Components/Header'

function App() {
  const [AuthorisationLink, setAuthorisationLink] = useState(localStorage.getItem("token") ?JSON.parse( localStorage.getItem("token")):"")

   const [login, setLogin] = useState(() =>
    localStorage.getItem("token") ? true : false
          );


  return (
    <div className='App'>
      
      <BrowserRouter>
        {!AuthorisationLink ? (
          <Routes>
             <Route exact path="/" element={<Navigate to="/login"></Navigate>}></Route>
            <Route path="/login" element={<Login setToken={setAuthorisationLink}/>} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        ) : (
          <>
         {AuthorisationLink && <Header setToken={setAuthorisationLink} data={"nilesh"} />}
            <Routes>
              <Route path="/" element={<Feed/>} />
              <Route path="/login" element={<Login setToken={setAuthorisationLink}/>} />
             <Route path='/signup' element={<Signup />} />
             {/* <Route path='/header' element={<Header />} /> */}
            </Routes>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}


export default App



// function App() {
//   const [login, setLogin] = useState(() =>
//     localStorage.getItem("token") ? true : false
//   );

//   return (
//     <div className="App">
//       <BrowserRouter>
//         {!login ? (
//           <Routes>
//             {/* <Route path="/login" element={<LoginPage val={setLogin} />} />
//             <Route path="*" element={<Navigate to={"/login"} />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="/forgotPassword" element={<ForgotPassWord />} /> */}
//           </Routes>
//         ) : (

//           <>
//             <Routes>
//               {/* <Route path="/dashboard" element={<Dashboard val={setLogin} />} />
//               <Route path="/people" element={<PeopleList />} />
//               <Route path="/people/:id" element={<EditPeople />} />
//               <Route path="/deals" element={<AddDeal />} />
//               <Route path="/activities" element={<Activities />} /> */}

//               {/* <Route path="*" element={<Navigate to={"/dashboard"} />} /> */}
//             </Routes>
//           </>
//         )}
//       </BrowserRouter>

//       {/* <Test/> */}
//       {/* <h1>{process.env.API_URL}</h1> */}
//       {/* <header className="App-header">CRM App working!</header> */}
//     </div>
//   );
// }