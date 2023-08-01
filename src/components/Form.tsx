function Form() {
  const handleSubmit = (e: any) => {
    console.log(e);
  };

  const handleInput = (e: any) => {
    console.log(e);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center w-full px-5">
          <label className="uppercase flex flex-col">
            Cardholder name
            <input
              type="text"
              placeholder="e.g. Jane Appleseed"
              onChange={handleInput}
              name="carholder-name"
            />
          </label>
          <label className="uppercase flex flex-col">
            Card number
            <input
              type="text"
              placeholder="e.g. 1234 5678 9123 000"
              onChange={handleInput}
              name="card-number"
            ></input>
          </label>

          <div className="flex flex-row justify-around min-w-0 gap-3">
            <div className="flex flex-col min-w-0 w-1/2">
              <label className="uppercase">Exp. date (MM/YY)</label>
              <div className="flex flex-row justify-center min-w-0 gap-2">
                <input
                  type="text"
                  placeholder="MM"
                  onChange={handleInput}
                  name="card-exp-mm"
                  className="min-w-0 outline outline-1 outline-gray-400 p-2"
                />
                <input
                  type="text"
                  placeholder="YY"
                  onChange={handleInput}
                  name="card-exp-yy"
                  className="min-w-0"
                />
              </div>
            </div>
            <div className="w-1/2">
              <label className="uppercase flex flex-col">CVC</label>
              <input
                type="text"
                placeholder="e.g. 123"
                onChange={handleInput}
                name="card-exp-mm"
                className="w-32"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Form;
