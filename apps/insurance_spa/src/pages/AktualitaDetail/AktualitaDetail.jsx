import { useParams } from "react-router-dom";
import { aktualityData } from "../../components/Aktuality/aktualityData";

const AktualitaDetail = () => {
  const { slug } = useParams();
  const aktualita = aktualityData.find(a => a.slug === slug);

  if (!aktualita) return <p>Aktualita nenalezena.</p>;

  return (
    <section>
      <h1>{aktualita.title}</h1>
      <img src={aktualita.image} alt={aktualita.title} />
      <p>{aktualita.description}</p>
    </section>
  );
};

export default AktualitaDetail;
