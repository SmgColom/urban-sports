// Server/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  { name: "Hoodie Comuna Black",      price: 189900, category: "hoodies",  image: "", inStock: true },
  { name: "Hoodie Metrocable Orange", price: 199900, category: "hoodies",  image: "", inStock: true },
  { name: "Jogger Loma Tech",         price: 159900, category: "joggers",  image: "", inStock: true },
  { name: "Jogger Cargo Paisa",       price: 174900, category: "joggers",  image: "", inStock: false },
  { name: "Top Deportivo Pasarela",   price: 89900,  category: "tops",     image: "", inStock: true },
  { name: "Camiseta Actitud",         price: 79900,  category: "camisetas", image: "", inStock: true },
  { name: "Gorra Corona Urban",       price: 69900,  category: "gorras",   image: "", inStock: true },
  { name: "Chaqueta Concreto",        price: 249900, category: "chaquetas", image: "", inStock: true },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a MongoDB");

    await Product.deleteMany({});
    console.log("Colección de productos limpiada");

    const created = await Product.insertMany(products);
    console.log(`${created.length} productos insertados`);
  } catch (error) {
    console.error("Error en el seed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Desconectado de MongoDB");
  }
}

seed();