import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      {/* Header Section */}
      <section className="about-hero">
        <h1>About Recipe Search & Meal Planner</h1>
        <p>
          Making everyday cooking easier, smarter, and healthier through
          intelligent meal planning.
        </p>
      </section>

      {/* Content Section */}
      <section className="about-content">
        <div className="about-card">
          <h2>Our Purpose</h2>
          <p>
            Recipe Search & Meal Planner is designed to help users find recipes
            using ingredients they already have at home. The platform focuses
            on reducing food waste, saving time, and promoting organized meal
            planning.
          </p>
        </div>

        <div className="about-card">
          <h2>What We Offer</h2>
          <ul>
            <li>Ingredient-based recipe search</li>
            <li>Daily and weekly meal planning</li>
            <li>Automatic shopping list generation</li>
            <li>Dietary preference-based recipe suggestions</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Why Choose This Platform?</h2>
          <p>
            With a simple and intuitive interface, the application helps users
            make informed cooking decisions. Whether you are a student, a
            working professional, or a home cook, this platform simplifies
            meal management and encourages healthier eating habits.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <section className="about-footer">
        <p>
          Recipe Search & Meal Planner is built as an educational and practical
          solution to modern meal management challenges.
        </p>
        <p>By Kundan kumar</p>
        <p>
  GitHub: <a href="https://github.com/kundankumar9931">kundankumar9931</a>
</p>

      </section>
    </div>
  );
}

export default About;



