import Image from "next/image"
import hero from "../public/images/Hero.png"
import headerBg from "../public/images/image 1.png"
import headerBg2 from "../public/images/bg2.png"
import Navbar from "./Navbar"
import Link from "next/link"

const Header = () => {
  return (
    <>
      <div className="">
        <Navbar />
        <Image className="z-0 h-screen w-full" src={headerBg} alt="alt" />
        <Image className=" w-full absolute bottom-0 left-0" src={headerBg2} alt="alt" />
        <Image className="absolute bottom-0 right-0" src={hero} alt="alt" />
        
        <div className="lg:absolute bottom-0 mb-20 max-w-md ml-40">
          <h2 className="mb-6 text-6xl tracking-wide text-white leading-tight">The Future of <br/> <span className="text-lime-400">Soil</span>  Productivity</h2>
          <p className="mb-4 text-base text-white md:text-lg">The simplest system to identify and increase productivity of barren soils through analysis</p>
          <div className="inline-flex items-center tracking-wider text-white">
            <a className="bg-red-500 text-sm p-6 mr-4">Get soil insight for free now</a>
            <Link className="tex-sm mx-4" href="/login">Sign In</Link>
          </div>
        </div>
      </div>

    </>
  )
}

export default Header