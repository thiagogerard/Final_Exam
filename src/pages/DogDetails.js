import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DogDetails() {
  const { id } = useParams();
  const [dog, setDog] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("https://api.thedogapi.com/v1/breeds")
      .then((res) => res.json())
      .then((data) => {
        const foundDog = data.find((d) => d.id.toString() === id);
        setDog(foundDog);
      });
  }, [id]);

  if (!dog) return <p>Loading...</p>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h1>{dog.name}</h1>
      <img src={dog.image?.url} alt={dog.name} width={300} />
      <p><strong>Breed Group:</strong> {dog.breed_group || "Unknown"}</p>
      <p><strong>Temperament:</strong> {dog.temperament}</p>
      <p><strong>Life Span:</strong> {dog.life_span}</p>

      <h2>Adopt {dog.name}</h2>
      {submitted ? (
        <p>Thank you, {formData.name}! We'll get in touch with you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
          <div>
            <label>Name:</label><br />
            <input type="text" name="name" required value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label><br />
            <input type="email" name="email" required value={formData.email} onChange={handleChange} />
          </div>
          <div>
            <label>Message:</label><br />
            <textarea name="message" required value={formData.message} onChange={handleChange} />
          </div>
          <button type="submit">Submit Adoption Request</button>
        </form>
      )}
    </div>
  );
}

export default DogDetails;
