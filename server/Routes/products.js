const express = require("express");
const router = express.Router();
const Product = require("../models/ProductSchema");

// Add a new product
router.post("/products", async (req, res) => {
  const { name, price } = req.body;
  if (!name || !price) {
    res.status(400).json({ message: "Please fill all the fields" });
  } else {
    try {
      const isAlreadyExists = await Product.findOne({ name: name });
      if (isAlreadyExists) {
        res.status(403).json({ message: "Product already exists" });
      } else {
        const newProduct = new Product({
          name,
          price,
        });
        await newProduct.save();
        res
          .status(201)
          .json({ data: newProduct, message: "Product created successfully" });
      }
    } catch (error) {
      res.status(400).json({ message: "Oops, Something went wrong!" });
    }
  }
});

// Fetch all products
router.get("/products", async (req, res) => {
  const productData = await Product.find().select("-__v");
  res.status(200).json({ data: productData });
});

// Fetch individual product
router.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const singleProductData = await Product.findById({ _id: id }).select("-__v");
  singleProductData
    ? res.status(200).json({ data: singleProductData })
    : res.status(400).json({ error: "Oops, Something went wrong!!" });
});

// Update individual product
router.patch("/products/:id", async (req, res) => {
  const { id } = req.params;
  const updatedProductData = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  updatedProductData
    ? res
        .status(200)
        .json({ data: updatedProductData, message: "Product updated successfully" })
    : res.status(400).json({ error: "Oops, Something went wrong!!" });
});

// Delete individual product
router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const deletedProductData = await Product.findByIdAndDelete({ _id: id });
  deletedProductData
    ? res
        .status(200)
        .json({ data: deletedProductData, message: "Product deleted successfully" })
    : res.status(400).json({ error: "Oops, Something went wrong!!" });
});

module.exports = router;
