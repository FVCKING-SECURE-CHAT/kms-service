import express from "express";

import prisma from "../prisma/prisma";
import { usersRouter } from "./routes/users";
import { keysRouter } from "./routes/keys";

const isDevelopment = process.env.NODE_ENV !== "production";
const PORT = 5050;

const app = express();
app.use(express.json());

app.use("/users", usersRouter);
// currently we dont neet this shit. Cause user and user keys route is enough for us.
// app.use('/keys', keysRouter);

app.listen(PORT, () => {
  if (isDevelopment) console.log(`Server running on http://localhost:${PORT}`);
  else console.log(`Server running on http://kms-service:${PORT}`);
});
