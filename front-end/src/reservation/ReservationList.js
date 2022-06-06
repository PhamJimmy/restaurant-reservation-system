import Reservation from "./Reservation";

function ReservationList({ reservations, handleCancel, isSearch }) {
  const results = reservations.filter((reservation) =>
    isSearch ? true : reservation.status === "booked" || reservation.status === "seated"
  );
  const content = results.length ? (
    results.map((result) => (
      <Reservation key={result.reservation_id} reservation={result} handleCancel={() => handleCancel(result.reservation_id)} />
    ))
  ) : (
    <p>No reservations for this date.</p>
  );

  return (
    <>
      <h3>Reservations</h3>
      {content}
    </>
  );
}

export default ReservationList;
