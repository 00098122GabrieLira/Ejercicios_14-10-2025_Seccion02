import express from "express";
import cors from "cors";
import { readData } from "./services/dataServices.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.get("/allData", async (req, res) => {
  try {
    const jsonData = await readData();

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

app.get("/dataInfo/item/:idItem", async (req, res) => {
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
      item: item,
      dateTime: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      status: false,
      message: "Error interno del servidor",
      dateTime: new Date().toISOString,
    });
  }
});

app.get("/dataInfo/status/:status", async (req, res) => {
  const { status } = req.params;
  const jsonData = await readData();
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
  const jsonData = await readData();
  const isActive = status === "true";
  const filtered = jsonData.filter(item => item.isActive === isActive);

  res.json({
    status: true,
    data: filtered,
    dateTime: new Date().toISOString(),
  });
});


app.get("/dataInfoQuery", async (req, res) => { });

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});