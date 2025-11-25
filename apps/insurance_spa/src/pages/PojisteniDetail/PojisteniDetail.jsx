import { useLocation } from "react-router-dom";
import { pojisteniData } from "../../components/Pojisteni/pojisteniData";

export default function PojisteniDetail() {
  const location = useLocation();
  const segments = location.pathname.split("/");
  const lastSegment = segments[segments.length - 1];
  const pojisteni = pojisteniData.find((v) => v.slug === lastSegment);

  if (!pojisteni) return <p>Pojištění nenalezeno.</p>;

  return (
    <section className="pojisteni-page">
      <h1>{pojisteni.title}</h1>
      <p>{pojisteni.description}</p>
    </section>
  );
}
