import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FileUpload from './fileupload';
import { serveur } from '../const';
import useToken from '../hooks/useToken';
import '../styles/container.css';
import '../styles/form-components.css';
import '../styles/song.css';

export default function Profile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const { getToken } = useToken();

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
      //setUser({ ...data, image: `${serveur}/uploads/${data.image}` });
    } else {
      console.error(res.statusText);
    }
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
            Abonnées: {user?.followers ?? ''}
          </div>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmission}>
          <div className="">Changez de photo de profil:</div>
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
          <button className="submit-button" type="submit">
            Téléverser
          </button>
        </form>
      </div>
    </div>
  );
}
