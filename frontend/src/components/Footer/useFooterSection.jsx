export function useFooterSection(onItemClick) {
  const handleItemClick = (e, item) => {
    if (e) e.preventDefault();
    if (onItemClick) onItemClick(item);
  };

  const renderItems = (items = [], isSocial = false) => {
    if (!items.length) return null;

    if (isSocial) {
      return (
        <div className="footer-icons icons">
          {items.map((item) => (
            <span key={item.id} onClick={() => handleItemClick(null, item)}>
              {item.icon}
            </span>
          ))}
        </div>
      );
    }

    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={item.url || "#"} onClick={(e) => handleItemClick(e, item)}>
              {item.icon && <span>{item.icon} </span>}
              {item.text}
            </a>
            {item.submenu && renderItems(item.submenu)}
          </li>
        ))}
      </ul>
    );
  };

  return { renderItems };
}
