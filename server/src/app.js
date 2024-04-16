const express = require("express");
const dotenv = require("dotenv");

const { jwtVerify } = require("@kinde-oss/kinde-node-express");

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const server_url = `${process.env.SERVER_DOMAIN}${port}`;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  // res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const jwtVerifier = jwtVerify(process.env.KINDE_ISSUER_URL, {
  audience: `${server_url}`, // add and audience claim in kinde dashboard so as to verify only request that comes to this server
});

app.get("/api/protected", jwtVerifier, (req, res) => {
  res.json({
    message: "This is a protected stock price data",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${server_url}`);
});
