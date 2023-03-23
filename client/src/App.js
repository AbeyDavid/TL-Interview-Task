import {BrowserRouter, Route, Routes} from "react-router-dom"
import UserHome from "./components/UserHome";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";

function LoginValid(){
  const token = localStorage.getItem("token")
  return token ? <UserHome/> : <UserLogin/>
}

function SignupValid(){
  const token = localStorage.getItem("token")
  return token ? <UserHome/> : <UserSignup/>
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignupValid/>} />
        <Route path="/login" element={<LoginValid/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
