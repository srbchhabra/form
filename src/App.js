import React, { useEffect, useState } from "react";
import "./App.css";
function MyForm() {
  const styles = {
    display: "flex",
    flexDirection: 'column',
    justifyContent: "space-between",
    // alignItems: "center",
    width: "100%",
    gap: '20px'
  };
  useEffect=(()=>{setMove(false)},[])
  const [move, setMove] = useState(false);
  console.log(move)
  const [formData, setFormData] = useState({
    textInput: "",
    numberInput: "",
    image1: null,
    image2: null,
    address: "",
    fatherName: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Saved Succesfully");
  };

  return (
    <div className="FormBody">
      <form onSubmit={handleSubmit} className="form">
        <h2>Form</h2>
        <div style={styles}>
          {move ? (
            <>
              <label htmlFor="textInput">Name:</label>
              <input
                type="text"
                required
                placeholder="Enter Name"
                id="textInput"
                name="textInput"
                value={formData.textInput}
                onChange={handleInputChange}
              />
              <label htmlFor="fatherName">Father Name:</label>
              <input
                type="text"
                id="fatherName"
                placeholder="Enter father name"
                required
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
              />
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                placeholder="Enter Address"
                required
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <label htmlFor="numberInput">Phone No.:</label>
              <input
                type="number"
                placeholder="Enter Phone no."
                required
                id="numberInput"
                pattern="^[0-9-+\s()]*$"
                name="numberInput"
                value={formData.numberInput}
                onChange={handleInputChange}
              />
            </>
          ) : (
            <>
              <label htmlFor="image1">Adhar Front Side-</label>
              <input
                type="file"
                id="image1"
                name="image1"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label htmlFor="image2">Adhar Back Side-</label>
              <input
                type="file"
                id="image2"
                name="image2"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </>
          )}
        </div>

        {move ? (
      <>    <button
            type="submit"
            style={{ height: "30px", width: "100px", borderRadius: "20px" }}
          >
            Submit
          </button>
          <button
          onClick={() => setMove(false)}
          
          style={{ height: "30px", width: "100px", borderRadius: "20px" }}
        >
          Back
        </button></>
        ) : (
          <button style={{ height: "30px", width: "100px", borderRadius: "20px" }} onClick={() => setMove(true)}>Next</button>

        )}
      </form>
    </div>
  );
}

export default MyForm;
