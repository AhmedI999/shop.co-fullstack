import fs from "node:fs/promises";

import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


app.get("/products", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const fileContent = await fs.readFile("./data/products.json");

  const productData = JSON.parse(fileContent);

  res.status(200).json({ products: productData });
});
app.get("/products/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Methods", "GET");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const fileContent = await fs.readFile("./data/products.json");
  const productData = JSON.parse(fileContent);
  const productId = req.params.id;
  const product = productData.find(p => p.id === productId);

  if (product) res.status(200).json({ product });
  else  res.status(404).json({ message: "Product not found" });
});

app.delete("/user-cart/:id", async (req, res) => {
  res.setHeader("Access-Control-Allow-Methods", "DELETE");
  const productId = req.params.id;
  // Read the user cart data
  const userCartFileContent = await fs.readFile("./data/user-cart.json");
  const userCartData = JSON.parse(userCartFileContent);

  // Find the product to delete
  const updatedCart = userCartData.filter(p => p.id !== productId);

  // If no changes were made (product not found), return an error
  if (userCartData.length === updatedCart.length) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  // Write the updated cart back to the file
  await fs.writeFile(
      "./data/user-cart.json",
      JSON.stringify(updatedCart)
  );

  res.status(200).json({ message: "Product removed", userCart: updatedCart });
});

app.delete("/user-cart", async (req, res) => {
  res.setHeader("Access-Control-Allow-Methods", "DELETE");
  try {
    // Clear the user cart by writing an empty array to the user-cart.json file
    await fs.writeFile("./data/user-cart.json", JSON.stringify([]));

    res.status(200).json({ message: "Cart cleared successfully."});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to clear the cart." });
  }
});

app.get("/user-cart", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-cart.json");
  const userCart = JSON.parse(fileContent);
  res.status(200).json({ products: userCart });
});

app.put("/user-cart", async (req, res) => {
  const { productId, amount, chosenColors, isUpdate } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount." });
  }

  const fileContent = await fs.readFile("./data/products.json");
  const productData = JSON.parse(fileContent);

  const product = productData.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found." });
  }

  const userProductsFileContent = await fs.readFile("./data/user-cart.json");
  const userProductsData = JSON.parse(userProductsFileContent);

  // Check if the product already exists in the cart
  let updatedUserProducts = userProductsData.map((p) => {
    if (p.id === product.id) {
      return {
        ...p,
        amount: !isUpdate ? +amount : p.amount + +amount,  // Update or increment the amount based on `isUpdate`
        details: {
          ...p.details,
          colors: chosenColors,  // Update colors
        },
      };
    }
    return p;
  });

  // If the product doesn't exist in the cart, add it with the specified amount
  if (!userProductsData.some((p) => p.id === product.id)) {
    updatedUserProducts = [...userProductsData, { ...product, amount: +amount }];
  }

  // Write the updated user products back to the file
  await fs.writeFile("./data/user-cart.json", JSON.stringify(updatedUserProducts));

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
