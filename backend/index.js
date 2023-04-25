const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const db = require("./config/dbConfig");
const routes = require("./routes/routes");
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "TEST-7169695604884447-042415-6d7143274bedca51c37cbd5d97b33720-1359790312",
});

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use("/api", routes);
app.use("/uploads", express.static("uploads"));
db.mongoose
  .connect(db.url)
  .then(console.log("Conectado a la base de datos."))
  .catch((err) => {
    console.log("Error conectandose a la base de datos! ", err);
    process.exit();
  });

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto + ${PORT}`);
});
