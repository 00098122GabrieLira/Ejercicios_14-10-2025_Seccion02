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
      dateTime: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      Status: false,
      message: "Error interno del servidor",
      dateTime: new Date().toISOString(),
    });
  }
});

app.get("/dataInfo/item/:idItem", async (req, res) => {
  try {
    const { idItem } = req.params;
    const jsonData = await readData();

    const item = jsonData.find((obj) => String(obj.id) === String(idItem));

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
  try {
    const { status } = req.params;
    const jsonData = await readData();
    const isActive = status === "true";
    const filtered = jsonData.filter((item) => item.isActive === isActive);

    res.json({
      status: true,
      data: filtered,
      dateTime: new Date(),
    });
  } catch (error) {
    console.error("Error en /dataInfo/status:", error);
    res.status(500).json({
      status: false,
      message: "Error interno del servidor",
      dateTime: new Date().toISOString(),
    });
  }
});

app.get("/dataInfoQuery", async (req, res) => {
  try {
    const { status } = req.query;
    const jsonData = await readData();
    const isActive = status === "true";
    const filtered = jsonData.filter((item) => item.isActive === isActive);

    res.json({
      status: true,
      data: filtered,
      dateTime: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error en /dataInfoQuery:", error);
    res.status(500).json({
      status: false,
      message: "Error interno del servidor",
      dateTime: new Date().toISOString(),
    });
  }
});

app.get("/dataInfoQueryMulti", async (req, res) => {
  try {
    const { status, gender, datePublish, nameBook } = req.query;
    const jsonData = await readData();

    let filteredData = [...jsonData];

    if (status !== undefined) {
      const isActive = status === "true";
      filteredData = filteredData.filter((item) => item.isActive === isActive);
    }

    if (gender) {
      filteredData = filteredData.filter((item) =>
        item.gender.toLowerCase().includes(gender.toLowerCase())
      );
    }

    if (datePublish) {
      filteredData = filteredData.filter(
        (item) => item.datePublish === datePublish
      );
    }

    if (nameBook) {
      filteredData = filteredData.filter((item) =>
        item.nameBook.toLowerCase().includes(nameBook.toLowerCase())
      );
    }

    res.json({
      Status: true,
      data: filteredData,
      dateTime: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      Status: false,
      message: "Error interno del servidor",
      dateTime: new Date().toISOString(),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
