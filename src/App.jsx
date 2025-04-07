import { useState, useEffect, useMemo, memo } from "react";

function PoliticianCard({ name, image, biography, position }) {
  return (
    <li className="list-element">
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p>
        Posizione<strong>{position}</strong>
      </p>
      <p>{biography}</p>
    </li>
  );
}

const MemoizedCard = memo(PoliticianCard);

const App = () => {
  const [politicians, setPoliticians] = useState([]);
  const [search, setSearch] = useState("");

  const filteredPoliticians = useMemo(() => {
    return politicians.filter((politician) => {
      const isInName = politician.name
        .toLowerCase()
        .includes(search.toLocaleLowerCase());
      const isInBio = politician.biography
        .toLowerCase()
        .includes(search.toLocaleLowerCase());
      return isInName || isInBio;
    });
  }, [politicians, search]);

  useEffect(() => {
    fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then((res) => res.json())
      .then((data) => setPoliticians(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Lista dei Politici</h1>
      <input
        type="text"
        placeholder="Cerca un politico..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredPoliticians.map((politician) => {
          return <MemoizedCard key={politician.id} {...politician} />;
        })}
      </ul>
    </div>
  );
};

export default App;
