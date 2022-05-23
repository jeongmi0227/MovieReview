import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  
} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import MovieDetail from "./components/views/MovieDetail/MovieDetail";
import Auth from "./hoc/auth";


export default function App() {
  const NewLandingPage = Auth(LandingPage, null);
  const NewLoginPage = Auth(LoginPage, false);
  const NewRegisterPage = Auth(RegisterPage, false);
  const NewMovieDetail = Auth(MovieDetail, null);
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<NewLandingPage/>}/>
          <Route exact path="/login" element={<NewLoginPage/>} />
          <Route exact path="/register" element={<NewRegisterPage />} />
          <Route exact path='/movie/:movieId' element={<NewMovieDetail />}/>
        </Routes>
      </div>
    </Router>
  );
}


