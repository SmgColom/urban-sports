import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express"; 
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";  

dotenv.config();

const typeDefs = `
    type Product {
        id: ID!    
        name: String!
        price: Float!
        category: String!
        image: String
        inStock: Boolean!
    }
        
    type Query {
        products: [Product!]!
        product(id: ID!): Product
    }

    type Mutation {
        createProduct(
        name: String!
        price: Float!
        category: String!
        image: String
        inStock: Boolean!
  ): Product!

        updateProduct(
        id: ID!
        name: String
        price: Float
        category: String
        image: String
        inStock: Boolean
  ): Product
        deleteProduct(id: ID!): Boolean!
}
    `;

const resolvers = {
  Query: {
    products: async () => {
      return await Product.find();
    },
    product: async (parent, args) => {
      return await Product.findById(args.id);
    },
  },
  Mutation: {
    createProduct: async (parent, args) => {
      const newProduct = new Product({
        name: args.name,
        price: args.price,
        category: args.category,
        image: args.image,
        inStock: args.inStock,
      });
      return await newProduct.save();
    },
    updateProduct: async (parent, args) => {
      return await Product.findByIdAndUpdate(args.id, args, { new: true });
    },
    deleteProduct: async (parent, args) => {
      const deleted = await Product.findByIdAndDelete(args.id);
      return deleted !== null;
    },
  },
};

const app = express ();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

async function startServer() {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conectado a MongoDB");
        await server.start();

    app.use("/graphql", cors(), express.json(), expressMiddleware(server));

    app.listen(4000, () => {
        console.log("Servidor listo en http://localhost:4000/graphql");
    });
}

startServer();