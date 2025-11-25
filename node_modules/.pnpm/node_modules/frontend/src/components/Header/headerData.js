export const headerData = [
  { text: "Domů", path: "/" },
  { text: "O nás", path: "/o-nas" },
  { text: "Kontakt", scrollTo: "footer" },
  {
    text: "Pojištění",
    scrollTo: "pojisteni",
    submenu1: [
      { text: "Životní pojištění", slug: "zivotni" },
      {
        text: "Neživotní pojištění",
        slug: "nezivotni",
        submenu2: [
          { text: "Cestovní pojištění", slug: "cestovni" },
          { text: "Majetkové pojištění", slug: "majetkove" },
          { text: "Pojištění vozidel", slug: "vozidla" },
          { text: "Pojištění odpovědnosti", slug: "odpovednost" },
          { text: "Více...", path: "/pojisteni/vice" },
        ],
      },
      { text: "Firemní pojištění", slug: "firemni" },
    ],
  },
];

export const headerIcons = [
  { id: 1, icon: "🔍", action: "toggleSearch" },
  { id: 2, icon: "👤", path: "/login" },
];

