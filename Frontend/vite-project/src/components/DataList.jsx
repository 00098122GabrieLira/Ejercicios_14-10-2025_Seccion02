import "../styles/App.css";

const DataList = ({ data, title, loading, error }) => {
  if (loading) {
    return (
      <div className="data-container">
        <h2>{title}</h2>
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="data-container">
        <h2>{title}</h2>
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="data-container">
        <h2>{title}</h2>
        <div className="no-data">No hay datos para mostrar</div>
      </div>
    );
  }

  return (
    <div className="data-container">
      <h2>{title}</h2>
      <div className="data-grid">
        {data.map((item) => (
          <div key={item.id} className="data-card">
            {/* Mostrar imagen */}
            {item.picture && (
              <div className="book-image">
                <img
                  src={item.picture}
                  alt={item.nameBook || `Libro ${item.id}`}
                />
              </div>
            )}

            <h3>{item.nameBook || `Item ${item.id}`}</h3>

            <div className="data-details">
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={
                    item.isActive ? "status-active" : "status-inactive"
                  }
                >
                  {item.isActive ? " Activo" : " Inactivo"}
                </span>
              </p>

              {/*Mostrar género*/}
              {item.gender && (
                <p>
                  <strong>Género:</strong> {item.gender}
                </p>
              )}

              {/*Mostrar fecha de publicación*/}
              {item.datePublish && (
                <p>
                  <strong>Fecha Publicación:</strong> {item.datePublish}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataList;
