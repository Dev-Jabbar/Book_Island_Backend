import express from "express";
import cors from "cors";

import routes from "./routes";

const app = express();
app.use(express.json());
const port = 3000;

app.use(cors());
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
