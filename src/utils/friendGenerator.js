const firstNames = [
  "Fahim", "Nabila", "Tanvir", "Sumaiya", "Rafi", "Maliha", "Sabbir", "Tanjina",
  "Shuvo", "Farzana", "Arif", "Mitu", "Sakib", "Priyanka", "Imran", "Laboni"
];

const lastNames = [
  "Ahmed", "Islam", "Rahman", "Akter", "Hasan", "Khan", "Hossain", "Begum",
  "Chowdhury", "Sultana", "Karim", "Parvin", "Mollah", "Das", "Kabir", "Jahan"
];

const tagOptions = [
  ["work", "startup"],
  ["family"],
  ["work", "design"],
  ["hobby", "travel"],
  ["college", "close friend"],
  ["basketball", "neighborhood"],
  ["volunteer", "community"],
  ["book club", "travel"],
  ["former manager", "career"],
  ["fitness", "running"],
  ["music", "friends"],
  ["mentor", "career"],
  ["research", "friend"],
  ["cycling", "weekend"],
  ["school", "mentor"],
  ["work", "engineering"]
];

const bios = [
  "School friend from Dhaka, always up for a cricket match in the park.",
  "My cousin who makes the best pitha during winter.",
  "University roommate and tech enthusiast, now working in Chattogram.",
  "Colleague from my first job, loves Rabindra Sangeet.",
  "Neighbor who helps organize Pohela Boishakh events.",
  "Batchmate from BUET, now a software engineer in Gulshan.",
  "We met at a book fair and share a love for Humayun Ahmed novels.",
  "Family friend who runs a small bakery in Sylhet.",
  "My mentor for university admission tests, always supportive.",
  "Cycling partner for Friday morning rides around Hatirjheel.",
  "We play badminton together every winter.",
  "Close friend from coaching center, now studying abroad.",
  "We volunteer together at a local orphanage.",
  "My go-to person for travel plans in Bangladesh.",
  "Debate club teammate from school days.",
  "Always ready to help with any computer problem."
];

const statuses = ["on-track", "almost due", "overdue"];

function getStatus(daysSinceContact, goal) {
  const ratio = daysSinceContact / goal;
  if (ratio >= 1) return "overdue";
  if (ratio >= 0.7) return "almost due";
  return "on-track";
}

function generateFriends(count = 16) {
  const friends = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    const goal = 21 + Math.floor(Math.random() * 15); // 21-35 days
    const daysSinceContact = Math.floor(Math.random() * 70) + 1; // 1-70 days
    const status = getStatus(daysSinceContact, goal);
    
    const nextDueDate = new Date(today);
    nextDueDate.setDate(nextDueDate.getDate() + (goal - daysSinceContact));
    
    const gender = i % 2 === 0 ? "men" : "women";
    const portraitId = 10 + i;
    
    friends.push({
      id: i + 1,
      name: `${firstNames[i]} ${lastNames[i]}`,
      picture: `https://randomuser.me/api/portraits/${gender}/${portraitId}.jpg`,
      email: `${firstNames[i].toLowerCase()}.${lastNames[i].toLowerCase()}@example.com`,
      days_since_contact: daysSinceContact,
      status: status,
      tags: tagOptions[i],
      bio: bios[i],
      goal: goal,
      next_due_date: nextDueDate.toISOString().split("T")[0]
    });
  }
  
  return friends;
}

export default generateFriends;