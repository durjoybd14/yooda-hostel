import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const NewFood = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (formData, e) => {
    const toastId = toast.loading("Loading...");
    fetch(`https://yooda-server.herokuapp.com/newFood`, {
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
              {...register("name")}
              className="form-control mt-2"
              placeholder="Food Name"
              required
            />
            <input
              {...register("price")}
              className="form-control mt-2"
              placeholder="Price"
              required
            />
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

export default NewFood;
