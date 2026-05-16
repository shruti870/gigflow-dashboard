import { useState } from "react";
import API from "../services/api";
import { addActivity } from "../store/activity";

const EditLeadModal = ({
  lead,
  closeModal,
  refreshLeads,
}: any) => {
  const [formData, setFormData] = useState({
    name: lead.name,
    email: lead.email,
    company: lead.company,
    status: lead.status,
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await API.put(`/leads/${lead._id}`, formData);

      refreshLeads();
      closeModal();

      addActivity(`Lead updated: ${formData.name}`);

      alert("Lead updated");
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          Edit Lead
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            value={formData.name}
            className="w-full border p-2 mb-3"
            onChange={handleChange}
          />

          <input
            name="email"
            value={formData.email}
            className="w-full border p-2 mb-3"
            onChange={handleChange}
          />

          <input
            name="company"
            value={formData.company}
            className="w-full border p-2 mb-3"
            onChange={handleChange}
          />

          <select
            name="status"
            value={formData.status}
            className="w-full border p-2 mb-3"
            onChange={handleChange}
          >
            <option value="new">New</option>
            <option value="qualified">Qualified</option>
            <option value="lost">Lost</option>
          </select>

          <button className="bg-black text-white w-full py-2 rounded">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditLeadModal;