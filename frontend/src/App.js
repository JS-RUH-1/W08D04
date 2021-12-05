import AutherDetails from "./componants/AuthorsDetals";
import NavBar from "./componants/NavBar";
import Main from "./componants/Main";
import Books from "./componants/Books"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './componants/Registration.'

function App() {


  const user = localStorage.getItem("token")

  return (

    
    <div>

      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={user ? <Main /> : <Registration />} />
          <Route path="/AutherDetails/:id" element={<AutherDetails />} />
          <Route path="/Books" element={<Books />} />
          <Route path="/loginPage" element={<Registration />}/>
        </Routes>
      </Router>

    </div>
    
  );
}

export default App;
