import { Link } from "react-router-dom";

function Reservation({ reservation, handleCancel }) {
  return reservation.status === "booked" || reservation.status === "seated" ? (
    <>
      {JSON.stringify(reservation)}
      <p data-reservation-id-status={reservation.reservation_id}>{reservation.status}</p>
      {reservation.status === "booked" ? (
        <Link to={`/reservations/${reservation.reservation_id}/seat`}>
          <button type="button" className="btn btn-primary ml-2">
            Seat
          </button>
        </Link>
      ) : (
        <></>
      )}
      <Link to={`/reservations/${reservation.reservation_id}/edit`}>
        <button type="button" className="btn btn-warning ml-2">
          Edit
        </button>
      </Link>
      <button
        type="button"
        className="btn btn-danger ml-2"
        onClick={handleCancel}
        data-reservation-id-cancel={reservation.reservation_id}
      >
        Cancel
      </button>
    </>
  ) : (
    <></>
  );
}

export default Reservation;
