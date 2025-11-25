import { useNavigate } from "react-router-dom";
import { pojisteniData } from "../../components/Pojisteni/pojisteniData";

export default function PojisteniDetail() {
  const navigate = useNavigate();

  return (
    <section className="pojisteni-page">
      <h1>Nabízená pojištění</h1>

      <div className="container pojisteni-container">
        {pojisteniData.map((item) => (
          <div className="card pojisteni-card" key={item.id} onClick={() => navigate(`/pojisteni/detail/${item.slug}`)}>
            <div className="icons pojisteni-icons">
              <span>{item.icon}</span>
            </div>
            <h3 className="title pojisteni-title">{item.title}</h3>
            <p className="description pojisteni-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

