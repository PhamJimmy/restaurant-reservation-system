function Table({ table, handleFinish }) {
  const { table_name, status, capacity } = table;

  const badge = {
    free: "badge-primary",
    occupied: "badge-light",
  };

  return (
    <div className="card mb-1">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <p className="card-title">{table_name}</p>
          <p className="card-title">
            <span className="status">Status:</span> <span className={`badge ${badge[status]}`}>{status}</span>
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="card-text">Capacity: {capacity}</p>
          {table.status === "occupied" ? (
            <button
              type="button"
              className="btn btn-primary"
              data-table-id-finish={table.table_id}
              onClick={handleFinish}
            >
              Finish
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Table;
