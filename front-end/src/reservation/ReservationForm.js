function ReservationForm({ form, handleChange, handleSubmit, handleCancel }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="input-group mb-3 col-md-6">
          <div className="input-group-prepend">
            <span className="input-group-text">First Name</span>
          </div>
          <input
            name="first_name"
            id="first_name"
            className="form-control"
            type="text"
            aria-label="First name"
            value={form.first_name}
            onChange={handleChange}
            required={true}
          ></input>
        </div>
        <div className="input-group mb-3 col-md-6">
          <div className="input-group-prepend">
            <span className="input-group-text">Last Name</span>
          </div>
          <input
            name="last_name"
            id="last_name"
            className="form-control"
            type="text"
            aria-label="Last name"
            value={form.last_name}
            onChange={handleChange}
            required={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="input-group mb-3 col-md-6">
          <div className="input-group-prepend">
            <span className="input-group-text">Mobile Number</span>
          </div>
          <input
            name="mobile_number"
            id="mobile_number"
            className="form-control"
            type="text"
            aria-label="mobile number"
            value={form.mobile_number}
            onChange={handleChange}
            placeholder="123-456-7890"
            required={true}
          />
        </div>
        <div className="input-group mb-3 col-md-6">
          <div className="input-group-prepend">
            <span className="input-group-text">Party Size</span>
          </div>
          <input
            name="people"
            id="people"
            type="number"
            className="form-control"
            aria-label="party size"
            value={form.people}
            onChange={handleChange}
            min={1}
            required={true}
          />
        </div>
      </div>
      <div className="row">
        <div className="input-group mb-3 col-md-6">
          <div className="input-group-prepend">
            <span className="input-group-text">Date</span>
          </div>
          <input
            name="reservation_date"
            id="reservation_date"
            value={form.reservation_date}
            onChange={handleChange}
            type="date"
            aria-label="reservation date"
            className="form-control"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            required={true}
          />
        </div>
        <div className="input-group mb-3 col-md-6">
          <div className="input-group-prepend">
            <span className="input-group-text">Time</span>
          </div>
          <input
            name="reservation_time"
            id="reservation_time"
            value={form.reservation_time}
            onChange={handleChange}
            type="time"
            aria-label="reservation time"
            className="form-control"
            pattern="[0-9]{2}:[0-9]{2}"
            required={true}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <button type="button" className="btn btn-secondary ml-2" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
}

export default ReservationForm;
