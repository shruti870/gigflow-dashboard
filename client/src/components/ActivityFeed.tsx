import { useEffect, useState } from "react";
import { getActivities } from "../store/activity";

const ActivityFeed = () => {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivities([...getActivities()]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-500">No activity yet</p>
      ) : (
        <div className="space-y-3">
          {activities.slice(0, 5).map((act) => (
            <div
              key={act.id}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl"
            >
              <p className="text-sm text-gray-800 dark:text-white">
                {act.message}
              </p>
              <span className="text-xs text-gray-500">
                {act.time}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;