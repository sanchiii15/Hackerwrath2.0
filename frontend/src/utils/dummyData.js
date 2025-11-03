export const dummyPosts = [
  { id: 1, title: "Lost Charger", desc: "Need a charger urgently!", type: "help", location: "Hostel A", upvotes: 3 },
  { id: 2, title: "Unit 3 Notes", desc: "Anyone has notes for Unit 3?", type: "help", location: "Library", upvotes: 5 },
  { id: 3, title: "Retro Games Night", desc: "Planning a pixel game night 🎮", type: "thought", location: "Common Room", upvotes: 8 },
  { id: 4, title: "Broken Wi-Fi", desc: "Wi-Fi not working on 2nd floor", type: "complaint", location: "Hostel B", upvotes: 2 },
  { id: 5, title: "Noisy Construction", desc: "Construction work starting too early in the morning", type: "complaint", location: "Main Building", upvotes: 12 },
  { id: 6, title: "Study Group", desc: "Looking for people to form a study group for finals", type: "help", location: "Library", upvotes: 7 },
  { id: 7, title: "Food Quality", desc: "Cafeteria food quality has declined recently", type: "complaint", location: "Cafeteria", upvotes: 15 },
  { id: 8, title: "Ride Share", desc: "Anyone going to the city center this weekend?", type: "help", location: "Main Gate", upvotes: 4 },
  { id: 9, title: "Movie Night", desc: "Organizing a movie night in the common room", type: "thought", location: "Common Room", upvotes: 6 },
  { id: 10, title: "Broken Elevator", desc: "Elevator in Block C has been out of order for a week", type: "complaint", location: "Block C", upvotes: 9 },
  { id: 11, title: "Textbook Exchange", desc: "Looking to exchange old textbooks for new semester", type: "help", location: "Library", upvotes: 3 },
  { id: 12, title: "Campus Clean-up", desc: "Let's organize a campus clean-up drive!", type: "thought", location: "Campus", upvotes: 11 }
];

export const dummyUsers = [
  { id: 1, name: "Alex Chen", avatar: "🧑‍💻", status: "online" },
  { id: 2, name: "Sarah Kim", avatar: "👩‍🎓", status: "online" },
  { id: 3, name: "Mike Johnson", avatar: "👨‍🔬", status: "away" },
  { id: 4, name: "Emma Wilson", avatar: "👩‍🎨", status: "online" },
  { id: 5, name: "David Lee", avatar: "👨‍🏫", status: "offline" }
];

export const dummyChats = [
  {
    id: 1,
    postId: 1,
    participants: [1, 2],
    messages: [
      { id: 1, senderId: 2, text: "Hi! I have a spare charger you can borrow", timestamp: new Date(Date.now() - 3600000) },
      { id: 2, senderId: 1, text: "That would be amazing! Where can we meet?", timestamp: new Date(Date.now() - 3500000) },
      { id: 3, senderId: 2, text: "I'm in the library right now, ground floor", timestamp: new Date(Date.now() - 3400000) }
    ]
  },
  {
    id: 2,
    postId: 4,
    participants: [1, 3],
    messages: [
      { id: 1, senderId: 3, text: "I'm having the same issue! Have you contacted IT?", timestamp: new Date(Date.now() - 7200000) },
      { id: 2, senderId: 1, text: "Yes, they said they're working on it", timestamp: new Date(Date.now() - 7100000) }
    ]
  }
];
