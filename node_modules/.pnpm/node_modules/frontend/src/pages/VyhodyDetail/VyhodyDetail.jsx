import { vyhodyData } from "../../components/Vyhody/vyhodyData";
import { useNavigate } from "react-router-dom";

export default function VyhodyDetail() {
  const navigate = useNavigate();

  return (
    <section className="vyhody-page">
      <h1>Výhody aplikace</h1>
      <div className="container">
        {vyhodyData.map((item) => (
          <div className="card vyhody-card" key={item.id} onClick={() => navigate(`/vyhody/detail/${item.slug}`)}>
            <div className="icons vyhody-icons">
              <span>{item.icon}</span>
            </div>
            <h3 className="title vyhody-title">{item.title}</h3>
            <p className="description vyhody-description">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


