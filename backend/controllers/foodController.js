import fs from 'fs';
import foodModel from '../models/foodModel.js';

// ✅ Add food item
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image file is missing' });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: 'Food Added' });

  } catch (error) {
    console.log('Add Food Error:', error);
    res.status(500).json({ success: false, message: 'Error while adding food' });
  }
};

// ✅ All food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log('List Food Error:', error);
    res.status(500).json({ success: false, message: 'Error while fetching food list' });
  }
};

// ✅ Search food
const searchFood = async (req, res) => {
  try {
    const { query } = req.query; // search text
    const foods = await foodModel.find({
      name: { $regex: query, $options: 'i' } // case-insensitive
    });
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log('Search Food Error:', error);
    res.status(500).json({ success: false, message: 'Error while searching food' });
  }
};

// ✅ Remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res.json({ success: false, message: 'Food not found' });
    }

    fs.unlink(`uploads/${food.image}`, (err) => {
      if (err) console.error('Image delete error:', err.message);
    });

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: 'Food Removed' });

  } catch (error) {
    console.log('Remove Food Error:', error);
    res.status(500).json({ success: false, message: 'Error while removing food' });
  }
};

// ✅ Update food category and price
const updateFood = async (req, res) => {
  const { id, category, price } = req.body;

  try {
    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      { category, price },
      { new: true }
    );

    if (!updatedFood) {
      return res.json({ success: false, message: 'Food not found' });
    }

    res.json({ success: true, message: 'Food Updated' });

  } catch (error) {
    console.log('Update Food Error:', error);
    res.status(500).json({ success: false, message: 'Error while updating food' });
  }
};

export { addFood, listFood, searchFood, removeFood, updateFood };
