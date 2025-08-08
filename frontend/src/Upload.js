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
      <div className="w-10/12 px-8">
        <p className="text-2xl py-4">File Uploader</p>
        <div>
	  <input type="file"
                 class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition-colors"
                 onChange={onFileChange}/>

          <p class="mt-1 text-sm text-gray-500">TXT, JPG, PNG or JSON.</p>

          
	  <button onClick={onFileUpload}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Upload</button>
        </div>
      </div>
    </div>
  );
};

export default Upload;
