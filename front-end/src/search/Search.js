import { useState } from "react";
import SearchForm from "./SearchForm";
import ReservationList from "../reservation/ReservationList";
import { listReservations, updateReservationStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";

function Search() {
  const { push } = useHistory();
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const initialForm = {
    mobile_number: "",
  };
  const [form, setForm] = useState(initialForm);

  const handleChange = ({ target }) => {
    setForm({ mobile_number: target.value });
  };

  const handleSubmit = async (e) => {
    const abortController = new AbortController();
    try {
      e.preventDefault();
      await setReservations(await listReservations({ mobile_number: form.mobile_number }), abortController.signal);
      setSearched(true);
    } catch (error) {
      setError(error);
    }
    return () => abortController.abort();
  };

  const handleCancel = async (reservation_id) => {
    const abortController = new AbortController();

    try {
      const confirm = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
      if (confirm) {
        await updateReservationStatus(reservation_id, { status: "cancelled" }, abortController.signal);
        await setReservations(await listReservations({ mobile_number: form.mobile_number }, abortController.signal));
        setSearched(true);
      }
    } catch (error) {
      setError(error);
    }
    return () => abortController.abort();
  };

  const searchResults = reservations.length ? (
    <ReservationList reservations={reservations} handleCancel={handleCancel} isSearch={true} />
  ) : (
    <>No reservations found</>
  );

  return (
    <>
      <SearchForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
      <ErrorAlert error={error} />
      {searched ? searchResults : <></>}
    </>
  );
}

export default Search;
