import { useState } from "react";
import SearchForm from "./SearchForm";
import ReservationList from "../reservation/ReservationList";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";

function Search() {
  const { goBack } = useHistory();
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);
  const [reservations, setReservations] = useState([]);
  const initialForm = {
    mobile_number: ""
  };
  const [form, setForm] = useState(initialForm);

  const handleChange = ({ target }) => {
    setForm({ mobile_number: target.value });
  };

  const handleSubmit = async (e) => {
    const abortController = new AbortController()
    try {
      e.preventDefault();
      setReservations(await listReservations({ mobile_number: form.mobile_number} ), abortController.signal);
      setSearched(true);
    } catch (error) {
      setError(error);
    }
    return () => abortController.abort();
  };

  const handleCancel = () => {
    goBack();
  }

  const searchResults = (reservations.length ? <ReservationList reservations={reservations} /> : <>No reservations found</>)

  return (
    <>
      <SearchForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} handleCancel={handleCancel} />
      <ErrorAlert error={error} />
      {searched ? searchResults : <></>}
    </>
  );
}

export default Search;
