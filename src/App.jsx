import { useState, useEffect } from "react";

const App = () => {
  const [politicians, setPoliticians] = useState([]);

  async function getPoliticians() {
    try {
      const response = await fetch(
        "https://boolean-spec-frontend.vercel.app/freetestapi/politicians"
      );
      const data = await response.json();
      setPoliticians(data);
    } catch (error) {
      console.error("Errore:", error);
    }
  }

  useEffect(() => {
    getPoliticians();
  }, []);

  console.log(politicians);

  return (
    <div>
      <h1>Lista dei Politici</h1>
      <ul>
        {politicians.map((politician) => {
          return (
            <li className="list-element">
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
