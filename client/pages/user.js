import { FormControl, TextField } from "@mui/material";
import axios from "axios";
import Image from "next/image"
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Logo from '../public/images/logo.png';
import Maize from "../public/images/maize.png"

const Dashboard = () => {
  const [query, setQuery] = useState({
    ph: "",
    nitrogen: "",
    potassium: "",
    phosphorus: "",
    soil_moisture: ""
  })
  const [token, setToken] = useState("")
  const [farms, setFarms] = useState([])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [location, setLocation] = useState("")
  const [farm_id, setFarm_id] = useState("")

  const route = useRouter()
  
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value })
    console.log(query);
  }

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("user")).jwtToken)
  }, [])

  useEffect(() => {
    axios.get('http://localhost:4000/farm/user', config).then(
      ({ data }) => {
        setFarms(data)
      }
    ).catch(({ message }) => {
      console.log(message);
    })
  }, [token, loading])

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true)
    axios.get(`http://localhost:4000/crops/search?ph=${query.ph}&nit=${query.nitrogen}&pot=${query.potassium}&pho=${query.phosphorus}&soil=${query.soil_moisture}`, config).then(({ data }) => {
      setResults(data)
      setLoading(false)
      localStorage.setItem("search", JSON.stringify({...query}))
    }).catch(({ message }) => {
      console.log(message);
    })
  }

  const handleFarm = (e) => {
    e.preventDefault();
    const search = JSON.parse(localStorage.getItem("search"))
    const farm = {...search, crop: farm_id, location}
    console.log(farm);
    setLoading(true)
    axios.post('http://localhost:4000/farm', { ...farm }, config).then(({ data }) => {
      setLoading(false);
      toast.success(data.message)
    }).catch(({ message }) => {
      toast.error(message)
    })
  }

  const handleDeleteFarm = (id) => {
    setLoading(true)
    axios.delete(`http://localhost:4000/farm/${id}`, config).then(
      ({ data }) => {
        console.log(data);
        setLoading(false)
        toast.success(data.message)
      }
    ).catch(({ message }) => {
      console.log(message);
      toast.error(message)
      setLoading(false);
    })
  }

  const logout = () => {
    // localStorage.clear()
    route.push("/login")
  }

  // console.log(token);
  // console.log('farms', farms);
  // console.log('results', results);

  return (
    <>
      <div className="bg-amber-50 flex">
        <div className="container mx-auto px-4 py-5">
          <nav className=" flex items-center justify-between">
            <a className=''>
              <Image className='items-center px-4 py-2 h-12' src={Logo} alt="Logo" />
            </a>
            <div className="text-sm text-slate-700">
              <div className="flex justify-end">
                <Link className="mt-5 hover:text-green-600" href="/">Home</Link>
                <button type="button" onClick={logout} className='mr-4 mt-4 mb-6 hover:bg-slate-600 py-1 px-4 rounded-md hover:text-white'>Logout</button>
              </div>

              <form className="flex" onSubmit={handleSearch}>
                <TextField className="mt-2 mr-6"
                  helperText=" "
                  id="demo-helper-text-aligned-no-helper"
                  label="PH"
                  name="ph"
                  onChange={handleChange}
                />
                <TextField className="mt-2 mr-6"
                  helperText=" "
                  id="demo-helper-text-aligned-no-helper"
                  label="Nitrogen"
                  name="nitrogen"
                  onChange={handleChange}
                />
                <TextField className="mt-2 mr-6"
                  helperText=" "
                  id="demo-helper-text-aligned-no-helper"
                  label="Potassium"
                  name="potassium"
                  onChange={handleChange}
                />
                <TextField className="mt-2 mr-6"
                  helperText=" "
                  id="demo-helper-text-aligned-no-helper"
                  label="Phosphorus"
                  name="phosphorus"
                  onChange={handleChange}
                />
                <TextField className="mt-2 mr-2"
                  helperText=" "
                  id="demo-helper-text-aligned-no-helper"
                  label="Moisture"
                  name="soil_moisture"
                  onChange={handleChange}
                />
                <button className="bg-green-600 px-4 rounded-md text-sm mb-6 mt-2 text-white" type="submit">Search</button>
              </form>
            </div>
          </nav>
          <div className="border-dashed border-2 border-green-500 rounded-lg p-4 mb-14">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Results</h1>
              <hr />
              <div className="mt-4">
                <div class="grid grid-cols-3 gap-4">
                  {
                    results.map((crop, i) => (
                      <div key={i} class="block p-6 rounded-lg shadow-lg bg-white max-w-sm mr-4">
                        <h5 class="text-gray-900 text-3xl leading-tight font-bold mb-2">{crop.name}</h5>
                        <p class="text-gray-700 text-base mb-4">
                          Ph: {crop.ph.min} - {crop.ph.max}, Nitrogen: {crop.nitrogen.min} - {crop.nitrogen.max}, Potassium: {crop.potassium.min} - {crop.potassium.max}, Phosphorus: {crop.phosphorus.min} - {crop.phosphorus.max}, Soil Moisture: {crop.soil_moisture.min} - {crop.soil_moisture.max}.
                        </p>
                        <form onSubmit={handleFarm} className="flex flex-col">
                          <TextField className="mt-2 mr-6 w-full"
                            helperText=" "
                            id="demo-helper-text-aligned-no-helper"
                            label="Location"
                            name="location"
                            onChange={(e) => {
                              setLocation(e.target.value)
                              setFarm_id(crop._id)
                            }}
                          />

                          <button
                            type="submit"
                            class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                            Farm {crop.name}
                          </button>
                        </form>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="border-dashed border-2 border-green-500 rounded-lg p-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Farms</h1>
              <hr />
              <section class='bg-white mt-4'>
                <div class='container mx-auto'>
                  <div class='-mx-4 flex flex-wrap'>
                    <div class='w-full px-4'>
                      <div class='max-w-full overflow-x-auto'>
                        <table class='w-full table-auto'>
                          <thead>
                            <tr class='bg-primary text-center bg-green-500'>
                              <th class='w-1/6 min-w-[160px] border-l border-transparent py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4'>
                                Location
                              </th>
                              <th class='w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4'>
                                Crop
                              </th>
                              <th class='w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4'>
                                PH
                              </th>
                              <th class='w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4'>
                                Nitrogen
                              </th>
                              <th class='w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4'>
                                Potassium
                              </th>
                              <th class='w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4'>
                                Phosphorus
                              </th>
                              <th class='w-1/6 min-w-[160px] border-r border-transparent py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4'>
                                Soil Moisture
                              </th>
                              <th class='w-1/6 min-w-[160px] border-r border-transparent py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4'>
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              farms.map((farm, i) => 
                                <tr className='text-xs' key={i}>
                                  <td class='text-dark border-b border-l border-[#E8E8E8] bg-amber-50 py-5 px-2 text-center text-xs font-medium'>
                                    {farm.location}
                                  </td>
                                  <td class='text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-xs font-medium'>
                                    {farm.crop.name}
                                  </td>
                                  <td class='text-dark border-b border-[#E8E8E8] bg-amber-50 py-5 px-2 text-center text-xs font-medium'>
                                    {farm.ph}
                                  </td>
                                  <td class='text-dark border-b border-[#E8E8E8] bg-amber-50 py-5 px-2 text-center text-xs font-medium'>
                                    {farm.nitrogen}
                                  </td>
                                  <td class='text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-xs font-medium'>
                                    {farm.potassium}
                                  </td>
                                  <td class='text-dark border-b border-[#E8E8E8] bg-amber-50 py-5 px-2 text-center text-xs font-medium'>
                                    {farm.phosphorus}
                                  </td>
                                  <td class='text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-xs font-medium'>
                                    {farm.soil_moisture}
                                  </td>
                                  <td class='text-dark border-b border-r border-[#E8E8E8] bg-amber-50 py-5 px-2 text-center text-xs font-medium flex'>
                                    <button
                                      onClick={()=>handleDeleteFarm(farm._id)}
                                      class='border-primary text-primary hover:bg-primary inline-block rounded border py-2 px-6 bg-red-700 hover:text-white'
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              )
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        <div className="bg-teal-900 w-2/6 h-screen static">
          <div className="">
            <h1>Hey</h1>
          </div>
          <div className="flex justify-center">
            <Image className="w-60 absolute bottom-0" src={Maize} alt="bottom" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard