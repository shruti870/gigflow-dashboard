import { useEffect, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import API from "../services/api";

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#ef4444",
];

const LeadsChart = () => {
  const [data, setData] = useState<
    any[]
  >([]);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");

      const leads = res.data.data;

      const newLeads = leads.filter(
        (lead: any) =>
          lead.status === "new"
      ).length;

      const qualifiedLeads =
        leads.filter(
          (lead: any) =>
            lead.status ===
            "qualified"
        ).length;

      const lostLeads = leads.filter(
        (lead: any) =>
          lead.status === "lost"
      ).length;

      setData([
        {
          name: "New",
          value: newLeads,
        },

        {
          name: "Qualified",
          value: qualifiedLeads,
        },

        {
          name: "Lost",
          value: lostLeads,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        Lead Analytics
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={120}
              label
            >
              {data.map(
                (_: any, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadsChart;
