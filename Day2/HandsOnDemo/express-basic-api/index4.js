const express = require("express"); //require express
const app = express(); //create the app
const products = require("./product")
app.use(express.json());
app.get("/", (req, res) => {
  res.send(`Hello World`);
}); // send a response to the client

app.get("/api/products", (req, res) => {
    //code to be executed
      const newProduct = products.map((product) => {
        const { id, name, price } = product;
        return {
          id,
          name,
          price,
        };
      });
      res.json(newProduct);
    });
    app.post("/api/products/new", (req, res) => {
        //accessed the data using the req.body
          res.send({ success: true, data: [...products, req.body] });
        });

        app.put("/api/products/:id", (req, res) => {
            //get the id of the item to update
            const { id } = req.params;
            //get the value in the request body
            const { name } = req.body;
          
            //updating the item
            const updatedProducts = products.map((product) => {
              if (product.id === Number(id)) {
                product.name = name;
              }
              return product;
            });
          
            res.send({ success: true, data: [...updatedProducts] });
          });

          app.delete("/api/products/:id", (req, res) => {
            const { id } = req.params;
          
            const filteredProducts = products.filter(
              (product) => product.id !== Number(id)
            );
            return res.json({ success: true, data: filteredProducts });
          });

          
app.listen(8000, () => {
  console.log("App has started and running ");
}); 
