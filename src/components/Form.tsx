interface FormProps {
  setCardName: (name: string) => void;
}

const Form: React.FC<FormProps> = ({ setCardName }) => {
  const handleSubmit = (e: any) => {
    console.log(e);
  };

  const handleInput = (e: any) => {
    const newName = e.target.value;

    if (newName != "") {
      setCardName(e.target.value);
    } else {
      setCardName("Jane Appleseed");
    }
  };
  return (
    <>
      <div className="mt-16 h-full">
        <form onSubmit={handleSubmit} className="h-full">
          <div className="flex flex-col justify-center w-full h-full px-5 gap-5">
            <label className="uppercase flex flex-col tracking-widest text-sm">
              Cardholder name
              <input
                type="text"
                placeholder="e.g. Jane Appleseed"
                onChange={handleInput}
                name="carholder-name"
                className="outline outline-1 outline-gray-400 opacity-50 p-2 mt-2 rounded-lg"
              />
            </label>
            <label className="uppercase flex flex-col tracking-widest text-sm">
              Card number
              <input
                type="text"
                placeholder="e.g. 1234 5678 9123 000"
                onChange={handleInput}
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
                    onChange={handleInput}
                    name="card-exp-mm"
                    className="min-w-0 outline outline-1 outline-gray-400 opacity-50 p-2 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="YY"
                    onChange={handleInput}
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
                  onChange={handleInput}
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
};

export default Form;
