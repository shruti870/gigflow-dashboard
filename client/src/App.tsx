import { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    status: "new",
    source: "LinkedIn",
  });

  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDgwOTNlM2ZjMTlmYTViNmE0ODQyZCIsImlhdCI6MTc3ODkxMjA4MSwiZXhwIjoxNzc5NTE2ODgxfQ.iDJdLWE7InL-N4LFdPT1ETtvwaeYUsanETPjthi44j8";

      await axios.post(
        "http://localhost:5000/api/leads",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Lead Added Successfully ✅");

      setFormData({
        name: "",
        email: "",
        company: "",
        status: "new",
        source: "LinkedIn",
      });
    } catch (error) {
      console.log(error);
      setMessage("Error Adding Lead ❌");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>
            GigFlow Dashboard
          </h1>

          <p style={subtitleStyle}>
            Smart Lead Management System
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Lead Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Lead Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="company"
            placeholder="Enter Company Name"
            value={formData.company}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="new">New</option>

            <option value="contacted">
              Contacted
            </option>

            <option value="qualified">
              Qualified
            </option>

            <option value="lost">Lost</option>
          </select>

          <button
            type="submit"
            style={buttonStyle}
          >
            Add New Lead
          </button>
        </form>

        {message && (
          <div style={messageBox}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background:
    "linear-gradient(to right, #4facfe, #00f2fe)",
  padding: "20px",
};

const cardStyle = {
  width: "420px",
  backgroundColor: "white",
  padding: "35px",
  borderRadius: "18px",
  boxShadow:
    "0 10px 25px rgba(0,0,0,0.2)",
};

const headerStyle = {
  textAlign: "center" as const,
  marginBottom: "25px",
};

const titleStyle = {
  margin: 0,
  color: "#007bff",
  fontSize: "32px",
};

const subtitleStyle = {
  marginTop: "8px",
  color: "gray",
  fontSize: "15px",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "18px",
  borderRadius: "10px",
  border: "1px solid #dcdcdc",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box" as const,
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background:
    "linear-gradient(to right, #007bff, #00c6ff)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

const messageBox = {
  marginTop: "20px",
  padding: "12px",
  borderRadius: "8px",
  backgroundColor: "#e8f5e9",
  color: "#2e7d32",
  textAlign: "center" as const,
  fontWeight: "bold",
};

export default App;