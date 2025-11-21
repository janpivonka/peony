export default function HeaderSection({ item, onItemClick }) {
  const submenuItems = item.submenu || [];
  const hasSubmenu = submenuItems.length > 0;

  return (
    <li className={hasSubmenu ? "has-submenu" : ""}>
      <span className="menu-link" onClick={() => onItemClick(item)}>
        {item.text}
      </span>

      {hasSubmenu && (
        <ul className="submenu">
          {submenuItems.map((sub, i) => (
            <li key={i}>
              <span className="menu-link" onClick={() => onItemClick(sub)}>
                {sub.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
