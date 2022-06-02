function SearchForm({ form, handleChange, handleSubmit, handleCancel }) {
  return (
    <form onSubmit={handleSubmit}>
      <h3>Search For A Reservation</h3>
      <div className="form-group">
        <label htmlFor="mobile_number">Mobile Number:</label>
        <input
          id="mobile_number"
          name="mobile_number"
          type="text"
          required={true}
          placeholder="Enter a customer's phone number"
          value={form.mobile_number}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Find
      </button>
    </form>
  );
}

export default SearchForm;
