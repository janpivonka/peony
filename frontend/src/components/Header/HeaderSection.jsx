export default function HeaderSection({ item, onItemClick, level = 1 }) {
  const submenuItems = item.submenu1 || item.submenu2;
  const ulClass = level === 1 ? "first-submenu" : "second-submenu";
  const liClass = submenuItems ? (level === 1 ? "has-submenu" : "submenu-has-submenu") : "";

  return (
    <li className={liClass}>
      <span className="menu-link" onClick={() => onItemClick(item)}>
        {item.text}
      </span>
      {submenuItems && (
        <ul className={ulClass}>
          {submenuItems.map((subItem, i) => (
            <HeaderSection
              key={i}
              item={subItem}
              onItemClick={onItemClick}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

