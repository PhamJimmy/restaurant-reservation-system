function TableForm({ form, handleChange, handleSubmit, handleCancel }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="input-group mb-3 col-md-6">
          <div className="input-group-prepend">
            <span className="input-group-text">Table Name</span>
          </div>
          <input
            name="table_name"
            id="table_name"
            className="form-control"
            type="text"
            value={form.table_name}
            onChange={handleChange}
            required={true}
          ></input>
        </div>
        <div className="input-group mb-3 col-md-6">
          <div className="input-group-prepend">
            <span className="input-group-text">Table Capacity</span>
          </div>
          <input
            name="capacity"
            id="capacity"
            type="number"
            className="form-control"
            value={form.capacity}
            onChange={handleChange}
            min={1}
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

export default TableForm;
