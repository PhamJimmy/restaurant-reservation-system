import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "./TableForm";

function CreateTable() {
  const { push, goBack } = useHistory();
  const [error, setError] = useState(null);

  const initialForm = {
    table_name: "",
    capacity: 0,
    reservation_id: null,
  };
  const [form, setForm] = useState(initialForm);

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.name === "capacity" ? Number(target.value) : target.value });
  };

  const handleSubmit = async (e) => {
    const abortController = new AbortController();
    try{
      e.preventDefault();
      await createTable(form, abortController.signal);
      push(`/dashboard`);
    } catch(error) {
      setError(error);
    }
    return () => abortController.abort();
  };

  const handleCancel = () => {
    goBack();
  }

  return (
    <>
      <h1>Create A New Table</h1>
      <ErrorAlert error={error} />
      <TableForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </>
  );
}

export default CreateTable;
