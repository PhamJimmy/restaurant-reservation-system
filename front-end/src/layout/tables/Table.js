

function Table({ table, handleFinish }) {
  
  return (
    <>
      <h5>{table.table_name}</h5>
      <p>Capacity: {table.capacity}</p>
      <p data-table-id-status={table.table_id}>{table.status}</p>
      {table.status === "occupied" ? <button data-table-id-finish={table.table_id} onClick={handleFinish}>Finish</button> : <></>}
    </>
  );
}

export default Table;