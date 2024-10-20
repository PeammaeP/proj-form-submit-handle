import React from "react";

const API = `https://65a25d5342ecd7d7f0a771bd.mockapi.io/users`;

// const fetchAPI = async (API) => {
//   const data = await fetch(API).then((res) => res.json());
//   return data;
// };

const App = () => {
  const [dataForm, setDataForm] = React.useState({
    fullName: " ",
    gender: " ",
    id: " ",
    imageUrl: " ",
    interests: [],
  });

  const [isSubmitForm, setIsSubmitForm] = React.useState(false);

  // handleChange with Checkbox handle
  // smart handle checkbox !!!
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // console.log(value);
    if (type == "checkbox") {
      setDataForm((prevState) => ({
        ...prevState,
        interests: checked
          ? [...(prevState.interests || []), value]
          : (prevState.interests || []).filter(
              (interest) => interest !== value
            ),
      }));
    } else {
      setDataForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm),
      });
      if (postData.ok) {
        setIsSubmitForm(true);
        setTimeout(() => setIsSubmitForm(false), 3000);
      }
    } catch {
      console.log("Error to POST API");
    }
  };

  React.useEffect(() => {
    const getData = async () => {
      console.log(dataForm);
    };

    const loadingTimeOut = setTimeout(() => {
      getData();
    }, 1000);
    return () => clearTimeout(loadingTimeOut);
  }, [dataForm]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form
        className="bg-white p-8 rounded-lg shadow-lg w-96"
        onSubmit={handleSubmit}
      >
        {/* {isSubmitForm && (
          <div className="bg-green-500 font-mono text-white rounded-lg mt-4 p-4">
            ส่งข้อมูลสำเร็จ
          </div>
        )} */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="mt-2 p-2 w-full border rounded-lg"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="mt-2 p-2 w-full border rounded-lg"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                className="form-radio"
                onChange={handleChange}
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="gender"
                value="Female"
                className="form-radio"
                onChange={handleChange}
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700">Interests</label>
          <div className="mt-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                name="interests"
                value="Coding"
                className="form-checkbox"
                onChange={handleChange}
              />
              <span className="ml-2">Coding</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input
                type="checkbox"
                name="interests"
                value="Music"
                className="form-checkbox"
                onChange={handleChange}
              />
              <span className="ml-2">Music</span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>

        {isSubmitForm && (
          <div className="bg-green-500 font-mono text-white rounded-lg mt-4 p-4">
            ส่งข้อมูลสำเร็จ
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
