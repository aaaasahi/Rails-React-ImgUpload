import UploadService from "./UploadService";
import React, { useState, useEffect } from "react";

export const UploadImages = () => {
  const [currentFile, setCurrentFile] = useState(undefined);
  const [previewImage, setPreviewImage] = useState(undefined);
  const [imageInfos, setImageInfos] = useState([]);
  const [progress, setProgress] = useState(0);

  const selectFile = (event) => {
    setCurrentFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setProgress(0);
  };

  const upload = () => {
    setProgress(0);
    setCurrentFile(currentFile);

    UploadService.upload(currentFile, (event) => {
      setProgress(Math.round((100 * event.loaded) / event.total));
    })
      .then(() => {
        return UploadService.getFiles();
      })
      .then((files) => {
        setImageInfos(files.data);
        console.log(files.data);
      })
      .catch(() => {
        setProgress(0);
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

      {currentFile && (
        <div className="progress my-3">
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}

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
