import React, {useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
function MyForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const styles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // alignItems: "center",
    width: "100%",
    gap: "20px",
    borderRadius:"20px"
  };
  // useEffect=(()=>{setMove(false)},[])
  const [move, setMove] = useState(false);
  const[status,setStatus]=useState(true)
  console.log(move);
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    image1: null,
    image2: null,
    address: "",
    DOB: "",
    Adhaar:"",
    Gender:""
  });
  const openModal = () => {
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setStatus(false)
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageUploadFront = async (e) => {
    const { name, files } = e.target;
    const imageFile = files[0];
  
    if (imageFile) {
      setFormData({
        ...formData,
        [name]: imageFile,
      });
  
      try {
        const formData = new FormData();
        formData.append('file', imageFile);
  
        const response = await axios.post('YOUR_API_ENDPOINT_URL', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  
    // getUser(); // This line can be removed if not needed.
  };
  
  const handleImageUploadBack = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
    // getUser();
  };
  const generateFormDataList = () => {
    const formDataList = [];
    for (const key in formData) {
      let value = formData[key];
  
      // Check if the value is a File object and convert it to a string
      if (value instanceof File) {
        value = value.name; // Display the file name
      }
  
      formDataList.push(
        <div key={key}>
          <strong>{key}:</strong> {value}
          </div>
        );
      }
    return formDataList;
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    openModal();
    
    

  };

  async function getUser() {
    try {
      const response = await axios.post('https://api.ocr.space/parse/imageurl?apikey=helloworld&url=https://content.jdmagicbox.com/comp/dinajpur/m4/9999p3524.3524.181012211626.v7m4/catalogue/ershad-adhar-centre-dinajpur-aadhaar-card-agents-gqwff0s4do.jpg?time=1664443799&language=chs&isOverlayRequired=true');
      console.log(response.data.ParsedResults[0]);
    } catch (error) {
      console.error(error);
    }
  }

  return ( <>
  <div style={{display:'flex'}} className="main">
    <div className="sidebar"><h3>Welcome Back</h3></div>
    <div className="FormBody">
      <form onSubmit={handleSubmit} className="form">
        <h2>Onboarding Form</h2>
        <div style={styles}>
          {move ? (
            <>
              <label htmlFor="Name"><strong>Name:</strong></label>
              <input
                type="text"
                required
                placeholder="Enter Name"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                readOnly={status}
              />
              <label htmlFor="DOB"><strong>DOB:</strong></label>
              <input
                type="text"
                id="DOB"
                placeholder="DOB"
                required
                name="DOB"
                value={formData.DOB}
                onChange={handleInputChange}
                readOnly={status}
              />
                <label htmlFor="Gender"><strong>Gender:</strong></label>
              <input
                type="text"
                id="Gender"
                placeholder="Gender"
                required
                name="Gender"
                value={formData.Gender}
                onChange={handleInputChange}
                readOnly={status}
              />
                <label htmlFor="Adhaar"><strong>Adhaar Number:</strong></label>
              <input
                type="text"
                id="Adhaar"
                placeholder="Adhaar"
                required
                name="Adhaar"
                value={formData.Adhaar}
                onChange={handleInputChange}
                readOnly={status}
              />
              <label htmlFor="address"><strong>Address:</strong></label>
              <input
                type="text"
                id="address"
                placeholder="Enter Address"
                required
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                readOnly={status}
              />
              <label htmlFor="numberInput"><strong>Phone No.:</strong></label>
              <input
                type="number"
                placeholder="Enter Phone no."
                required
                id="Phone"
                pattern="^[0-9-+\s()]*$"
                name="Phone"
                value={formData.Phone}
                onChange={handleInputChange}
                readOnly={status}
              />
            </>
          ) : (
            <>
              <label htmlFor="image1"><strong>Adhar Front Side-</strong></label>
              <input
                type="file"
                id="image1"
                name="image1"
                accept="image/*"
                onChange={handleImageUploadFront}
              />
                {formData.image1 && (
                    <img
                      src={URL.createObjectURL(formData.image1)}
                      alt="Adhar Front Side"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  )}
              <label htmlFor="image2"><strong>Adhar Back Side-</strong></label>
              <input
                type="file"
                id="image2"
                name="image2"
                accept="image/*"
                onChange={handleImageUploadBack}
              />
               {formData.image2 && (
                    <img
                      src={URL.createObjectURL(formData.image2)}
                      alt="Adhar Back Side"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    />
                  )}
              {/* <button className="" type="button" onClick={console.log(formData)}>
          Upload Files
        </button> */}
            </>
          )}
        </div>
        
        {move ? (
          <>
            <div style={{display:'flex',gap:'20px'}}>
            <button
              type="submit"
              // onClick={openModal}
              style={{ height: "30px", width: "100px", borderRadius: "20px" }}
            >
              Submit
            </button>
            <button
              onClick={() => setMove(false)}
              style={{ height: "30px", width: "100px", borderRadius: "20px" }}
            >
              Back
            </button>
            </div>
          </>
        ) : (
          <button
            style={{ height: "30px", width: "100px", borderRadius: "20px" }}
            onClick={() => setMove(true)}
          >
            Next
          </button>
        )}
      </form>
    </div>
    {isModalOpen && (
  <div className="modal">
    <div className="modal-content">
     <div className="modalHeader"> <h3 style={{color:'red'}} >Confirm your Details</h3>
      <h3 onClick={closeModal} style={{cursor:"pointer"}} >X</h3>
      </div>
      {generateFormDataList()}
      <button onClick={closeModal}>Edit</button>
      <button onClick={closeModal}>Submit</button>
    </div>
  </div>
  
)}
</div>
    </>
  );
}

export default MyForm;
