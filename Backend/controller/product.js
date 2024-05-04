const {addProductToDatabase,getAllProductsFromDatabase, updateProductInDatabase, searchProductsInDatabase} = require("../models/product");

// Add Product
const addProduct = async (req, res) => {
  const productData = {
    userID: req.body.userId,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    stock: 0,
    description: req.body.description,
  };

  try {
    const productId = await addProductToDatabase(productData);
    res.status(200).json({ productId });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Failed to add product." });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  const userId = req.params.userId;
  
  try {
    const products = await getAllProductsFromDatabase(userId);
    res.json(products);
  } catch (error) {
    console.error("Error getting products:", error);
    res.status(500).json({ message: "Failed to get products." });
  }
};

// Delete Selected Product
const deleteSelectedProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    await deleteProductFromDatabase(productId);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Failed to delete product." });
  }
};

// Update Selected Product
const updateSelectedProduct = async (req, res) => {
  const productData = {
    productId: req.body.productID,
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    description: req.body.description,
  };

  try {
    const updatedProduct = await updateProductInDatabase(productData);
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Failed to update product." });
  }
};

// Search Products
const searchProduct = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  
  try {
    const products = await searchProductsInDatabase(searchTerm);
    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Failed to search products." });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteSelectedProduct,
  updateSelectedProduct,
  searchProduct,
};
