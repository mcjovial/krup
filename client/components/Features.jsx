import Image from "next/image"
import feature1 from "../public/images/feature1.png"
import feature2 from "../public/images/feature2.png"
import feature3 from "../public/images/feature3.png"
import feature4 from "../public/images/feature4.png"
import footer from "../public/images/footer.png"

const Features = () => {
  const features = [feature1, feature2, feature3, feature4]
  return (
    <>
      <div className="bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <p className="w-60 text-3xl lg:py-14 pt-14 text-center">Core Features</p>
            <hr className="my-4 mx-auto lg:w-full h-px bg-black rounded border-0"/>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:mx-52 pb-14">
            {/* {
              features.map(feature => {
                <Image src={feature} alt="alt" />
              })
            } */}
            <Image src={feature1} alt="alt"/>
            <Image src={feature2} alt="alt"/>
            <Image src={feature3} alt="alt"/>
            <Image src={feature4} alt="alt"/>
          </div>
        </div>
      </div>
      <div className="mt-14">
        <Image className="w-full" src={footer} alt="footer" />
      </div>
    </>
  )
}

export default Features