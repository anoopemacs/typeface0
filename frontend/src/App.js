import React, {useState, useEffect} from 'react';
import SideBar from './SideBar';

import logo from './logo.svg';
import './App.css';

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
    <li>
      {filename}
      &nbsp;
      <a href={fileViewUrl} target="_blank" rel="noreferrer">View</a>
      &nbsp;
      <a href={fileDownloadUrl}>Download</a>
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
    <div>
      You uploaded files:-
      <ul>
        {listOfFiles}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <SideBar />
      <FileList />
    </div>
  );
}

export default App;
