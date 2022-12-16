import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { use, useState } from "react"
import { toast } from "react-toastify"
import login from "../public/images/login.png"

const Login = () => {
  const [user, setUser] = useState({
    name: "",
    contact: "",
    password: "",
    location: "",
  })

  const router = useRouter()
  const handleChange = (e) => {
    e.preventDefault()
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    console.log('Heyyy', user);
    e.preventDefault(); //so that the page does not reload onSubmit

    try {
      const data = await axios.post(`http://localhost:4000/users/register`, { ...user });
      console.log("LOGIN RESPONSE", data);
      toast.success("Register Successful!")
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data)
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
            <h1 className="text-left font-semibold text-5xl mt-40 pb-4">Create an account</h1>
            <p className="text-left">Get started</p>
            <form className="mt-8" onSubmit={handleSubmit}>
              <div>
                <FormControl sx={{ minWidth: 500 }}>
                  <TextField className="mt-2 mr-6"
                    helperText=" "
                    id="demo-helper-text-aligned-no-helper"
                    label="Full Name"
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormControl sx={{ minWidth: 500 }}>
                  <TextField className="mt-2 mr-6"
                    helperText=" "
                    id="demo-helper-text-aligned-no-helper"
                    label="Phone Number"
                    name="contact"
                    onChange={handleChange}
                    required
                    type="number"
                  />
                </FormControl>
                <FormControl sx={{ minWidth: 500 }}>
                  <TextField className="mt-2 mr-6"
                    helperText=" "
                    id="demo-helper-text-aligned-no-helper"
                    label="Location"
                    name="location"
                    onChange={handleChange}
                    required
                  />
                </FormControl>

                <FormControl sx={{ minWidth: 500 }}>
                  <TextField className="mt-2 mr-6"
                    helperText=" "
                    id="demo-helper-text-aligned-no-helper"
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    required
                    type="password"
                  />
                </FormControl>
              </div>
              <button className="bg-red-500 p-4 text-sm px-8 text-white">Sign Up</button>
              <div className="flex mt-4">
                <p className="font-light text-sm mr-1">Already have an account?</p>
                <Link href="/login" className="text-sm text-green-700"> Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login