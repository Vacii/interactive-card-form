import { useState } from "react";
import Form from "./components/Form";

function App() {
  const [formData, setFormData] = useState({
    cardHolderName: "Jane Appleseed",
    cardNumber: "0000 0000 0000 0000",
    cardExpMM: "00",
    cardExpYY: "00",
    cvc: "000",
  });

  return (
    <>
      <div className="h-full flex flex-col justify-start">
        <img src="src/assets/bg-main-mobile.png" alt="fade-background" />
        <div className="absolute right-4 top-10 bg-card-back bg-cover h-[10rem] w-[18rem] rounded-md">
          <p className="absolute text-white text-xs tracking-widest w-10 text-center right-7 top-[4.36rem] opacity-80">
            {formData.cvc}
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
              {formData.cardNumber}
            </p>
            <div className="flex justify-between w-full">
              <p className="text-white uppercase tracking-widest text-xs opacity-70">
                {formData.cardHolderName}
              </p>
              <p className="text-white text-xs opacity-70">
                {formData.cardExpMM}/{formData.cardExpYY}
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
