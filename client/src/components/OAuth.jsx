import React from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });
  const HandleGoogleSignIn = async () => {
    const responseData = await signInWithPopup(auth, provider);
    let dataTobeSaved = {
      name: responseData.user.displayName,
      email: responseData.user.email,
      image: responseData.user.photoURL,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/google`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataTobeSaved),
        }
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(loginSuccess(data));
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        onClick={HandleGoogleSignIn}
        type="button"
        class="text-white w-full flex items-center justify-center gap-3 hover:cursor-pointer bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 outline-blue-500"
      >
        <AiFillGoogleCircle className="w-6 h-6 " />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
}

export default OAuth;
