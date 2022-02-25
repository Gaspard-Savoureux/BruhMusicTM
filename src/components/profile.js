import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FileUpload from './fileupload';
// https://github.com/KaterinaLupacheva/react-progress-bar merci infiniment à cette personne
import ProgressBar from '@ramonak/react-progress-bar';
import { serveur } from '../const';
import useToken from '../hooks/useToken';
import '../styles/container.css';
import '../styles/form-components.css';
import '../styles/song.css';

export default function Profile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [progress, setProgress] = useState();
  const { getToken } = useToken();

  // FIXME it dont work
  const handleSubmission = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedFile);

    const res = await fetch(`${serveur}/user/profileImage`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (res.ok) {
      console.log(res);
    } else {
      console.error(res.statusText);
    }
    //   const req = new XMLHttpRequest();
    //   req.open('PUT', `${serveur}/user/profileImage`);
    //   req.setRequestHeader('Authorization', `Bearer ${getToken()}`);

    //   // upload progress event
    //   req.upload.addEventListener('progress', (e) => {
    //     // upload progress as percentage
    //     setProgress(((e.loaded / e.total) * 100).toFixed());
    //   });

    //   // request finished event
    //   req.addEventListener('load', () => {
    //     // HTTP status message (200, 404 etc)
    //     console.log(req.status);

    //     // request.response holds response from the server
    //     console.log(req.response);
    //   });

    //   // send POST request to server
    //   req.send(formData);
    //   console.log(req);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      // TODO get user by id
      const res = await fetch(`${serveur}/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser({ ...data, image: `${serveur}/uploads/${data.image}` });
        console.log(data);
      }
    };
    getUserInfo();
  }, []);

  return (
    <div className="albuminfo-container">
      <div className="albuminfo-header">
        <img
          className="albuminfo-image"
          src={user?.image ?? './bunny.png'}
          alt="album cover"
        />
        <div className="albuminfo-infobox">
          <div className="albuminfo-title">{user?.username ?? ''}</div>
          <div className="albuminfo-artist">
            followers: {user?.followers ?? ''}
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmission}>
          <FileUpload
            setSelectedFile={setSelectedFile}
            acceptedFileTypes={[
              'image/png',
              'image/jpeg',
              'image/jpg',
              'image/gif',
            ]}
          />
          <br />
          <input type="submit" value="XD" />
        </form>
      </div>
    </div>
  );
}
