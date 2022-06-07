import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import moment from "moment";

import { listReservations, updateReservationStatus } from "../utils/api";
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
    listReservations({ date }, abortController.signal).then(setReservations).catch(setReservationsError);
    return () => abortController.abort();
  }

  const handleCancel = async (reservation_id) => {
    const abortController = new AbortController();

    try {
      const confirm = window.confirm("Do you want to cancel this reservation? This cannot be undone.");
      if (confirm) {
        await updateReservationStatus(reservation_id, { status: "cancelled" }, abortController.signal);
        await setReservations(await listReservations({ date }, abortController.signal));
      }
    } catch (error) {
      setReservationsError(error);
    }
    return () => abortController.abort();
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {moment(date).format("dddd - MMM DD, YYYY")}</h4>
      </div>
      <div className="btn-group" role="group" aria-label="Date selector">
        <button type="button" className="btn btn-secondary" onClick={() => push(`/dashboard?date=${previous(date)}`)}>
          &#60; Previous
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => push(`/dashboard?date=${today()}`)}>
          Today
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => push(`/dashboard?date=${next(date)}`)}>
          Next &#62;
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="row mt-2">
        <div className="col-lg-6">
          <ReservationList reservations={reservations} handleCancel={handleCancel} isSearch={false} />
        </div>
        <div className="col-lg-6">
          <Tables />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
