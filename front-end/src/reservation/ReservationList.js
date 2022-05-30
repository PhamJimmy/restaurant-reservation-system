import Reservation from "./Reservation";

function ReservationList({ reservations }) {
  const content = reservations.length ? reservations.map((reservation) => <li key={reservation.reservation_id}><Reservation reservation={reservation} /></li>) : <p>No reservations for this date.</p>
  

  return (
    <ul>
      {content}
    </ul>
  );
}

export default ReservationList