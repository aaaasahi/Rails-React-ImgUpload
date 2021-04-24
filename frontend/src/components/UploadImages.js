import UploadService from "./UploadService";
import React, { useState, useEffect } from "react";

export const UploadImages = () => {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [imageInfos, setImageInfos] = useState([]);

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const upload = () => {
    setCurrentFile(currentFile);

    UploadService.upload(currentFile, () => {
    })
      .then(() => {
        return UploadService.getFiles();
      })
      .then((files) => {
        setImageInfos(files.data);
      })
      .catch(() => {
        setCurrentFile(undefined);
      });
  };

  useEffect(() => {
    UploadService.getFiles().then((response) => {
      setImageInfos(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <label className="btn btn-default p-0">
            <input type="file" accept="image/*" onChange={selectFile} />
          </label>
        </div>

        <div className="col-4">
          <button
            className="btn btn-danger btn-sm"
            disabled={!currentFile}
            onClick={upload}
          >
            Upload
          </button>
        </div>
      </div>
      
      {previewImage && (
        <div>
          <img className="preview" src={previewImage} alt="" />
        </div>
      )}

      <div className="card mt-3">
        <div className="card-header">List</div>
        <ul className="list-group list-group-flush">
          {imageInfos &&
            imageInfos.map((img, index) => (
              <li className="list-group-item" key={index}>
                <img
                  src={`http://localhost:8000/${img.file.url}`}
                  alt={img.name}
                  height="80px"
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
