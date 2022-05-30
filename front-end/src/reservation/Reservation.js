import { Link } from "react-router-dom";

function Reservation({ reservation }) {

  return (<>
    {JSON.stringify(reservation)}
    <Link to={`/reservations/${reservation.reservation_id}/seat`}>Seat</Link>
  </>)
}

export default Reservation;