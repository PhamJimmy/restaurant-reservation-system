import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import ReservationForm from "./ReservationForm";
import { readReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function EditReservation() {
  const { reservationId } = useParams();
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
  const [reservation, setReservation] = useState(initialForm);

  useEffect(() => {
    const abortController = new AbortController();
    readReservation(reservationId, abortController.signal)
    .then((res) => {
      res.reservation_date = res.reservation_date.slice(0, 10);
      res.reservation_time = res.reservation_time.slice(0, 5);
      setReservation(res)
    })
    .catch(setError);

    return () => abortController.abort();
  }, [reservationId]);

  const handleChange = ({ target }) => {
    setReservation({ ...reservation, [target.name]: target.name === "people" ? Number(target.value) : target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const abortController = new AbortController();
    updateReservation(reservation, abortController.signal)
      .then((data) => push(`/dashboard?date=${data.reservation_date}`))
      .catch(setError);
    return () => abortController.abort();
  };

  const handleCancel = () => {
    goBack();
  };

  return (
    <>
      <h1>Edit Reservation for: {`${reservation.first_name} ${reservation.last_name}`}</h1>
      <ErrorAlert error={error} />
      <ReservationForm
        form={reservation}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </>
  );
}

export default EditReservation;
