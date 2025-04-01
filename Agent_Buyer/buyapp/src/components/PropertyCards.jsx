import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PropertyCard.css";

const PropertyCards = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/properties/all")
      .then((response) => {
        setProperties(response.data);
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
      });
  }, []);

  const defaultImageUrl = "https://img.freepik.com/free-photo/shiny-night-city_1127-8.jpg?ga=GA1.1.1450957178.1742464976&semt=ais_keywords_boost";

  return (
    <div className="property-section">
      <h3 style={{color:"brown"}}>Available Properties</h3>
      <div className="property-container">
        {properties.length === 0 ? (
          <p className="no-properties">No properties available.</p>
        ) : (
          properties.map((property) => (
            <div key={property.id} className="property-card">
              <img
                src={property.imageUrl || defaultImageUrl}
                alt={property.title}
                className="property-image"
              />
              <div className="property-content">
                <h4 className="property-title">{property.title}</h4>
                <p className="property-desc">{property.description}</p>
                <p className="property-price">Price: ${property.price}</p>
                <p className="property-owner">Owner: {property.ownerName}</p>
                <p className="property-contact">Contact: {property.ownerContact}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PropertyCards;