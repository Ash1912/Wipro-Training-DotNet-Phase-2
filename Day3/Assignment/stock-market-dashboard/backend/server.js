const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

const API_KEY = "FR0TTQD2TYYJKU8J"; // Replace with your API key
const BASE_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";

const stockCache = {}; // Cache stock data to reduce API requests
let previousSearches = [];

app.use(cors());

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("fetchStock", async (symbol) => {
    console.log(`Fetching data for: ${symbol}`);

    if (stockCache[symbol]) {
      console.log(`Serving cached data for ${symbol}`);
      socket.emit("stockData", { stockData: stockCache[symbol], previousSearches });
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}&symbol=${symbol}&apikey=${API_KEY}`);

      if (response.data["Error Message"]) {
        socket.emit("error", "Invalid stock symbol. Please try again.");
        return;
      }

      const timeSeries = response.data["Time Series (Daily)"];
      if (!timeSeries) {
        socket.emit("error", "API limit reached. Please wait a minute.");
        return;
      }

      const stockData = Object.entries(timeSeries).slice(0, 10).map(([date, prices]) => ({
        timestamp: date,
        price: parseFloat(prices["4. close"]),
      }));

      stockCache[symbol] = stockData;
      setTimeout(() => delete stockCache[symbol], 60000);

      previousSearches.push(symbol);
      if (previousSearches.length > 5) previousSearches.shift();

      socket.emit("stockData", { stockData, previousSearches });
    } catch (error) {
      console.error("Error fetching stock data:", error);
      socket.emit("error", "Server error. Please try again later.");
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
