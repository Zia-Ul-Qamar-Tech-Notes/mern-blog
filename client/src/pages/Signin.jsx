import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";

function Signin() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = React.useState({});
  const navigate = useNavigate();
  const HandleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const HandelSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.status === "success") {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("RefreshToken", data.refreshToken);
        dispatch(loginSuccess(data));
        navigate("/");
      }
      if (data.status !== "success") {
        dispatch(loginFailure(data.message));
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className=" flex flex-col md:flex-row md:items-center gap-8 p-3 max-w-3xl  mx-auto">
        {/* Left Side */}
        <div className="md:w-1/2">
          <Link
            to="/"
            className="font-bold
           dark:text-white text-4xl"
          >
            <span className=" px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl text-white">
              Mirza's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste ad
            sit, inventore dolorem placeat aliquid iure suscipit dolor aut,
            provident possimus. Quidem rem consequatur optio exercitationem
            eligendi accusantium
          </p>
        </div>
        {/* Right Side */}
        <div className="md:w-1/2">
          <form className="flex flex-col gap-4 mt-5 md:mt-0">
            <div>
              {/* <label htmlFor="username">Username</label> */}
              <Label>your Email</Label>
              <TextInput
                type="email"
                placeholder="abc@gmail.com..."
                id="email"
                onChange={HandleChange}
              />
            </div>
            <div>
              {/* <label htmlFor="username">Username</label> */}
              <Label>your password</Label>
              <TextInput
                type="password"
                placeholder="ES^#787Wuier..."
                id="password"
                onChange={HandleChange}
              />
            </div>
            <button
              type="button"
              class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={HandelSubmit}
            >
              Signin
            </button>
          </form>
          <div>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 font-bold">
              Signup
            </Link>
          </div>
          <div className="text-red-500 font-bold mt-2">
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
