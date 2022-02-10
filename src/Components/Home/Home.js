import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [usersInfo, setUsersInfo] = useState([]);
  const { register, handleSubmit } = useForm();
  
  const onSubmit = (formData, e) => {
    const searchItem = formData.shift;
    if (searchItem !== "" && searchItem.length > 0) {
      const newItems = userInfo?.filter((si) => {
        return Object.values(si)
          .join(" ")
          .toLowerCase()
          .includes(searchItem.toString().toLowerCase());
      });
      setUsersInfo(newItems);
    } else {
      setUsersInfo(userInfo);
    }
  };

  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await axios.get(
          "https://yooda-server.herokuapp.com/serve/students"
        );
        setUserInfo(response?.data?.data);
        setUsersInfo(response?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getFoods();
  }, []);

  const handleChange = (e) => {
    const searchItem = e.target.value;
    if (searchItem !== "" && searchItem.length > 0) {
      const newItems = userInfo?.filter((si) => {
        return Object.values(si)
          .join(" ")
          .toLowerCase()
          .includes(searchItem.toString().toLowerCase());
      });
      setUsersInfo(newItems);
    } else {
      setUsersInfo(userInfo);
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-12">
          <div className="d-flex justify-content-between">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex">
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
                <input
                  type="submit"
                  value="Search"
                  className="form-control btn btn-success ms-1"
                />
              </div>
            </form>
            <Link to="/serve" className="btn btn-primary">
              Serve one
            </Link>
          </div>
          <div className="mt-5">
            <input
              type="text"
              onChange={handleChange}
              className="form-control"
              placeholder="Search by roll or date"
            />
          </div>
          <div className="mt-5" style={{ overflowX: "scroll" }}>
            <table className="table border table-striped table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">#SL</th>
                  <th scope="col">Roll</th>
                  <th scope="col">Date</th>
                  <th scope="col">Shift</th>
                  <th scope="col">Status</th>
                  <th scope="col">Food Items</th>
                </tr>
              </thead>
              <tbody>
                {usersInfo?.map((food, i) => {
                  return (
                    <tr style={{ cursor: "pointer" }} key={food?._id}>
                      <th scope="row">{i + 1}</th>
                      <td>{food?.roll}</td>
                      <td>{food?.date}</td>
                      <td>{food?.shift}</td>
                      <td>{food?.status}</td>
                      <td>{food?.foodItems}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
