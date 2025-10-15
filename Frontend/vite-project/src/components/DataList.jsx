import '../styles/App.css';

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
                        <h3>{item.name || `Item ${item.id}`}</h3>
                        <div className="data-details">
                            <p><strong>ID:</strong> {item.id}</p>
                            <p><strong>Status:</strong> {item.isActive ? 'Activo' : 'Inactivo'}</p>
                            {item.category && <p><strong>Categoría:</strong> {item.category}</p>}
                            {item.description && <p><strong>Descripción:</strong> {item.description}</p>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataList;