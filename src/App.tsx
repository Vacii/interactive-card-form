import { useState } from "react";
import Form from "./components/Form";

function App() {
  const [cardName, setCardName] = useState("Jane Appleseed");
  const cardNumber = "0000 0000 0000 0000";
  const cardCVC = "000";
  const cardExpiracyDate = "00/00";

  const updateCardName = (name: string) => {
    setCardName(name);
  };

  return (
    <>
      <div className="h-full flex flex-col justify-start">
        <img src="src/assets/bg-main-mobile.png" alt="fade-background" />
        <div className="absolute right-4 top-10 bg-card-back bg-cover h-[10rem] w-[18rem] rounded-md">
          <p className="absolute text-white text-xs tracking-widest w-10 text-center right-7 top-[4.36rem] opacity-80">
            {cardCVC}
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
              {cardNumber}
            </p>
            <div className="flex justify-between w-full">
              <p className="text-white uppercase tracking-widest text-xs opacity-70">
                {cardName}
              </p>
              <p className="text-white text-xs opacity-70">
                {cardExpiracyDate}
              </p>
            </div>
          </div>
        </div>

        <Form setCardName={updateCardName} />
      </div>
    </>
  );
}

export default App;
