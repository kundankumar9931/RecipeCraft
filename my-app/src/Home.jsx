import React from "react";
import "./Home.css";


function Home() {

  

  return (
    <div className="home">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Cook Smart. Eat Healthy.</h1>
          <p className="hero-text">
            Discover recipes from ingredients you already have. Plan meals, save time, reduce food waste, and stay healthy.
          </p>

          <div className="hero-buttons">
            <a href="/Recipes"><button className="primary-btn">Search Recipes</button></a>
            <button className="secondary-btn">Learn More ↓</button>
          </div>
        </div>
      </section>

      {/* ---------------- STATS SECTION ---------------- */}
      <section className="stats">
        <div className="stat-box">
          <h2>5000+</h2>
          <p>Recipes Available</p>
        </div>

        <div className="stat-box">
          <h2>1200+</h2>
          <p>Active Weekly Planners</p>
        </div>

        <div className="stat-box">
          <h2>98%</h2>
          <p>User Satisfaction</p>
        </div>
      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section className="features" id="features">
        <h2 className="section-title">Features That Help You Daily</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🍅 Ingredient-Based Search</h3>
            <p>Enter ingredients you already have and get instant recipe ideas.</p>
          </div>

          <div className="feature-card">
            <h3>📅 Meal Planning</h3>
            <p>Create daily/weekly meal schedules and stay consistent.</p>
          </div>

          <div className="feature-card">
            <h3>🥗 Dietary Filters</h3>
            <p>Find recipes for Vegan, Keto, Gluten-free, High-Protein, and more.</p>
          </div>

          <div className="feature-card">
            <h3>🛒 Auto Shopping List</h3>
            <p>Generate a grocery list automatically based on your meal plan.</p>
          </div>

          <div className="feature-card">
            <h3>⭐ Favorites</h3>
            <p>Save recipes to your favorites and access anytime.</p>
          </div>

          <div className="feature-card">
            <h3>📊 Nutrition Insights</h3>
            <p>View calorie, carb, protein, and fat breakdown per recipe.</p>
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="testimonials">
        <h2 className="section-title">What Users Say</h2>

        <div className="test-grid">
          <div className="test-card">
            <p>"Amazing app! Helped me save time and eat healthier."</p>
            <h4>- Priya Sharma</h4>
          </div>

          <div className="test-card">
            <p>"Love the ingredient search feature!"</p>
            <h4>- Rajesh Kumar</h4>
          </div>

          <div className="test-card">
            <p>"My weekly meal planning is now stress-free!"</p>
            <h4>- Asha Verma</h4>
          </div>
        </div>
      </section>

      {/* ---------------- CALL TO ACTION ---------------- */}
      <section className="cta">
        <h2>Start Your Smart Cooking Journey Today</h2>
        <p>Plan your meals, reduce waste, eat healthy & save money.</p>
        <a href="/MealPlanner"><button className="primary-btn">Get Started →</button></a>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Recipe Search & Meal Planner | Made by Kundan kumar</p>
      </footer>

    </div>
  );
}

export default Home;


