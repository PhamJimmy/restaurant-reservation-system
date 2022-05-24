import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";

function CreateReservation() {
  const { goBack } = useHistory();

  const initialForm = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  }
  const [form, setForm] = useState({ ...initialForm });

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: (target.name === "people" ? Number(target.value) : target.value) });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    async function submitReservation() {
      const data = await createReservation(form);
      console.log(`Data after API call: ${data}`)
      setForm({ ...initialForm });
    }
    submitReservation();
  }

  const handleCancel = () => {
    setForm({ ...initialForm });
    goBack();
  }

  return (
    <>
      <h1>Create A New Reservation</h1>
      <ReservationForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </>
  )
}

export default CreateReservation;