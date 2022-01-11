import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { auth } from "./firebase-config";
import { useState } from "react";
import { signOut } from "firebase/auth";

import { AppBar, Toolbar, Button } from '@material-ui/core';

function App() {
  const [isAuth, setAuth] = useState(false);
  const logUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setAuth(false);
      window.location.pathname = "/login";
    });
  }

  return (
    <Router>
      <AppBar color="primary" position="sticky">
        <Toolbar>
          <Button>
            <Link to="/">Home</Link>
          </Button>
          <Button>
            <Link to="/createpost">Create</Link>
          </Button>
          {!isAuth ? 
            <Button>
              <Link to="/login">Login</Link> 
            </Button> : 
            <Button onClick={logUserOut}
              style={{
                color:"white"           
              }}>Log Out</Button>
          }
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/createpost" element={<CreatePost />}/>
        <Route path="/login" element={<Login setAuth={setAuth}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
