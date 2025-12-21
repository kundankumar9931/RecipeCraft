import React from "react";
import Home from "./Home";
import Navbar from "./navBar";
import Login from "./Login";
import About from "./About";
import Recipes from "./Recipes";
import Signup from "./Signup";
import MealPlanner from "./MealPlanner";

function App() {
  const path = window.location.pathname;

  return (
    <>
      <Navbar />
      {path === "/" && <Home />}
      {path === "/login" && <Login />}
      {path === "/signup" && <Signup />}
      {path === "/About" && <About />}
      {path === "/Recipes" && <Recipes />}
      {path === "/MealPlanner" && <MealPlanner />}
    </>
  );
}

export default App;

