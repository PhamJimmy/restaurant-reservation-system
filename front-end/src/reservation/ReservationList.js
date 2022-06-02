import Reservation from "./Reservation";

function ReservationList({ reservations, handleCancel, isSearch }) {
  const content = reservations.length ? (
    reservations.filter((reservation) => isSearch ? true : reservation.status === "booked" || reservation.status === "seated" ).map((reservation) => (
      <li key={reservation.reservation_id}>
        <Reservation
          reservation={reservation}
          handleCancel={() => handleCancel(reservation.reservation_id)}
        />
      </li>
    ))
  ) : (
    <p>No reservations for this date.</p>
  );

  return (
    <ul>
      {content}
    </ul>
  );
}

export default ReservationList