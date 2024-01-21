import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="flex my-2">
        <input
          type="text"
          className="form-control"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="Enter category"
          autoFocus
          required
        />
        <button type="submit" className="btn btn-outline-primary">
          Save
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
