import axios from 'axios'

const upload = (file) => {
  let formData = new FormData();

  formData.append('book[file]', file);

  return axios.post("http://localhost:8000/books", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getFiles = () => {
  return axios.get("http://localhost:8000/books");
};

export default {
  upload,
  getFiles,
};