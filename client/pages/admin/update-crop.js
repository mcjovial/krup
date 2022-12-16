import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Input from "../../components/Input"

const CreateCrop = () => {
  const [ph_min, setPh_min] = useState("")
  const [ph_max, setPh_max] = useState("")
  const [nitro_min, setNitro_min] = useState("")
  const [nitro_max, setNitro_max] = useState("")
  const [pot_min, setPot_min] = useState("")
  const [pot_max, setPot_max] = useState("")
  const [phos_min, setPhos_min] = useState("")
  const [phos_max, setPhos_max] = useState("")
  const [soil_min, setSoil_min] = useState("")
  const [soil_max, setSoil_max] = useState("")
  const [name, setName] = useState("")

  const [token, setToken] = useState("")

  const crop = {
    name: name,
    ph: {
      min: ph_min,
      max: ph_max
    },
    nitrogen: {
      min: nitro_min,
      max: nitro_max
    },
    potassium: {
      min: pot_min,
      max: pot_max
    },
    phosphorus: {
      min: phos_min,
      max: phos_max
    },
    soil_moisture: {
      min: soil_min,
      max: soil_max
    }
  }

  const router = useRouter();

  useEffect(() => {
    setToken(JSON.parse(window.localStorage.getItem("user")).jwtToken)
  }, [])

  useEffect(() => {
    
  }, [])
  
  
  console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault()

    let config = {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }
    axios.post( 
      'http://localhost:4000/crops',
      { ...crop },
        config
    )
    .then( ( {data} ) => {
      console.log(1, data)
      toast.success(data.message)
      router.push("/admin")
    } )
    .catch((error) => {
      console.log(2, error);
      toast.error(error.message)
    })
  }
  console.log(crop);

  return (
    <>
      <section className="bg-amber-50 py-20 lg:py-[120px]">
        <div className="flex justify-center">
          <div className="block rounded-lg shadow-lg bg-white w-2/3 text-center">
            <div className="py-3 px-6 border-b border-gray-300 text-3xl">
              Add New Crop
            </div>
            <div className="p-6">
              <div className="-mx-4 flex justify-center">
                <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                  <div className="Name flex items-center">
                    <h3 className="text-xl mb-4 mr-4 w-36 text-right">Name:</h3>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <input
                          className="appearance-none block w-96 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* PH */}
                  <div className="PH flex items-center">
                    <h3 className="text-xl mb-4 mr-4 w-48 text-right">PH:</h3>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Minimum
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="text"
                          placeholder="0.0"
                          name="ph_min"
                          onChange={(e)=> setPh_min(e.target.value)}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Maximum
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          placeholder="0.0"
                          name="ph_max"
                          onChange={(e) => setPh_max(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Nitrogen */}
                  <div className="Nitrogen flex items-center">
                    <h3 className="text-xl mb-4 mr-4 w-48 text-right">Nitrogen:</h3>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Minimum
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="text"
                          placeholder="0.0"
                          name="nitro_min"
                          onChange={(e) => setNitro_min(e.target.value)}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Maximum
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          placeholder="0.0"
                          name="nitro_max"
                          onChange={(e) => setNitro_max(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Phosphorus */}
                  <div className="Phosphorus flex items-center">
                    <h3 className="text-xl mb-4 mr-4 w-48 text-right">Phosphorus:</h3>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Minimum
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="text"
                          placeholder="0.0"
                          name="phos_min"
                          onChange={(e) => setPhos_min(e.target.value)}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Maximum
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          placeholder="0.0"
                          name="phos_max"
                          onChange={(e) => setPhos_max(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Potassium */}
                  <div className="Potassium flex items-center">
                    <h3 className="text-xl mb-4 mr-4 w-48 text-right">Potassium:</h3>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Minimum
                        </label>
                        <input
                          className="w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="text"
                          placeholder="0.0"
                          name="pot_min"
                          onChange={(e) => setPot_min(e.target.value)}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Maximum
                        </label>
                        <Input
                          className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          placeholder="0.0"
                          name="pot_max"
                          onChange={(e) => setPot_max(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Soil Moisture */}
                  <div className="Soil-Moisture flex items-center">
                    <h3 className="text-xl mb-4 mr-4 w-48 text-right">Soil Moisture:</h3>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Minimum
                        </label>
                        <input
                          className="w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                          type="text"
                          placeholder="0.0"
                          name="soil_min"
                          onChange={(e) => setSoil_min(e.target.value)}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Maximum
                        </label>
                        <input
                          className="w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="text"
                          placeholder="0.0"
                          name="soil_max"
                          onChange={(e) => setSoil_max(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className="bg-green-400 py-4 w-96 -mr-32 rounded-md hover:bg-green-300" type="submit">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default CreateCrop