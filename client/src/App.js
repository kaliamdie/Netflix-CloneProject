import {Routes,Route} from "react-router-dom"
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Netflix from "./pages/Netflix";
import Error from "./pages/Error";
import Home from "./pages/Home";
import SignOut from "./pages/SignOut";
import MoreInfoModal from "./components/MoreInfoModal";





function App() {
  return (
    <div className="app">

     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/error" element={<Error/>} />
<Route path="/netflix" element={<Netflix/>}/>
<Route path="/signout" element={<SignOut/>}/>
<Route path="/more-info/:movieId" element={<MoreInfoModal/>} />

      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>

    </div>
  );
}

export default App;
