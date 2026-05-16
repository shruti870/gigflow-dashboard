import { useState } from "react";
import API from "../services/api";
import { addActivity } from "../store/activity";

const AddLeadModal = ({
  closeModal,
  refreshLeads,
}: {
  closeModal: () => void;
  refreshLeads: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    status: "new",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post("/leads", formData);

      refreshLeads();
      closeModal();

      addActivity(`New lead created: ${formData.name}`);

      alert("Lead created");
    } catch (error) {
      console.log(error);
      alert("Failed to add lead");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          Add Lead
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            className="w-full border p-2 mb-3"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full border p-2 mb-3"
            onChange={handleChange}
          />

          <input
            name="company"
            placeholder="Company"
            className="w-full border p-2 mb-3"
            onChange={handleChange}
          />

          <button className="bg-black text-white w-full py-2 rounded">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;