export const footerData = [
  {
    type: "kontakt",
    title: "Kontaktujte nás",
    class: "footer-content",
    items: [
      { id: 1, icon: "📍", text: "Pojištění Pro Všechny a.s.", path: "kontakt" },
      { id: 2, text: "Havlíčkova 2252, Česká Lípa 470 01", action: "goMapa" },
      { id: 3, icon: "📞", text: "+420 778 024 815", action: "goTelefon" },
      { id: 4, icon: "✉️", text: "dotazy@ppv.cz", action: "goEmail" },
    ],
  },
  {
    type: "odkazy",
    title: "Užitečné odkazy",
    class: "footer-links",
    items: [
      { id: 1, text: "O společnosti", path: "o-nas" },
      { id: 2, text: "Podmínky pojištění", path: "podminky" },
      { id: 3, text: "Hlášení škody", path: "hlaseni-skody" },
      { id: 4, text: "Ochrana osobních údajů", path: "gdpr" },
    ],
  },
  {
    type: "social",
    title: "Sledujte nás",
    class: "footer-socials",
    items: [
      { id: 1, icon: "📘", url: "https://facebook.com" },
      { id: 2, icon: "📸", url: "https://instagram.com" },
    ],
  },
];
