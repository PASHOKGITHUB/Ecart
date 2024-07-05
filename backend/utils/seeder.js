const products = require("../data/product.json");
const Products = require("../models/productModel");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");

dotenv.config({ path: "backend/config/config.env" });
connectDatabase();

const seedProducts = async () => {
  try {
    await Products.deleteMany();
    console.log("All Products Deleted Successfully");
    await Products.insertMany(products);
    console.log("Products added successfully");
  } catch (err) {
    console.log(err.message);
  }
  process.exit();
};

seedProducts();
