// In-memory mock users (no passwords, tokens, or DB)
const users = [
  { id: 1, name: 'Retro Admin', email: 'admin@retro.com', coins: 0 }
];

const getNextId = () => {
  if (users.length === 0) return 1;
  return Math.max(...users.map(u => u.id)) + 1;
};

// GET all users
const getUsers = (req, res) => {
  return res.json(users);
};

// POST register mock user: { name, email }
const registerMock = (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const exists = users.some(u => u.email === email);
  if (exists) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const newUser = {
    id: getNextId(),
    name,
    email,
    coins: 0
  };
  users.push(newUser);
  return res.status(201).json({ message: 'User registered successfully', user: newUser });
};

// POST login mock: { email }
const loginMock = (req, res) => {
  const { email } = req.body || {};
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  return res.json({ message: 'Login successful', user });
};

module.exports = { registerMock, loginMock, getUsers };


