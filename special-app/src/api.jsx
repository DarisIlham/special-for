// src/api.js
const API_BASE_URL = 'http://localhost:5000/api'; // Adjust if your backend is hosted elsewhere

export const fetchWishes = async () => {
  const response = await fetch(`${API_BASE_URL}/wishes`);
  if (!response.ok) {
    throw new Error('Failed to fetch wishes');
  }
  return await response.json();
};

export const createWish = async (wishData) => {
  const response = await fetch(`${API_BASE_URL}/wishes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: wishData.text }) // Match your backend model
  });
  if (!response.ok) {
    throw new Error('Failed to create wish');
  }
  return await response.json();
};

// Add other CRUD operations as needed (update, delete)