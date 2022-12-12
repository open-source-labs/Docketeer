const app = require("./app");
const colors = require("colors");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`.green.inverse);
});
