import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";

const Food = () => {
  const [foods, setFoods] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = foods
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((food, i) => {
      return (
        <tr style={{ cursor: "pointer" }} key={food?._id}>
          <th scope="row">{i + 1}</th>
          <td>{food?.name}</td>
          <td>{food?.price}</td>
          <td>
            <span
              title="edit"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => onOpenModal(food?._id)}
            >
              <FaRegEdit />
            </span>{" "}
            <span title="delete" onClick={() => handleDelete(food?._id)}>
              <AiOutlineDelete />
            </span>
          </td>
        </tr>
      );
    });

  const pageCount = Math.ceil(foods.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const onOpenModal = (id) => {
    setOpen(true);
    setId(id);
  };
  const onCloseModal = () => setOpen(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (formData, e) => {
    if (id) {
      const toastId = toast.loading("Loading...");
      fetch(`https://yooda-server.herokuapp.com/foodEdit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            toast.success("Food info updated");
            toast.dismiss(toastId);
            e.target.reset();
            window.location.reload();
          }
        });
    }
  };
  const handleDelete = (id) => {
    const toastId = toast.loading("Loading...");
    fetch(`https://yooda-server.herokuapp.com/foodDetete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("Food item removed");
          toast.dismiss(toastId);
          window.location.reload();
        }
      });
  };
  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await axios.get(
          "https://yooda-server.herokuapp.com/foods"
        );
        setFoods(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getFoods();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-12">
          <div className="d-flex justify-content-end">
            <Link to="/new_food" className="btn btn-primary">
              Add Food
            </Link>
          </div>
          <div className="mt-5 mb-5">
            <table className="table border table-striped table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">#SL</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>{displayUsers}</tbody>

              <Modal
                open={open}
                onClose={onCloseModal}
                center
                style={{ borderRadius: "6px" }}
              >
                <form onSubmit={handleSubmit(onSubmit)} className="p-3 mt-4">
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
              </Modal>
            </table>
          </div>
          <div className="mt-5">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={"active"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
