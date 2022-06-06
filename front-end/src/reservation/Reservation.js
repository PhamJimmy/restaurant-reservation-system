import { Link } from "react-router-dom";

function Reservation({ reservation, handleCancel }) {
  const { reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, people, status } = reservation;
  const phone = mobile_number.replace(/(\d{3})(\d{3})(\d{4})/, "$1 - $2 - $3");
  const date = new Date(reservation_date).toLocaleDateString();

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#parameters
  const time = new Intl.DateTimeFormat("en", { timeStyle: "short" }).format(
    new Date(`${reservation_date}T${reservation_time}`)
  );

  const buttons = (
    <div className="row">
      <div className="col">
        {reservation.status === "booked" && (
          <div>
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
              <button type="button" className="btn btn-primary">
                Seat
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="col d-flex justify-content-end">
        <div className="mr-2">
          <Link to={`/reservations/${reservation.reservation_id}/edit`}>
            <button type="button" className="btn btn-secondary">
              Edit
            </button>
          </Link>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            data-reservation-id-cancel={reservation.reservation_id}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const badge = {
    booked: "badge-primary",
    seated: "badge-warning",
    finished: "badge-dark",
    cancelled: "badge-danger"
  }

  const reservationCard = (
    <div className="card mb-1">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <p className="card-title">
            {first_name} {last_name}
          </p>
          <p className="card-title">
            <span className="status">Status:</span>{" "}
            <span className={`badge ${badge[status]}`} data-reservation-id-status={reservation_id}>
              {status}
            </span>
          </p>
        </div>
        <p className="card-text">
          {date} - {time}
        </p>
        <p className="card-text">Party size: {people}</p>
        <p className="card-text">Mobile number: {phone}</p>
        {buttons}
      </div>
    </div>
  );

  return <div>{reservationCard}</div>;
}

export default Reservation;
