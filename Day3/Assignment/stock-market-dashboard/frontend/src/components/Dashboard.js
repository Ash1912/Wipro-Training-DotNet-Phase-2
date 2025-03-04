import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import io from "socket.io-client";
import StockChart from "./StockChart";
import PreviousSearches from "./PreviousSearches";

const socket = io("http://localhost:5000");

const Dashboard = () => {
  const [symbol, setSymbol] = useState("");
  const [stockData, setStockData] = useState([]);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("stockData", ({ stockData, previousSearches }) => {
      setStockData(stockData);
      setPreviousSearches(previousSearches);
      setError("");
    });

    socket.on("error", (message) => {
      setError(message);
      setStockData([]);
    });

    return () => socket.disconnect();
  }, []);

  const fetchStock = () => {
    if (!symbol) {
      setError("Please enter a stock symbol.");
      return;
    }
    socket.emit("fetchStock", symbol.toUpperCase());
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">📈 Stock Market Dashboard</h2>
      <Form>
        <Form.Group>
          <Form.Label>Enter Stock Symbol</Form.Label>
          <Form.Control 
            type="text" 
            value={symbol} 
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="e.g. AAPL, TSLA, MSFT"
          />
        </Form.Group>
        <Button className="mt-2" onClick={fetchStock} variant="primary">Fetch</Button>
      </Form>

      {error && <Alert className="mt-3" variant="danger">{error}</Alert>}

      {stockData.length > 0 && <StockChart stockData={stockData} />}
      <PreviousSearches searches={previousSearches} />
    </Container>
  );
};

export default Dashboard;
