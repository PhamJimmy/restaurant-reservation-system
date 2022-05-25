import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function CreateReservation() {
  const { push, goBack } = useHistory();
  const [error, setError] = useState(null);

  const initialForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };
  const [form, setForm] = useState({ ...initialForm });

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.name === "people" ? Number(target.value) : target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const abortController = new AbortController();

    createReservation(form, abortController.signal)
      .then((data) => push(`/dashboard?date=${data.reservation_date}`))
      .catch(setError);
    return () => abortController.abort();
  };

  const handleCancel = () => {
    goBack();
  };

  return (
    <>
      <h1>Create A New Reservation</h1>
      <ErrorAlert error={error} />
      <ReservationForm
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </>
  );
}

export default CreateReservation;
