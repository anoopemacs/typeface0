import axios from "axios";
import React, { useState } from "react";
import SideBar from './SideBar';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "myfile",
      selectedFile
    );
    //console.log(selectedFile);
    axios
      .post("http://localhost:8000/files/upload/", formData)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => alert("Error during file upload"));
  };

  return (
    <div className="w-full h-full flex">
      <SideBar />
      <div className="w-10/12 px-8 mt-4">
        <p className="text-2xl py-4">File Uploader</p>
        <div>
	  <input type="file" onChange={onFileChange} />
	  <button onClick={onFileUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
