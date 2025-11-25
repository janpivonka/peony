import { useParams } from "react-router-dom";
import { vyhodyData } from "../../components/Vyhody/vyhodyData";

export default function VyhodaCard() {
  const { slug } = useParams();
  const vyhoda = vyhodyData.find((v) => v.slug === slug);

  if (!vyhoda) return <p>Výhoda nenalezena</p>;

  return (
    <section className="vyhody-page">
      <h1>{vyhoda.title}</h1>
      <p>{vyhoda.description}</p>
    </section>
  );
}
