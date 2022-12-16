import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Link from "next/link"

const Admin = () => {
  const [crops, setCrops] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false)
  const [farms, setFarms] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem('user')).jwtToken);
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get('http://localhost:4000/crops', config)
      .then(({ data }) => {
        setCrops(data);
      })
      .catch(({ message }) => {
        console.log(message);
      });
  }, [token, loading]);

  useEffect(() => {
    axios.get('http://localhost:4000/farm/', config).then(
      ({ data }) => {
        setFarms(data)
      }
    ).catch(({ message }) => {
      console.log(message);
    })
  }, [token, loading])

  useEffect(() => {
    axios.get('http://localhost:4000/users/', config).then(
      ({ data }) => {
        setUsers(data)
      }
    ).catch(({ message }) => {
      console.log(message);
    })
  }, [token, loading])

  const handleDelete = (id) => {
    setLoading(true)
    axios.delete(`http://localhost:4000/crops/${id}`, config).then(
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

  const handleDeleteUser = (id) => {
    setLoading(true)
    axios.delete(`http://localhost:4000/users/${id}`, config).then(
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


  console.log(token);
  console.log(crops);
  return (
    <>
      <div className='container mx-auto mt-14'>
        <div className="border-dashed border-2 border-green-500 rounded-lg p-4 my-8">
          <div>
            <div className='flex justify-between items-center'>
              <h1 className="text-3xl font-bold text-gray-800">Crops</h1>
              <Link href="/admin/create-crop" className='mr-4 mb-4 py-3 px-6 bg-yellow-600 rounded-md '>Add Crop</Link>
            </div>
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
                              Name
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
                            crops.map((crop, i) => 
                              <tr className='text-xs' key={i}>
                                <td class='text-dark border-b border-l border-[#E8E8E8] bg-amber-50 py-5 px-2 text-center text-xs font-medium'>
                                  {crop.name}
                                </td>
                                <td class='text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-xs font-medium'>
                                  {crop.ph.min} - {crop.ph.max}
                                </td>
                                <td class='text-dark border-b border-[#E8E8E8] bg-amber-50 py-5 px-2 text-center text-xs font-medium'>
                                  {crop.nitrogen.min} - {crop.nitrogen.max}
                                </td>
                                <td class='text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-xs font-medium'>
                                  {crop.potassium.min} - {crop.potassium.max}
                                </td>
                                <td class='text-dark border-b border-[#E8E8E8] bg-amber-50 py-5 px-2 text-center text-xs font-medium'>
                                  {crop.phosphorus.min} - {crop.phosphorus.max}
                                </td>
                                <td class='text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-xs font-medium'>
                                  {crop.soil_moisture.min} - {crop.soil_moisture.max}
                                </td>
                                <td class='text-dark border-b border-r border-[#E8E8E8] bg-amber-50 py-5 px-2 text-center text-xs font-medium flex'>
                                  <button
                                    onClick={()=>handleDelete(crop._id)}
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

        <div className="border-dashed border-2 border-green-500 rounded-lg p-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Users</h1>
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
                              Name
                            </th>
                            <th class='w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4'>
                              Contact
                            </th>
                            <th class='w-1/6 min-w-[160px] py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4'>
                              Location
                            </th>
                            <th class='w-1/6 min-w-[160px] border-r border-transparent py-4 px-3 text-lg font-semibold text-white lg:py-7 lg:px-4'>
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            users.map((user, i) => 
                              <tr className='text-xs' key={i}>
                                <td class='text-dark border-b border-l border-[#E8E8E8] bg-amber-50 py-5 px-2 text-center text-xs font-medium'>
                                  {user.name}
                                </td>
                                <td class='text-dark border-b border-[#E8E8E8] bg-white py-5 px-2 text-center text-xs font-medium'>
                                  {user.contact}
                                </td>
                                <td class='text-dark border-b border-[#E8E8E8] bg-amber-50 py-5 px-2 text-center text-xs font-medium'>
                                  {user.location}
                                </td>
                                <td class='text-dark border-b border-r border-[#E8E8E8] bg-amber-50 py-5 px-2 text-center text-xs font-medium flex'>
                                  <button
                                    onClick={()=>handleDeleteUser(user.id)}
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

        <div className="border-dashed border-2 border-green-500 rounded-lg p-4 mb-8">
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
    </>
  );
};

export default Admin;
