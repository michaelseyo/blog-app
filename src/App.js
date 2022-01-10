import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";

import { AppBar, Toolbar, Button } from '@material-ui/core';

function App() {
  return (
    <Router>
      <AppBar color="primary">
        <Toolbar>
          <Button>
            <Link to="/">Home</Link>
          </Button>
          <Button>
            <Link to="/createpost">Create</Link>
          </Button>
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/createpost" element={<CreatePost />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </Router>
  );
}

export default App;
