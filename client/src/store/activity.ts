export type Activity = {
  id: number;
  message: string;
  time: string;
};

let activities: Activity[] = [];

export const addActivity = (message: string) => {
  activities.unshift({
    id: Date.now(),
    message,
    time: new Date().toLocaleTimeString(),
  });
};

export const getActivities = () => activities;