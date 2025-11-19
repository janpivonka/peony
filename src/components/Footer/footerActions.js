export const footerActions = {
  goMapa: () => {
    const address = encodeURIComponent("Havlíčkova 2252, Česká Lípa 47001, Česká republika");
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, "_blank");
  },

  goTelefon: () => {
    const phone = "+420 778 024 815";
    navigator.clipboard.writeText(phone)
      .then(() => alert(`Telefonní číslo ${phone} zkopírováno do schránky!`))
      .catch(() => alert("Nepodařilo se zkopírovat číslo."));
  },

  goEmail: () => {
    const email = "dotazy@ppv.cz";
    const subject = encodeURIComponent("Dotaz ohledně pojištění");
    const body = encodeURIComponent("Dobrý den,\n\nchtěl(a) bych se zeptat na...");

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");
  },

};
