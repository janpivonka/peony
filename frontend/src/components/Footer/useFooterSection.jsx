export function useFooterSection(onItemClick) {
  const renderItems = (items = [], isSocial = false) =>
    !items.length ? null : isSocial ? (
      <div className="footer-icons icons">
        {items.map((item) => (
          <span key={item.id} className="footer-icon" onClick={() => onItemClick?.(item)}>
            {item.icon}
          </span>
        ))}
      </div>
    ) : (
      <ul>
        {items.map((item, index) => (
          <li key={`${item.id}-${index}`} className="footer-item">
            <a className="footer-link" onClick={() => onItemClick?.(item)}>
              {item.icon && <span>{item.icon} </span>}
              {item.text}
            </a>
            {item.submenu && renderItems(item.submenu)}
          </li>
        ))}
      </ul>
    );

  return { renderItems };
}
