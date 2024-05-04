const purchaseModel = require("../models/purchase");
const purchaseStock = require("./purchaseStock");

const addPurchase = async (req, res) => {
    const { userID, productID, productName,quantityPurchased, purchaseDate, totalPurchaseAmount } = req.body;
    try {
        await purchaseModel.addPurchaseToDatabase(userID, productID, productName,quantityPurchased, purchaseDate, totalPurchaseAmount);
        await purchaseStock(productID, quantityPurchased);
        res.status(200).send("Purchase added successfully");
    } catch (error) {
        console.error('Error adding purchase:', error);
        res.status(500).send("Failed to add purchase.");
    }
};

const getPurchaseData = async (req, res) => {
    const userID = req.params.userID;
    try {
        const purchaseData = await purchaseModel.getPurchaseDataFromDatabase(userID);
        res.json(purchaseData);
    } catch (error) {
        console.error('Error getting purchase data:', error);
        res.status(500).send("Failed to retrieve purchase data.");
    }
};

const getTotalPurchaseAmount = async (req, res) => {
    const userID = req.params.userID;
    try {
        const totalPurchaseAmount = await purchaseModel.getTotalPurchaseAmountFromDatabase(userID);
        res.json({ totalPurchaseAmount });
    } catch (error) {
        console.error('Error getting total purchase amount:', error);
        res.status(500).send("Failed to retrieve total purchase amount.");
    }
};

module.exports = { addPurchase, getPurchaseData, getTotalPurchaseAmount };
