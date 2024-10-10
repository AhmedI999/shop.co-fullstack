import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/products", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const fileContent = await fs.readFile("./data/products.json");

  const productData = JSON.parse(fileContent);

  res.status(200).json({ products: productData });
});
app.get("/products/:id", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const fileContent = await fs.readFile("./data/products.json");
  const productData = JSON.parse(fileContent);
  const productId = req.params.id;
  const product = productData.find(p => p.id === productId);

  if (product) res.status(200).json({ product });
  else  res.status(404).json({ message: "Product not found" });
});


app.get("/user-cart", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-cart.json");

  const userCart = JSON.parse(fileContent);

  res.status(200).json({ userCart });
});

app.put("/user-cart", async (req, res) => {
  const productId = req.body.productId;

  const fileContent = await fs.readFile("./data/products.json");
  const productData = JSON.parse(fileContent);

  const product = productData.find((place) => product.id === productId);

  const userProductsFileContent = await fs.readFile("./data/user-products.json");
  const userProductsData = JSON.parse(userProductsFileContent);

  let updatedUserProducts = userProductsData;

  if (!userProductsData.some((p) => p.id === product.id)) {
    updatedUserProducts = [...userProductsData, product];
  }

  await fs.writeFile(
    "./data/user-products.json",
    JSON.stringify(updatedUserProducts)
  );

  res.status(200).json({ userProducts: updatedUserProducts });
});

app.delete("/user-products/:id", async (req, res) => {
  const productId = req.params.id;

  const userProductsFileContent = await fs.readFile("./data/user-products.json");
  const userProductsData = JSON.parse(userProductsFileContent);

  const productIndex = userProductsData.findIndex((product) => product.id === productId);

  let updatedUserProducts = userProductsData;

  if (productIndex >= 0) {
    updatedUserProducts.splice(productIndex, 1);
  }

  await fs.writeFile(
    "./data/user-products.json",
    JSON.stringify(updatedUserProducts)
  );

  res.status(200).json({ userProducts: updatedUserProducts });
});

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);
