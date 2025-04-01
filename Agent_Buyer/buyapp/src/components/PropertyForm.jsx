import React, { useState } from "react";
import axios from "axios";
import { FaHome, FaDollarSign, FaUser, FaPhone, FaAlignLeft } from "react-icons/fa";
import "../styles/PropertyForm.css"; // Import CSS file

const PropertyForm = ({ agentId }) => {
  const [property, setProperty] = useState({
    title: "",
    description: "",
    price: "",
    ownerName: "",
    ownerContact: "",
  });

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:8080/api/properties/add", {
        title: property.title,
        description: property.description,
        price: Number(property.price),
        agentId: Number(agentId),
        ownerName: property.ownerName,
        ownerContact: property.ownerContact,
      });
  
      if (response.status === 200) {
        alert("Property Added Successfully!");
        setProperty({ title: "", description: "", price: "", ownerName: "", ownerContact: "" });
      } else {
        alert("Failed to add property!");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      alert("Error adding property! Check console for details.");
    }
  };

  return (
    <div className="property-form-container">
      <h3 className="form-title">🏡 Add Property</h3>
      <form onSubmit={handleSubmit} className="property-form">
        <div className="input-group">
          <FaHome className="input-icon" />
          <input type="text" name="title" placeholder="Property Title" value={property.title} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaAlignLeft className="input-icon" />
          <input type="text" name="description" placeholder="Description" value={property.description} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaDollarSign className="input-icon" />
          <input type="number" name="price" placeholder="Price" value={property.price} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input type="text" name="ownerName" placeholder="Owner Name" value={property.ownerName} onChange={handleChange} required />
        </div>

        <div className="input-group">
          <FaPhone className="input-icon" />
          <input type="text" name="ownerContact" placeholder="Owner Contact" value={property.ownerContact} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-button">📌 Add Property</button>
      </form>
    </div>
  );
};

export default PropertyForm;
