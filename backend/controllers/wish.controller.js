import Wish from "../models/wish.model.js";

// Create a new wish
export async function createWish(req, res) {
  try {
    const wish = new Wish({
      description: req.body.description,
    });
    await wish.save();
    res.status(201).json(wish);
  } catch (err) {
    res.status(500).json({ error: "Failed to create wish." });
  }
}

// Get all wishes
export async function getWishes(req, res) {
  try {
    const wishes = await Wish.find().sort({ createdAt: -1 });
    res.json(wishes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wishes." });
  }
}

// Update a wish by ID
export async function updateWish(req, res) {
  try {
    const wish = await Wish.findByIdAndUpdate(
      req.params.id,
      { description: req.body.description },
      { new: true }
    );

    if (!wish) {
      return res.status(404).json({ error: "Wish not found." });
    }

    res.json(wish);
  } catch (err) {
    res.status(500).json({ error: "Failed to update wish." });
  }
}

// Delete a wish by ID
export async function deleteWish(req, res) {
  try {
    const deleted = await Wish.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Wish not found." });
    }
    res.json({ message: "Wish deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete wish." });
  }
}