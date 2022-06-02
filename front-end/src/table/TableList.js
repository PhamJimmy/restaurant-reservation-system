import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listTables, finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Table from "./Table";

function Tables() {
  const { go } = useHistory();
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTables() {
      const abortController = new AbortController();
      try {
        await setError(null);
        const data = await listTables(abortController.signal);
        setTables(data);
      } catch (error) {
        setError(error);
      }
      return () => abortController.abort();
    }
    loadTables();
  }, []);

  async function handleFinish(table_id) {
    const abortController = new AbortController();
    try {
      if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
        await finishTable(table_id, abortController.signal);
        go(0);
      }
    } catch (error) {
      setError(error);
    }
    return () => abortController.abort();
  }

  return (
    <>
      <ErrorAlert error={error} />
      <ul>
        {tables.map((table) => (
          <li key={table.table_id}>
            <Table table={table} handleFinish={() => handleFinish(table.table_id)} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default Tables;
