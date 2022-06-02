import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import moment from "moment";

import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "../reservation/ReservationList";
import { previous, today, next } from "../utils/date-time";
import Tables from "../table/TableList";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const { push } = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {moment(date).format("dddd - MMM DD, YYYY")}</h4>
      </div>
      <div>
        <button onClick={() => push(`/dashboard?date=${previous(date)}`)}>Previous</button>
        <button onClick={() => push(`/dashboard?date=${today()}`)}>Today</button>
        <button onClick={() => push(`/dashboard?date=${next(date)}`)}>Next</button>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationList reservations={reservations} />
      <Tables />
    </main>
  );
}

export default Dashboard;
