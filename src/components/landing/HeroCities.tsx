const cities = [
  { name: "Berlin", country: "Almanya" },
  { name: "Amsterdam", country: "Hollanda" },
  { name: "Londra", country: "İngiltere" },
  { name: "Paris", country: "Fransa" },
  { name: "Viyana", country: "Avusturya" },
  { name: "Brüksel", country: "Belçika" },
  { name: "Stockholm", country: "İsveç" },
  { name: "Zürih", country: "İsviçre" },
];

export default function HeroCities() {
  return (
    <aside className="hero-aside fade-up">
      <div className="hero-aside-label">Ağ şimdi burada</div>
      <ul className="hero-cities">
        {cities.map((city) => (
          <li key={city.name} className="hero-city">
            <span>{city.name}</span>
            <span className="hero-city-co">{city.country}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
