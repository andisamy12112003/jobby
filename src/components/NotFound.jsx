import NotFound from "../assets/NotFound.png"
import NotFoundSm from "../assets/NotFoundSm.png"
function NotFoundPage() {
  return (
    <div className="w-[100vw] h-screen flex items-center justify-center bg-black">
      <img src={NotFound} alt="" className=" w-[80vw] h-full max-sm:hidden" />
      <img src={NotFoundSm} alt="" className=" w-[60vw] h-full sm:hidden lg:hidden md:hidden"  />
    </div>
  )
}

export default NotFoundPage