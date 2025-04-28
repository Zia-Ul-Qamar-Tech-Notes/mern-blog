import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button } from "flowbite-react";

function Signup() {
  const [formData, setFormData] = React.useState({});
  const [confirmPassword, setConfirmPassword] = React.useState(false);
  const navigate = useNavigate();
  const HandleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (formData.password !== formData.confirmPassword) {
      setConfirmPassword(true);
    } else {
      setConfirmPassword(false);
    }
  };
  const HandelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8000/api/v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "success") {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
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
              <Label>your username</Label>
              <TextInput
                type="text"
                placeholder="Username..."
                id="username"
                onChange={HandleChange}
              />
            </div>
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
            <div>
              {/* <label htmlFor="username">Username</label> */}
              <Label>Confirm Password</Label>
              <TextInput
                type="password"
                placeholder="Password..."
                id="confirmPassword"
                onChange={HandleChange}
                helperText={confirmPassword ? "Password not matched" : ""}
              />
            </div>

            <button
              type="button"
              class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={HandelSubmit}
            >
              SignUp
            </button>
          </form>
          <div>
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-500 font-bold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
