import { useEffect, useState } from "react";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

import ActivityFeed from "../components/ActivityFeed";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    total: 0,
    qualified: 0,
    lost: 0,
    conversion: 0,
  });

  const fetchStats = async () => {
    try {
      const res = await API.get("/leads");

      const leads = res.data.data;

      const total = leads.length;
      const qualified = leads.filter(
        (l: any) => l.status === "qualified"
      ).length;

      const lost = leads.filter(
        (l: any) => l.status === "lost"
      ).length;

      const conversion =
        total === 0
          ? 0
          : Math.round(
              (qualified / total) * 100
            );

      setStats({
        total,
        qualified,
        lost,
        conversion,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    { title: "Total Leads", value: stats.total },
    { title: "Qualified", value: stats.qualified },
    { title: "Lost", value: stats.lost },
    { title: "Conversion", value: `${stats.conversion}%` },
  ];

  return (
    <MainLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          GigFlow Dashboard
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg"
            >
              <h2 className="text-gray-600 dark:text-gray-300">
                {card.title}
              </h2>

              <p className="text-4xl font-bold mt-3 text-gray-900 dark:text-white">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* ACTIVITY FEED */}
        <div className="mt-8">
          <ActivityFeed />
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;