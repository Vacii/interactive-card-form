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

function Form({ setFormData, formData }: FormProps) {
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    if (name === "card-number")
      e.target.value = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    console.log(e.target.value);

    // if (name === 'number') e.target.value = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19)
    // if (name === 'mm' || name === 'yy') e.target.value = value.toString().replace(/[^0-9]/g, '').substring(0, 2)
    // if (name === 'mm' && value > 12) e.target.value = '12'
    // if (name === 'cvc') e.target.value = value.substring(0, 4)

    setFormData({ ...formData, [name]: e.target.value });
  };

  return (
    <>
      <div className="mt-16 h-full">
        <form className="h-full">
          <div className="flex flex-col justify-center w-full h-full px-5 gap-5">
            <label className="uppercase flex flex-col tracking-widest text-sm">
              Cardholder name
              <input
                type="text"
                onChange={handleInput}
                placeholder="e.g. Jane Appleseed"
                name="carholder-name"
                className="outline outline-1 outline-gray-400 opacity-50 p-2 mt-2 rounded-lg"
              />
            </label>
            <label className="uppercase flex flex-col tracking-widest text-sm">
              Card number
              <input
                type="text"
                onChange={handleInput}
                placeholder="e.g. 1234 5678 9123 000"
                name="card-number"
                className="outline outline-1 outline-gray-400 opacity-50 p-2 mt-2 rounded-lg"
              ></input>
            </label>

            <div className="flex flex-row justify-around min-w-0 gap-3">
              <div className="flex flex-col min-w-0 w-1/2">
                <label className="uppercase tracking-widest text-sm">
                  Exp. date (MM/YY)
                </label>
                <div className="flex flex-row justify-center min-w-0 gap-2 mt-2">
                  <input
                    type="text"
                    placeholder="MM"
                    name="card-exp-mm"
                    className="min-w-0 outline outline-1 outline-gray-400 opacity-50 p-2 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="YY"
                    name="card-exp-yy"
                    className="min-w-0 outline outline-1 outline-gray-400 opacity-50 p-2 rounded-lg"
                  />
                </div>
              </div>
              <div className="w-1/2 min-w-0">
                <label className="uppercase flex flex-col tracking-widest text-sm">
                  CVC
                </label>
                <input
                  type="text"
                  placeholder="e.g. 123"
                  name="card-exp-mm"
                  className="min-w-0 w-full outline outline-1 outline-gray-400 opacity-50 p-2 mt-2 rounded-lg"
                />
              </div>
            </div>
            <button className="w-full bg-[#21092f] text-[#dedddf] mt-2 p-3 rounded-xl">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
