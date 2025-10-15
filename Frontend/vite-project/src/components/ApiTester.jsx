import { useState } from 'react';
import { apiService } from '../services/api';
import DataList from './DataList';
import '../styles/App.css';

const ApiTester = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchId, setSearchId] = useState('');
    const [currentEndpoint, setCurrentEndpoint] = useState('');

    const handleApiCall = async (apiCall, endpointName) => {
        setLoading(true);
        setError('');
        setCurrentEndpoint(endpointName);

        try {
            const result = await apiCall();
            if (result.Status || result.status) {
                setData(Array.isArray(result.Data) ? result.Data :
                    Array.isArray(result.data) ? result.data :
                        result.item ? [result.item] : []);
            } else {
                setError(result.message || 'Error en la respuesta del servidor');
                setData([]);
            }
        } catch (err) {
            setError('Error de conexión: ' + err.message);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchById = () => {
        if (!searchId.trim()) {
            setError('Por favor ingresa un ID');
            return;
        }
        handleApiCall(() => apiService.getItemById(searchId), `Item por ID: ${searchId}`);
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
                            onClick={() => handleApiCall(apiService.getAllData, 'Todos los datos')}
                            className="btn btn-primary"
                        >
                            Obtener Todos los Datos
                        </button>

                        <button
                            onClick={() => handleApiCall(() => apiService.getItemsByStatus('true'), 'Items Activos')}
                            className="btn btn-secondary"
                        >
                            Items Activos
                        </button>

                        <button
                            onClick={() => handleApiCall(() => apiService.getItemsByStatus('false'), 'Items Inactivos')}
                            className="btn btn-secondary"
                        >
                            Items Inactivos
                        </button>
                    </div>
                </div>

                <div className="control-group">
                    <h3>Búsqueda Específica</h3>
                    <div className="search-group">
                        <input
                            type="text"
                            placeholder="Ingresa ID del item..."
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className="search-input"
                        />
                        <button
                            onClick={handleSearchById}
                            className="btn btn-primary"
                        >
                            Buscar por ID
                        </button>
                    </div>
                </div>

                <div className="control-group">
                    <h3>Query Parameters</h3>
                    <div className="button-group">
                        <button
                            onClick={() => handleApiCall(() => apiService.getItemsByQuery('true'), 'Query: Activos')}
                            className="btn btn-outline"
                        >
                            Query - Activos
                        </button>

                        <button
                            onClick={() => handleApiCall(() => apiService.getItemsByQuery('false'), 'Query: Inactivos')}
                            className="btn btn-outline"
                        >
                            Query - Inactivos
                        </button>
                    </div>
                </div>
            </div>

            <DataList
                data={data}
                title={currentEndpoint || 'Selecciona un endpoint'}
                loading={loading}
                error={error}
            />
        </div>
    );
};

export default ApiTester;