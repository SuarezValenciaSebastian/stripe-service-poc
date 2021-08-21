import express from "express";
import cors from "cors";
import modules from "./src/modules";

const PORT = process.env.PORT ?? 1337;

const app = express();

app.use(express.json())
app.use(cors());

app.get("/health", (_request, response) => {
  response.json({
    message: "OK",
    uptime: process.uptime(),
  });
});

app.use(modules);

app.listen(PORT, () => {
  console.log(`[Info] App: Listening on port ${PORT}`);
});
