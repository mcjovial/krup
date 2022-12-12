import Image from "next/image"
import AboutVideo from "../public/images/Video.png"

const About = () => {
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="max-w-lg text-center lg:text-left lg:mt-0 text-slate-700 mt-14">
            <h2 className="text-3xl mb-4">About Krupt</h2>
            <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur. Rhoncus duis lectus in aliquet dapibus varius egestas vulputate. 
    Id tristique phasellus volutpat sollicitudin urna venenatis. <br/>

    Elementum scelerisque platea est eget donec id sagittis blandit vestibulum. Mauris lorem ultrices sed porttitor quis. Odio vitae dictumst a risus ligula semper. <br/>

    Vel amet volutpat dui platea amet elit euismod. <span className="text-red-500">Read More...</span>
            </p>
          </div>
          <Image className="py-14 w-1/2" src={AboutVideo} alt="alt"/>
        </div>
      </div>
    </>
  )
}

export default About