import React from "react";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <section className="home_section">
      <div className="heading">
        <h1 className="heading1">Expense</h1>
        <h1 className="heading2">Tracker</h1>
      </div>
      <div className="description">
        <p>
          a convenient tool for tracking personal or household expenses which is
          designed to streamline the process of budget management, offering a
          user-friendly interface, automation of calculations, and reports and
          insights.
        </p>
      </div>
      <div>
        <Link to="/login">
          <button className="try_btn">Try Now </button>
        </Link>
        <Link to="https://github.com/aashishpanthi/Expense-tracker">
          <button className="try_btn1">View Code </button>
        </Link>
      </div>
    </section>
  );
}
