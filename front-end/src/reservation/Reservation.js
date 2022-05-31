import { Link } from "react-router-dom";

function Reservation({ reservation }) {

  return (<>
    {JSON.stringify(reservation)}
    <p data-reservation-id-status={reservation.reservation_id}>{reservation.status}</p>
    {reservation.status === "booked" ? <Link to={`/reservations/${reservation.reservation_id}/seat`}>Seat</Link> : <></> }
  </>)
}

export default Reservation;