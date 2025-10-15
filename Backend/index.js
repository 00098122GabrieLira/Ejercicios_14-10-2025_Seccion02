import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));

app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/allData", async (req, res) => {
  try {
    const data = await fs.promises.readFile(path.join(__dirname, 'data.json'), 'utf8');
    const jsonData = JSON.parse(data);

    res.json({
      Status: true,
      Data: jsonData,
      dateTime: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      Status: false,
      message: "Error interno del servidor",
      dateTime: new Date().toISOString()
    });
  }
});

app.get("/dataInfo/:idItem", async (req, res) => { });

app.get("/dataInfo/:status", (req, res) => {
  const { status } = req.params;
  const data = fs.readFileSync("./data.json", "utf8"); 
  const jsonData = JSON.parse(data);
  const isActive = status === "true";
  const filtered = jsonData.filter(item => item.isActive === isActive);

  res.json({
    status: true,
    data: filtered,
    dateTime: new Date().toLocaleString(),
  });
});

app.get("/dataInfoQuery", async (req, res) => { });

app.get("/dataInfoQuery", async (req, res) => { });

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
