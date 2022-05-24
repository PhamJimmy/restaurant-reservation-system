function ReservationList({ reservations }) {
  return (
    <>
      {reservations.map((reservation) => <li key={reservation.reservation_id}>{JSON.stringify(reservation)}</li>)}
    </>
  );
}

export default ReservationList