
function TableForm({ form, handleChange, handleSubmit, handleCancel }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="table_name">Table Name</label>
        <input
          name="table_name"
          id="table_name"
          className="form-control"
          value={form.table_name}
          onChange={handleChange}
          required={true}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="capacity">Table Capacity</label>
        <input
          name="capacity"
          id="capacity"
          type="number"
          value={form.capacity}
          onChange={handleChange}
          min={1}
          required={true}
        />
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

export default TableForm;