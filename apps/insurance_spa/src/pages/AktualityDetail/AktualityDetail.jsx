import { aktualityData } from "../../components/Aktuality/aktualityData";
import Aktualita from "../../components/Aktuality/Aktualita";

const AktualityDetail = () => {
  return (
    <section className="aktuality-page">
      <h1>Aktuality</h1>
      <p>Zde naleznete nejnovější zprávy a novinky ze světa pojištění.</p>
      <div className="aktuality-detail-container">
        {aktualityData.map((item) => (
          <Aktualita
            key={item.id}
            slug={item.slug}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default AktualityDetail;
