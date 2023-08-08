import { useState } from "react";
import Form from "./components/Form";

function App() {
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    cardExpMM: "",
    cardExpYY: "",
    cvc: "",
  });

  return (
    <>
      <div className="h-full flex flex-col sm:flex-row justify-start sm:justify-between">
        <img
          src="src/assets/bg-main-mobile.png"
          alt="fade-background"
          className="sm:hidden"
        />
        <img
          src="src/assets/bg-main-desktop.png"
          alt=""
          className="hidden sm:block w-2/5"
        />
        <div className="absolute right-4 sm:left-10 top-10 sm:top-64 bg-card-back bg-cover h-[10rem] w-[18rem] rounded-md">
          <p className="absolute text-white text-xs tracking-widest w-10 text-center right-7 top-[4.36rem] opacity-80">
            {formData.cvc || "000"}
          </p>
        </div>
        <div className="absolute left-4 top-32 bg-card-front bg-cover h-[10rem] w-[18rem] rounded-md">
          <div className="flex flex-col gap-4 justify-center w-full h-full p-5">
            <img
              src="src/assets/card-logo.svg"
              alt="card-logo"
              className="w-[3.5rem] h-[2rem] mb-5"
            />
            <p className="text-white text-[1.15rem] tracking-widest opacity-80">
              {formData.cardNumber || "0000 0000 0000 0000"}
            </p>
            <div className="flex justify-between w-full">
              <p className="text-white uppercase tracking-widest text-xs opacity-70">
                {formData.cardHolderName || "Jane Appleseed"}
              </p>
              <p className="text-white text-xs opacity-70">
                {formData.cardExpMM || "00"}/{formData.cardExpYY || "00"}
              </p>
            </div>
          </div>
        </div>

        <Form formData={formData} setFormData={setFormData} />
      </div>
    </>
  );
}

export default App;
