const {addStoreToDatabase, getAllStoresFromDatabase} = require("../models/store");

// Add Store
const addStore = async (req, res) => {
  const storeData = {
    userID: req.body.userId,
    name: req.body.name,
    category: req.body.category,
    address: req.body.address,
    city: req.body.city,
    image: req.body.image
  };

  try {
    const storeId = await addStoreToDatabase(storeData);
    res.status(200).json({ storeId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add store." });
  }
};

// Get All Stores
const getAllStores = async (req, res) => {
  const userId = req.params.userID;

  try {
    const stores = await getAllStoresFromDatabase(userId);
    res.json(stores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get stores." });
  }
};

module.exports = { addStore, getAllStores };
