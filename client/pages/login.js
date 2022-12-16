import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import login from "../public/images/login.png"

const Login = () => {
  const [user,setUser] = useState({
    contact:"",
    password:""
  });

  const router = useRouter();

  const handleChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value});
    console.log(user);
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); //so that the page does not reload onSubmit
    try {
      const { data } = await axios.post(`http://localhost:4000/users/login`, { ...user });
      console.log("LOGIN RESPONSE", data.role);
      // dispatch({
      //   type: "LOGIN",
      //   payload: data,
      // });
      // save in local storage
      window.localStorage.setItem("user", JSON.stringify(data));
      // redirect
      toast.success("Login Successful!")
      if (data.role == 'admin') {
        router.push("/admin")
      } else {
        router.push("/user");
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <div className="bg-amber-50 flex felx-row">
        <div>
          <Image className="h-screen mx-auto" src={login} alt="login" />
        </div>
        <div className="w-full">
          <div className="ml-48">
            <h1 className="text-left font-semibold text-5xl mt-40 pb-4">Welcome Back</h1>
            <p className="text-left">Please Sign-in</p>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="">
                <FormControl sx={{ minWidth: 500 }}>
                  <TextField className="mt-2 mr-6"
                    helperText=" "
                    id="demo-helper-text-aligned-no-helper"
                    label="Phone Number"
                    name="contact"
                    onChange={handleChange}
                  />
                </FormControl>
              </div>

              <div className="">
                <FormControl sx={{ minWidth: 500 }}>
                  <TextField className="mt-2 mr-6"
                    helperText=" "
                    id="demo-helper-text-aligned-no-helper"
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                </FormControl>
              </div>
              <button className="bg-red-500 p-4 text-sm px-8 text-white" type="submit">Sign In</button>
              <div className="flex mt-4">
                <p className="font-light text-sm mr-1">Dont have an account?</p>
                <Link href="/register" className="text-sm text-green-700"> Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login