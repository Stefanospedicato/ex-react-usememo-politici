import { useState, useEffect, useMemo } from "react";

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
          return (
            <li key={politician.id} className="list-element">
              <h3>{politician.name}</h3>
              <img src={politician.image} alt={politician.name} />
              <p>
                Posizione<strong>{politician.position}</strong>
              </p>
              <p>{politician.biography}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
