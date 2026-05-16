import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import API from "../services/api";

import MainLayout from "../layouts/MainLayout";

import AddLeadModal from "../components/AddLeadModal";

import EditLeadModal from "../components/EditLeadModal";
import LeadsTableSkeleton from "../components/LeadsTableSkeleton";
import { CSVLink } from "react-csv";

import toast from "react-hot-toast";

interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  status: string;
}

const LeadsPage = () => {
  const [leads, setLeads] = useState<
    Lead[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [showModal, setShowModal] =
    useState(false);

  const [editModal, setEditModal] =
    useState(false);

  const [selectedLead, setSelectedLead] =
    useState<Lead | null>(null);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const leadsPerPage = 5;

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");

      setLeads(res.data.data);
    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to fetch leads"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (
    id: string
  ) => {
    try {
      await API.delete(`/leads/${id}`);

      fetchLeads();

      toast.success(
        "Lead deleted successfully"
      );
    } catch (error) {
      console.log(error);

      toast.error("Delete failed");
    }
  };

  const filteredLeads = leads.filter(
    (lead) => {
      const matchesSearch =
        lead.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        lead.company
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "all" ||
        lead.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  const indexOfLastLead =
    currentPage * leadsPerPage;

  const indexOfFirstLead =
    indexOfLastLead - leadsPerPage;

  const currentLeads =
    filteredLeads.slice(
      indexOfFirstLead,
      indexOfLastLead
    );

  const totalPages = Math.ceil(
    filteredLeads.length /
      leadsPerPage
  );

  const csvData = filteredLeads.map(
    (lead) => ({
      Name: lead.name,
      Email: lead.email,
      Company: lead.company,
      Status: lead.status,
    })
  );

  if (loading) {
  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-6">
          <div className="h-10 w-64 bg-gray-300 rounded animate-pulse"></div>
        </div>

        <LeadsTableSkeleton />
      </div>
    </MainLayout>
  );
}

  return (
    <MainLayout>
      <div className="p-8">
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold">
              Leads Management
            </h1>

            <p className="text-gray-500 mt-2">
              Manage and track your
              sales leads
            </p>
          </div>

          <div className="flex gap-4">
            <CSVLink
              data={csvData}
              filename="gigflow-leads.csv"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-2xl transition"
            >
              Export CSV
            </CSVLink>

            <button
              onClick={() =>
                setShowModal(true)
              }
              className="bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-2xl transition"
            >
              Add Lead
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.1,
          }}
          className="bg-white p-5 rounded-3xl shadow-lg mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <input
              type="text"
              placeholder="Search leads..."
              className="border border-gray-300 p-4 rounded-2xl w-full focus:outline-none focus:ring-2 focus:ring-black"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <select
              className="border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
            >
              <option value="all">
                All
              </option>

              <option value="new">
                New
              </option>

              <option value="qualified">
                Qualified
              </option>

              <option value="lost">
                Lost
              </option>
            </select>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-5">
                    Name
                  </th>

                  <th className="text-left p-5">
                    Email
                  </th>

                  <th className="text-left p-5">
                    Company
                  </th>

                  <th className="text-left p-5">
                    Status
                  </th>

                  <th className="text-left p-5">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentLeads.map(
                  (lead, index) => (
                    <motion.tr
                      key={lead._id}
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          index * 0.05,
                      }}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-5 font-medium text-gray-900 dark:text-white">
                        {lead.name}
                      </td>

                      <td className="p-5 text-gray-600 dark:text-gray-300">
                        {lead.email}
                      </td>

                      <td className="p-5">
                        {lead.company}
                      </td>

                      <td className="p-5">
                        <span
                          className={`
                            px-4 py-2 rounded-full text-sm font-medium
                            ${
                              lead.status ===
                              "qualified"
                                ? "bg-green-100 text-green-700"
                                : lead.status ===
                                  "lost"
                                ? "bg-red-100 text-red-700"
                                : "bg-blue-100 text-blue-700"
                            }
                          `}
                        >
                          {lead.status}
                        </span>
                      </td>

                      <td className="p-5 flex gap-3">
                        <button
                          onClick={() => {
                            setSelectedLead(
                              lead
                            );

                            setEditModal(
                              true
                            );
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              lead._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  )
                )}
              </tbody>
            </table>

            {filteredLeads.length ===
              0 && (
              <div className="p-10 text-center text-gray-500 text-lg">
                No leads found
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          className="flex justify-center gap-4 mt-8"
        >
          <button
            disabled={currentPage === 1}
            onClick={() =>
              setCurrentPage(
                currentPage - 1
              )
            }
            className="bg-black text-white px-5 py-3 rounded-2xl disabled:bg-gray-400 transition"
          >
            Previous
          </button>

          <div className="flex items-center font-semibold text-lg">
            Page {currentPage} of{" "}
            {totalPages || 1}
          </div>

          <button
            disabled={
              currentPage === totalPages ||
              totalPages === 0
            }
            onClick={() =>
              setCurrentPage(
                currentPage + 1
              )
            }
            className="bg-black text-white px-5 py-3 rounded-2xl disabled:bg-gray-400 transition"
          >
            Next
          </button>
        </motion.div>
      </div>

      {showModal && (
        <AddLeadModal
          closeModal={() =>
            setShowModal(false)
          }
          refreshLeads={fetchLeads}
        />
      )}

      {editModal &&
        selectedLead && (
          <EditLeadModal
            lead={selectedLead}
            closeModal={() =>
              setEditModal(false)
            }
            refreshLeads={
              fetchLeads
            }
          />
        )}
    </MainLayout>
  );
};

export default LeadsPage;