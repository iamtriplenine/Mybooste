export const GUEST_USER = {
  id: "USER",
  name: "User",
  username: "@user",
  initials: "U",
  avatar: "",
  balance: 0,
  currency: "MB",
  notifications: 0,
  level: 0,
  activity: 0,
  ownedProducts: [],
  days: 0,
  joinedAt: "",
  week: [
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
    { active: false },
  ],
};


export const USERS = [


    {
    id: "MB-6677",
    name: "Allan Booster",
    username: "@allanbooster",
    initials: "AB",
    avatar: "",
    balance: 25,
    currency: "MB",
    notifications: 2,
    level: 1,
    activity: 5,
    days: 2,

    ownedProducts: ["PRD-0002", "PRD-0005"],

    
    joinedAt: "20 septembre 2026",
    week: [
      { day: "Lun", date: 19, active: true },
      { day: "Mar", date: 20, active: false },
      { day: "Mer", date: 21, active: false },
      { day: "Jeu", date: 22, active: true, current: true },
      { day: "Ven", date: 23, active: true },
      { day: "Sam", date: 24, active: false },
      { day: "Dim", date: 25, active: false },
    ],
  },
  {
    id: "MB-0001",
    name: "Triple Nine",
    username: "@triplenine",
    initials: "TN",
    avatar: "",
    balance: 999,
    currency: "MB",
    notifications: 2,
    level: 2,
    activity: 30,
    days: 7,
    joinedAt: "20 septembre 2026",
    week: [
      { day: "Lun", date: 19, active: true },
      { day: "Mar", date: 20, active: false },
      { day: "Mer", date: 21, active: false },
      { day: "Jeu", date: 22, active: true, current: true },
      { day: "Ven", date: 23, active: true },
      { day: "Sam", date: 24, active: false },
      { day: "Dim", date: 25, active: false },
    ],
  },




];

export function findUserById(id) {
  return USERS.find(
    (user) => user.id.toLowerCase() === String(id).toLowerCase(),
  );
}