import { useState } from "react";
import "./Menu.css";

const MenuItem = ({ item }) => {
  const hasChildren = item.children?.length > 0;
  const [open, setOpen] = useState(false);

  return (
    <li className="menu-item">
      <div
        className="menu-link"
        onClick={() => hasChildren && setOpen(!open)}
      >
        <a href={item.url || "#"}>{item.label}</a>
        {hasChildren && <span className={`arrow ${open ? "open" : ""}`}>▼</span>}
      </div>

      {hasChildren && (
        <ul className={`submenu ${open ? "open" : ""}`}>
          {item.children.map((child) => (
            <MenuItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Menu = ({ menuData }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="menu">
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
      <ul className={`menu-list ${menuOpen ? "open" : ""}`}>
        {menuData.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
