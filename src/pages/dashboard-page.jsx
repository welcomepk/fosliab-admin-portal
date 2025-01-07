import CredentekLogo from "@/assets/images/credentek-logo.png";

function DashboardPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center pb-20 gap-14" >
      <h1 className="text-cBrand text-center text-3xl font-sans">Doorstep Account Management <br /> By</h1>
      <img src={CredentekLogo} alt="Credentek Logo" className="w-[400px] h-auto" />
    </div>
  )
}

export default DashboardPage