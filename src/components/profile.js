import React, { useEffect, useState } from 'react';
// https://github.com/KaterinaLupacheva/react-progress-bar merci infiniment à cette personne
import ProgressBar from '@ramonak/react-progress-bar';
import { serveur } from '../const';
import useToken from '../hooks/useToken';
import '../styles/home.css';
import '../styles/search.css';
import '../styles/song.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [progress, setProgress] = useState();
  const { getToken } = useToken();

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetch(`${serveur}/user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        console.log(data);
      }
    };
    getUserInfo();
  }, []);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmission = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    // const res = await fetch(`${serveur}/music`, {
    //   method: 'POST',
    //   body: formData,
    //   headers: {
    //     Authorization: `Bearer ${getToken()}`,
    //   },
    // });

    // if (res.ok) {
    //   console.log(res);
    //   setIsSuccessfull(true);
    // } else {
    //   console.error(res.statusText);
    //   setIsSuccessfull(false);
    // }
    const req = new XMLHttpRequest();
    req.open('POST', `${serveur}/music`);
    req.setRequestHeader('Authorization', `Bearer ${getToken()}`);

    // upload progress event
    req.upload.addEventListener('progress', (e) => {
      // upload progress as percentage
      setProgress(((e.loaded / e.total) * 100).toFixed());
    });

    // request finished event
    req.addEventListener('load', () => {
      // HTTP status message (200, 404 etc)
      console.log(req.status);

      // request.response holds response from the server
      console.log(req.response);
    });

    // send POST request to server
    req.send(formData);
  };

  return (
    <div className="albuminfo-container">
      <div className="albuminfo-header">
        <img
          className="albuminfo-image"
          src={user?.pic ?? './bunny.png'}
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
        <input type="file" name="file" onChange={changeHandler} />
        {isSelected ? (
          <div>
            <p>Filename: {selectedFile.name}</p>
            <p>setIsFilePickedFiletype: {selectedFile.type}</p>
            <p>Size in bytes: {selectedFile.size}</p>
            <p>
              lastModifiedDate:{' '}
              {selectedFile.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div>
          <button type="submit" onClick={handleSubmission}>
            Submit
          </button>
        </div>
        {progress && (
          <ProgressBar
            completed={progress}
            maxCompleted={100}
            customLabel={`${progress} %`}
          />
        )}{' '}
      </div>{' '}
    </div>
  );
}