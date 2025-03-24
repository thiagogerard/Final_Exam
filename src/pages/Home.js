import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://api.thedogapi.com/v1/breeds")
      .then((res) => res.json())
      .then((data) => setDogs(data.slice(0, 10)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>🐾 CCTBpet</h1>
      <div className="dog-grid">
        {dogs.map((dog) => (
          <div key={dog.id} className="dog-card">
            <img src={dog.image?.url} alt={dog.name} width={200} />
            <h3>{dog.name}</h3>
            <Link to={`/dogs/${dog.id}`}>See Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
