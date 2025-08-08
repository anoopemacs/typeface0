import SideBar from './SideBar';

function Upload() {
  return (
    <>
      <SideBar />
      <div className="Upload">
        <form action="http://localhost:8000/files/upload/"
              method="post"
              encType="multipart/form-data">
          <input type="file" name="myfile" />
          <input type="submit" name="submit" value="Upload" />
        </form>
      </div>
    </>
  );
}

export default Upload;
