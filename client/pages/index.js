import Image from "next/image";
import About from "../components/About";
import Header from "../components/Header";
import AboutVideo from "../public/images/Video.png"


export default function Home() {
  return (
    <>
      <Header />
      <About />
      {/* <div className="bg-slate-300">
        <div className="flex md:flex-col flex-row items-center container mx-auto px-4">
          <div className="text-slate-700 md:text-center">
            <h2 className="text-3xl mb-4 md:mt-14">About Krupt</h2>
            <p className="lg:max-w-lg lg:mr-60 text-base">
              Lorem ipsum dolor sit amet consectetur. Rhoncus duis lectus in aliquet dapibus varius egestas vulputate. 
  Id tristique phasellus volutpat sollicitudin urna venenatis. 

  Elementum scelerisque platea est eget donec id sagittis blandit vestibulum. Mauris lorem ultrices sed porttitor quis. Odio vitae dictumst a risus ligula semper. 

  Vel amet volutpat dui platea amet elit euismod. <span className="text-red-500">Read More...</span>
            </p>
          </div>
            <Image className="py-14 relative right-0" src={AboutVideo} alt="alt" width="600px"/>
        </div>
      </div> */}
    </>
  )
}