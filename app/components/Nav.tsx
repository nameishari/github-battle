import * as React from "react";
import ThemeContext from "../contexts/theme";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "rgb(187, 46, 31)",
};

export default function Nav({ toggleTheme }: { toggleTheme: () => void }) {
  const theme = React.useContext(ThemeContext);
  return (
    <nav className="row space-between">
      <ul className="nav row">
        <li>
          <NavLink exact activeStyle={activeStyle} to="/" className="nav-link">
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={activeStyle} to="/battle" className="nav-link">
            Battle
          </NavLink>
        </li>
      </ul>
      <button
        style={{ fontSize: 30 }}
        className="btn-clear"
        onClick={toggleTheme}
      >
        {theme === "light" ? "🔦" : "💡"}
      </button>
    </nav>
  );
}
