import React, {useState, useEffect} from 'react';
import SideBar from './SideBar';

/* //The shape of the data we are expecting from the backend
const fileList = [
    {
      "id": 2,
      "filename": "one.txt",
      "file_download_url": "http://localhost:8000/files/download/c47044e2-1246-4c17-8932-9495c073efc5_one.txt",
      "file_view_url": "http://localhost:8000/media/c47044e2-1246-4c17-8932-9495c073efc5_one.txt"
    }
  ]
*/

function File({ filename, fileDownloadUrl, fileViewUrl }) {
  return (
    <li className="flex justify-between content-center items-center evenf:bg-white odd:bg-gray-300 px-2">
      <a href={fileViewUrl}
         target="_blank"
         rel="noreferrer"
         className="hover:text-blue-700">
        {filename}
      </a>
      <a href={fileDownloadUrl}
         className="hover:text-blue-700">
        Download
      </a>
    </li>
  );
}

function FileList() {
  /* Fetch Data from the backend */
  let [fileList, setFileList] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/files/list/")
      .then(response => response.json())
      .then(data => {
        setFileList(data.file_list);
      })
  }, [])
  
  let listOfFiles = fileList.map(file =>
    <File key={file.id}
          filename={file.filename}
          fileDownloadUrl={file.file_download_url}
          fileViewUrl={file.file_view_url} />
  );

  return (
    <div className="w-10/12 px-8">
      <p className="text-2xl py-4">Your uploaded files:-</p>
      <ul className="">
        {listOfFiles}
      </ul>
    </div>
  );
}

function ShowFiles() {
  return (
    <div className="w-full h-full flex">
      <SideBar />
      <FileList />
    </div>
  );
}

export default ShowFiles;
