import logo from './logo.svg';
import './App.css';

const fileList = {
  "file_list": [
    {
      "id": 2,
      "filename": "one.txt",
      "file_download_url": "http://localhost:8000/files/download/c47044e2-1246-4c17-8932-9495c073efc5_one.txt",
      "file_view_url": "http://localhost:8000/media/c47044e2-1246-4c17-8932-9495c073efc5_one.txt"
    }
  ]
}

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
  let listOfFiles = fileList["file_list"].map(file =>
    <File key={file.id}
          filename={file.filename}
          fileDownloadUrl={file.file_download_url}
          fileViewUrl={file.file_view_url} />
  );

  return (
    <div>
      This is the FileList.
      <ul>
        {listOfFiles}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <FileList />
    </div>
  );
}

export default App;
