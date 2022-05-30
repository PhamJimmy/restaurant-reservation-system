import { useEffect, useState } from "react";
import { listTables } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import Table from "./Table";

function Tables() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTables() {
      const abortController = new AbortController();
      try {
        await setError(null);
        const data = await listTables(abortController.signal);
        setTables(data);
      } catch(error) {
        setError(error);
      }
      return () => abortController.abort();
    }
    loadTables();
  }, []);

  function handleFinish() {
    
  }

  return (
    <>
      <ErrorAlert error={error} />
      <ul>
        {tables.map((table) => <li key={table.table_id}><Table table={table} handleFinish={handleFinish} /></li>)}
      </ul>
    </>
  )
}

export default Tables;