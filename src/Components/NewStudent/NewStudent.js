import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const NewStudent = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (formData, e) => {
    const toastId = toast.loading("Loading...");
    fetch(`https://yooda-server.herokuapp.com/newStudent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res) {
        toast.success("Added to Database");
        toast.dismiss(toastId);
        e.target.reset();
      }
    });
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register("fullName")}
              className="form-control mt-2"
              placeholder="Full Name"
              required
            />
            <input
              {...register("roll")}
              className="form-control mt-2"
              placeholder="Roll"
              required
            />
            <input
              {...register("age")}
              className="form-control mt-2"
              placeholder="Age"
              required
            />
            <input
              {...register("class")}
              className="form-control mt-2"
              placeholder="Class"
              required
            />
            <input
              {...register("hallName")}
              className="form-control mt-2"
              placeholder="Hall Name"
              required
            />
            <div className="mt-3">
              <label htmlFor="status">Status</label>
              <br />
              <select
                {...register("status")}
                className="form-select"
                aria-label="Status"
                name="status"
                id="status"
              >
                <option value="active" selected>
                  Active
                </option>
                <option value="inactive">inactive</option>
              </select>
            </div>
            <div className="mt-3">
              <label htmlFor="shift">Shift</label>
              <br />
              <select
                {...register("shift")}
                className="form-select"
                aria-label="shift"
                name="shift"
                id="shift"
              >
                <option value="Morning" selected>
                Morning
                </option>
                <option value="day">Day</option>
              </select>
            </div>

            <div className="d-flex justify-content-around">
              <input
                type="reset"
                className="form-control mt-3 btn btn-danger me-1"
              />
              <input
                type="submit"
                className="form-control mt-3 btn btn-success ms-1"
              />
            </div>
          </form>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
};

export default NewStudent;
