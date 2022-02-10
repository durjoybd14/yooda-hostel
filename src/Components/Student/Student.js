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

const Student = () => {
  const [statusValue, setStatusValue] = useState("");
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(true);
  const [checkIds, setCheckIds] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;

  const displayUsers = students
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((student, i) => {
      return (
        <tr style={{ cursor: "pointer" }} key={student?._id}>
          <td onClick={() => handleCheckIds(student?._id)}>
            <input type="checkbox" />
          </td>
          <th scope="row">{i + 1}</th>
          <td>{student?.fullName}</td>
          <td>{student?.roll}</td>
          <td>{student?.age}</td>
          <td>{student?.class}</td>
          <td>{student?.hallName}</td>
          <td>{student?.status}</td>
          <td>
            <span
              title="edit"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              onClick={() => onOpenModal(student?._id)}
            >
              <FaRegEdit />
            </span>{" "}
            <span title="delete" onClick={() => handleDelete(student?._id)}>
              <AiOutlineDelete />
            </span>
          </td>
        </tr>
      );
    });

  const pageCount = Math.ceil(students.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const handleCheckIds = (id) => {
    const findId = checkIds?.find((cid) => cid === id);
    if (findId) {
      const filterIds = checkIds?.filter((cid) => cid !== id);
      setCheckIds(filterIds);
    } else {
      setCheckIds([...checkIds, id]);
    }
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
      fetch(`https://yooda-server.herokuapp.com/studentEdit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            toast.success("Student info updated");
            toast.dismiss(toastId);
            e.target.reset();
            window.location.reload();
          }
        });
    }
  };
  const handleDelete = (id) => {
    const toastId = toast.loading("Loading...");
    fetch(`https://yooda-server.herokuapp.com/studentDetete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          toast.success("One student removed");
          toast.dismiss(toastId);
          window.location.reload();
        }
      });
  };
  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await axios.get(
          "https://yooda-server.herokuapp.com/students"
        );
        setStudents(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getStudents();
  }, []);
  const updateAll = () => {
    const toastId = toast.loading("Loading...");
    fetch(`https://yooda-server.herokuapp.com/students/updateAll`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ checkIds, statusValue }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          toast.success("Student info updated");
          toast.dismiss(toastId);
          window.location.reload();
        }
      });
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  const handleStatus = (e) => {
    setStatusValue(e.target.value);
  };
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-12">
          <div className="d-flex justify-content-between">
            <Link to="/new_student" className="btn btn-primary">
              Add Student
            </Link>
            <div className={checkIds?.length === 0 ? "d-none" : "d-block"}>
              <div
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Update status
              </div>
              <div
                class="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Change status
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleStatus}
                      />
                      <div className="btn btn-primary mt-2" onClick={updateAll}>
                        Update
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5" style={{ overflowX: "scroll" }}>
            <table className="table border table-striped table-hover text-center pb-5 mb-5">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">#SL</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Roll</th>
                  <th scope="col">Age</th>
                  <th scope="col">Class</th>
                  <th scope="col">Hall Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
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
              </Modal>
            </table>
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

export default Student;
