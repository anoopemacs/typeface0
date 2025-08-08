def write_file_to_disk(file0, diskname0):
    with open(f"uploaded_files/{diskname0}", "wb+") as destination:
        for chunk in file0.chunks():
            destination.write(chunk)
