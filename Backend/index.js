import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/allData", async (req, res) => {});

app.get("/dataInfo/:idItem", async (req, res) => {});

app.get("/dataInfo/:status", async (req, res) => {});

app.get("/dataInfoQuery", async (req, res) => {});

app.get("/dataInfoQuery", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
