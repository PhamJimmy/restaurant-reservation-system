import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, readReservation, seatTable } from "../utils/api";

function Seat() {
  const { reservationId } = useParams();
  const { push, goBack } = useHistory();
  const [reservation, setReservation] = useState({});
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState({});
  const [error, setError] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables);
    return () => abortController.abort();
  }
  
  useEffect(loadReservation, [reservationId]);

  function loadReservation() {
    const abortController = new AbortController();
    readReservation(reservationId, abortController.signal).then(setReservation);
    return () => abortController.abort();
  }

  function handleChange({ target }) {
    setTableId(target.value);
  }

  async function handleSubmit(e) {
    const abortController = new AbortController();
    try {
      e.preventDefault();
      await setError(null);
      await seatTable(reservationId, parseInt(tableId), abortController.signal)
      push("/dashboard");
    } catch(error) {
      setError(error);
    }
    return () => abortController.abort();
  }

  function handleCancel() {
    goBack();
  }

  return reservation.first_name ? (
    <form onSubmit={handleSubmit}>
      <h1>
        Select seating for {reservation.first_name} {reservation.last_name}'s reservation
      </h1>
      <h3>Party size: {reservation.people}</h3>
      <ErrorAlert error={error} />
      {tables.length ? (
        <>
          <label htmlFor="table">Select A Table: </label>
          <select value={tableId} onChange={handleChange} name="table_id" required={true}>
            <option value="">None selected</option>
            {tables.map((thisTable) => {
              return (
                <option value={thisTable.table_id} key={thisTable.table_id}>
                  {thisTable.table_name} - {thisTable.capacity}
                </option>
              );
            })}
          </select>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button type="button" className="btn btn-secondary ml-2" onClick={handleCancel}>
            Cancel
          </button>
        </>
      ) : (
        <p>Loading tables...</p>
      )}
    </form>
  ) : (
    <p>Loading reservation...</p>
  );
}

export default Seat;
