import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

const readData = async () => {
  const filePath = path.join(__dirname, "data.json");
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
};

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

app.get("/dataInfo/:idItem", async (req, res) => {
  try {
    const { idItem } = req.params;
    const jsonData = await readData();

    const item = jsonData.find(obj => String(obj.id) === String(idItem));

    if (!item) {
      return res.status(404).json({
        status: false,
        message: `No se encontró ningún elemento con id ${idItem}`,
        dateTime: new Date().toISOString(),
      });
    }

    res.json({
      status: true,
      item,
      yyyyyyyyy,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: false,
      message: "Error interno del servidor",
      dateTime: new Date(),
    });
  }
});

app.get("/dataInfo/:status", (req, res) => {
  const { status } = req.params;
  const data = fs.readFileSync("./data.json", "utf8"); 
  const jsonData = JSON.parse(data);
  const isActive = status === "true";
  const filtered = jsonData.filter(item => item.isActive === isActive);

  res.json({
    status: true,
    data: filtered,
    dateTime: new Date(),
  });
});

app.get("/dataInfoQuery", async (req, res) => {
  const { status } = req.query;
  const data = await fs.promises.readFile(path.join(__dirname, 'data.json'), 'utf8');
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

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});

app.get("/dataInfoQuery", async (req, res) => {
  const { status } = req.query;
  const data = await fs.promises.readFile(path.join(__dirname, 'data.json'), 'utf8');
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

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});