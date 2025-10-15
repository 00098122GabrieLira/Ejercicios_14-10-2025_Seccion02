import { useState, useRef, useEffect } from "react";
import { apiService } from "../services/api";
import DataList from "./DataList";
import "../styles/App.css";

const ApiTester = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState("");
  const [currentEndpoint, setCurrentEndpoint] = useState("");

  // Estados para múltiples parámetros
  const [multiParams, setMultiParams] = useState({
    status: "",
    gender: "",
    datePublish: "",
    nameBook: "",
  });

  // Referencia para el scroll
  const resultsRef = useRef(null);

  useEffect(() => {
    if (data.length > 0 && !loading && !error) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [data, loading, error]);

  const handleApiCall = async (apiCall, endpointName) => {
    setLoading(true);
    setError("");
    setCurrentEndpoint(endpointName);

    try {
      const result = await apiCall();
      if (result.Status || result.status) {
        setData(
          Array.isArray(result.Data)
            ? result.Data
            : Array.isArray(result.data)
            ? result.data
            : result.item
            ? [result.item]
            : []
        );
      } else {
        setError(result.message || "Error en la respuesta del servidor");
        setData([]);
      }
    } catch (err) {
      setError("Error de conexión: " + err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchById = () => {
    if (!searchId.trim()) {
      setError("Por favor ingresa un ID");
      return;
    }
    handleApiCall(
      () => apiService.getItemById(searchId),
      `Item por ID: ${searchId}`
    );
  };

  // Manejar búsqueda con múltiples parámetros
  const handleMultiQuerySearch = () => {
    // Validar que al menos un parámetro esté presente
    const hasParams = Object.values(multiParams).some((value) => value !== "");
    if (!hasParams) {
      setError("Por favor ingresa al menos un parámetro de búsqueda");
      return;
    }

    const paramDescription = Object.entries(multiParams)
      .filter(([_, value]) => value !== "")
      .map(([key, value]) => `${key}=${value}`)
      .join(" & ");

    handleApiCall(
      () => apiService.getItemsByMultiQuery(multiParams),
      `Búsqueda Multi: ${paramDescription}`
    );
  };

  const handleMultiParamChange = (field, value) => {
    setMultiParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearMultiParams = () => {
    setMultiParams({
      status: "",
      gender: "",
      datePublish: "",
      nameBook: "",
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchById();
    }
  };

  return (
    <div className="api-tester">
      <header className="app-header">
        <h1>API Tester</h1>
      </header>

      <div className="controls-container">
        <div className="control-group">
          <h3>Endpoints</h3>
          <div className="button-group">
            <button
              onClick={() =>
                handleApiCall(apiService.getAllData, "Todos los datos")
              }
              className="btn btn-primary"
            >
              Obtener Todos los Datos
            </button>

            <button
              onClick={() =>
                handleApiCall(
                  () => apiService.getItemsByStatus("true"),
                  "Items Activos"
                )
              }
              className="btn btn-secondary"
            >
              Items Activos
            </button>

            <button
              onClick={() =>
                handleApiCall(
                  () => apiService.getItemsByStatus("false"),
                  "Items Inactivos"
                )
              }
              className="btn btn-secondary"
            >
              Items Inactivos
            </button>
          </div>
        </div>

        <div className="control-group">
          <h3>Búsqueda por ID</h3>
          <div className="search-group">
            <input
              type="text"
              placeholder="Ingresa ID del item..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyDown={handleKeyPress}
              className="search-input"
            />
            <button onClick={handleSearchById} className="btn btn-primary">
              Buscar
            </button>
          </div>
        </div>

        <div className="control-group">
          <h3>Query Parameters</h3>
          <div className="button-group">
            <button
              onClick={() =>
                handleApiCall(
                  () => apiService.getItemsByQuery("true"),
                  "Query: Activos"
                )
              }
              className="btn btn-outline"
            >
              Query - Activos
            </button>

            <button
              onClick={() =>
                handleApiCall(
                  () => apiService.getItemsByQuery("false"),
                  "Query: Inactivos"
                )
              }
              className="btn btn-outline"
            >
              Query - Inactivos
            </button>
          </div>
        </div>

        <div className="control-group">
          <h3>Búsqueda Avanzada (Múltiples Parámetros)</h3>
          <div className="multi-params-group">
            <div className="param-row">
              <label>Estado:</label>
              <select
                value={multiParams.status}
                onChange={(e) =>
                  handleMultiParamChange("status", e.target.value)
                }
                className="param-input"
              >
                <option value="">Todos los estados</option>
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>
            </div>

            <div className="param-row">
              <label>Género:</label>
              <input
                type="text"
                placeholder="Ej: suspenso, terror..."
                value={multiParams.gender}
                onChange={(e) =>
                  handleMultiParamChange("gender", e.target.value)
                }
                className="param-input"
              />
            </div>

            <div className="param-row">
              <label>Fecha Publicación:</label>
              <input
                type="date"
                value={multiParams.datePublish}
                onChange={(e) =>
                  handleMultiParamChange("datePublish", e.target.value)
                }
                className="param-input"
              />
            </div>

            <div className="param-row">
              <label>Nombre Libro:</label>
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={multiParams.nameBook}
                onChange={(e) =>
                  handleMultiParamChange("nameBook", e.target.value)
                }
                className="param-input"
              />
            </div>

            <div className="button-group">
              <button
                onClick={handleMultiQuerySearch}
                className="btn btn-primary"
              >
                Búsqueda Avanzada
              </button>
              <button onClick={clearMultiParams} className="btn btn-outline">
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={resultsRef}>
        <DataList
          data={data}
          title={currentEndpoint || "Selecciona un endpoint"}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default ApiTester;