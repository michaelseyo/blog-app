import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import Layout from "./components/Layout";
import { auth } from "./firebase-config";
import { useState } from "react";
import { signOut } from "firebase/auth";

import { createTheme, ThemeProvider } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF7F50'
    }
  }
})

function App() {
  const [isAuth, setAuth] = useState(localStorage.getItem("isAuth"));
  const logUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setAuth(false);
      window.location.pathname = "/login";
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout isAuth={isAuth} logUserOut={logUserOut}/>
          <Routes>
            <Route path="/" element={<Home isAuth={isAuth}/>}/>
            <Route path="/createpost" element={<CreatePost isAuth={isAuth}/>}/>
            <Route path="/login" element={<Login setAuth={setAuth}/>}/>
            <Route path="*" element={<ErrorPage />}/>
          </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
