import React, { useRef, useState } from "react";
import Spinner from "./Spinner";

interface FormData {
  cardHolderName: string;
  cardNumber: string;
  cardExpMM: string;
  cardExpYY: string;
  cvc: string;
}

interface FormProps {
  setFormData: (data: FormData) => void;
  formData: FormData;
}

const Form: React.FC<FormProps> = ({ setFormData, formData }) => {
  const cardExpMMRef = useRef<HTMLInputElement>(null);
  const cardExpYYRef = useRef<HTMLInputElement>(null);
  const cardCVCRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    cardHolderName: string;
    cardNumber: string;
    cardExp: string;
    cvc: string;
  }>({
    cardHolderName: "",
    cardNumber: "",
    cardExp: "",
    cvc: "",
  });

  function isValidCardNumber(cardNumber: string): boolean {
    const cleanedCardNumber = cardNumber.replace(/\s/g, ""); // Remove spaces
    const numDigits = cleanedCardNumber.length;

    if (numDigits < 13 || numDigits > 19) {
      return false;
    }

    let sum = 0;
    let isEven = false;

    for (let i = numDigits - 1; i >= 0; i--) {
      const digit = parseInt(cleanedCardNumber.charAt(i), 10);

      if (isEven) {
        let doubledDigit = digit * 2;
        if (doubledDigit > 9) {
          doubledDigit -= 9;
        }
        sum += doubledDigit;
      } else {
        sum += digit;
      }

      isEven = !isEven;
    }
    return sum % 10 === 0;
  }

  function isValidCardExpiration(expMM: string, expYY: string): boolean {
    const currentYear = new Date().getFullYear() % 100;
    const cardYear = parseInt(expYY, 10);

    // Check if the expiration year is not in the past
    if (cardYear < currentYear) {
      return false;
    }

    // Check if the expiration year is in the current year and the month is not in the past
    if (cardYear === currentYear) {
      const cardMonth = parseInt(expMM, 10);
      const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed in JavaScript

      if (cardMonth < currentMonth) {
        return false;
      }
    }

    return true;
  }

  function isValidCVC(cvc: string): boolean {
    // CVC should be a three-digit number
    const cvcRegex = /^\d{3}$/;
    return cvcRegex.test(cvc);
  }

  const handleSubmit = () => {
    const newErrors: {
      cardHolderName: string;
      cardNumber: string;
      cardExp: string;
      cvc: string;
    } = {
      cardHolderName: "",
      cardNumber: "",
      cardExp: "",
      cvc: "",
    };

    // Validate cardHolderName
    if (!formData.cardHolderName) {
      newErrors.cardHolderName = "Cardholder name can't be blank";
    }

    // Validate cardNumber
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number can't be blank";
    } else if (!isValidCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = "Invalid card number";
    }

    // Validate card expiration
    if (!formData.cardExpMM || !formData.cardExpYY) {
      newErrors.cardExp = "Date can't be blank";
    } else if (!isValidCardExpiration(formData.cardExpMM, formData.cardExpYY)) {
      newErrors.cardExp = "Invalid expiration date";
    }

    // Validate CVC
    if (!formData.cvc) {
      newErrors.cvc = "CVC can't be blank";
    } else if (!isValidCVC(formData.cvc)) {
      newErrors.cvc = "Invalid CVC";
    }
    console.log(newErrors);
    setIsLoading(true);
    document.getElementById("card-details")?.classList.add("hidden");

    setTimeout(() => {
      setIsLoading(false);
      const formDataValidity = Object.values(newErrors).every(
        (value) => value === ""
      );

      if (!formDataValidity) {
        document.getElementById("card-details")?.classList.remove("hidden");
      } else {
        document.getElementById("thanks-section")?.classList.remove("hidden");
      }

      console.log(formDataValidity);
    }, 500);

    setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const maxLength = {
      cardHolderName: 20,
      cardNumber: 19,
      cardExpMM: 2,
      cardExpYY: 2,
      cvc: 3,
    };

    if (name === "cardHolderName") {
      e.target.value = value.substring(0, maxLength.cardHolderName);
    } else if (name === "cardNumber") {
      e.target.value = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .slice(0, maxLength.cardNumber);
    } else if (name === "cardExpMM") {
      e.target.value = value
        .toString()
        .replace(/[^0-9]/g, "")
        .substring(0, maxLength.cardExpMM);
      if (e.target.value > "12") {
        e.target.value = "12";
      }
      if (e.target.value.length >= maxLength.cardExpMM) {
        cardExpYYRef.current?.focus();
      }
    } else if (name === "cardExpYY") {
      e.target.value = value
        .toString()
        .replace(/[^0-9]/g, "")
        .substring(0, maxLength.cardExpYY);
      if (e.target.value.length <= 0) {
        cardExpMMRef.current?.focus();
      }
      if (e.target.value.length >= maxLength.cardExpYY) {
        cardCVCRef.current?.focus();
      }
    } else if (name === "cvc") {
      e.target.value = value
        .toString()
        .replace(/[^0-9]/g, "")
        .substring(0, maxLength.cvc);
      if (e.target.value.length <= 0) {
        cardExpYYRef.current?.focus();
      }
    }

    setFormData({ ...formData, [name]: e.target.value });
  };

  return (
    <div className="h-full w-full sm:flex sm:justify-center">
      {isLoading && <Spinner />}
      <form id="card-details" className="h-full mt-6 sm:m-0 sm:ml-10 sm:w-96">
        <div className="flex flex-col justify-center w-full h-full px-5 gap-5">
          <label className="uppercase flex flex-col tracking-widest text-sm">
            Cardholder name
            <input
              type="text"
              onChange={handleInput}
              placeholder="e.g. Jane Appleseed"
              name="cardHolderName"
              className="outline outline-1 outline-gray-400 opacity-50 p-2 mt-2 rounded-lg focus:outline-[#21092f]"
            />
            {errors.cardHolderName && (
              <p className="normal-case tracking-normal pt-1 text-[#ff5252]">
                {errors.cardHolderName}
              </p>
            )}
          </label>
          <label className="uppercase flex flex-col tracking-widest text-sm">
            Card number
            <input
              type="text"
              onChange={handleInput}
              placeholder="e.g. 1234 5678 9123 000"
              name="cardNumber"
              className="outline outline-1 outline-gray-400 opacity-50 p-2 mt-2 rounded-lg focus:outline-[#21092f]"
            />
            {errors.cardNumber && (
              <p className="normal-case tracking-normal text-sm pt-1 text-[#ff5252]">
                {errors.cardNumber}
              </p>
            )}
          </label>

          <div className="flex flex-row justify-around min-w-0 gap-3">
            <div className="flex flex-col min-w-0 w-1/2">
              <label className="uppercase tracking-widest text-sm">
                Exp. date (MM/YY)
              </label>
              <div className="flex flex-row justify-center min-w-0 gap-2 mt-2">
                <input
                  type="text"
                  onChange={handleInput}
                  placeholder="MM"
                  name="cardExpMM"
                  ref={cardExpMMRef}
                  className="min-w-0 outline outline-1 outline-gray-400 opacity-50 p-2 rounded-lg focus:outline-[#21092f]"
                />

                <input
                  type="text"
                  onChange={handleInput}
                  placeholder="YY"
                  name="cardExpYY"
                  ref={cardExpYYRef}
                  className="min-w-0 outline outline-1 outline-gray-400 opacity-50 p-2 rounded-lg focus:outline-[#21092f]"
                />
              </div>
              {errors.cardExp && (
                <p className="normal-case tracking-normal text-sm pt-1 text-[#ff5252]">
                  {errors.cardExp}
                </p>
              )}
            </div>
            <div className="w-1/2 min-w-0">
              <label className="uppercase flex flex-col tracking-widest text-sm">
                CVC
              </label>
              <input
                type="text"
                onChange={handleInput}
                placeholder="e.g. 123"
                name="cvc"
                ref={cardCVCRef}
                className="min-w-0 w-full outline outline-1 outline-gray-400 opacity-50 p-2 mt-2 rounded-lg focus:outline-[#21092f]"
              />
              {errors.cvc && (
                <p className="normal-case tracking-normal pt-1 text-sm text-[#ff5252]">
                  {errors.cvc}
                </p>
              )}
            </div>
          </div>
          <button
            className="w-full bg-[#21092f] text-[#dedddf] mt-2 p-3 rounded-xl"
            type="button"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </form>
      <div id="thanks-section" className="hidden h-full">
        <div className="flex flex-col h-full justify-center items-center text-center px-5 gap-8">
          <img src="./src/assets/icon-complete.svg" alt="complete-icon" />
          <div className="flex flex-col justify-center gap-3">
            <h1 className="uppercase text-3xl tracking-wider ">Thank you!</h1>
            <p className="text-[#8e8593]">We've added your card details</p>
          </div>

          <button
            className="w-full bg-[#21092f] text-[#dedddf] mt-2 p-3 rounded-lg"
            type="button"
            onClick={() => {
              window.location.reload();
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
