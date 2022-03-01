import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// https://github.com/KaterinaLupacheva/react-progress-bar merci infiniment à cette personne
import ProgressBar from '@ramonak/react-progress-bar';
import FileUpload from './fileupload';
import '../styles/container.css';
import { serveur } from '../const';
import useToken from '../hooks/useToken';

export default function CreateAlbums() {
  const [userSongList, setUserSongList] = useState(null);
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [message, setMessage] = useState(null);
  const [colorMsg, setColorMsg] = useState(null);

  const albumSongs = [];

  const { getToken } = useToken();
  const navigate = useNavigate();

  useEffect(() => {
    const mounted = async () => {
      const token = getToken();
      const res = await fetch(`${serveur}/music/user/0`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setUserSongList(data);
      } else {
        console.log(res);
      }
    };
    mounted();
  }, []);

  const uploadSong = async (event) => {
    event.preventDefault();
    const token = getToken();
    const formData = new FormData();
    formData.append('music', songFile);
    formData.append('image', imageFile);
    const req = new XMLHttpRequest();
    req.open('POST', `${serveur}/music`);
    req.setRequestHeader('Authorization', `Bearer ${token}`);

    req.upload.addEventListener('progress', (e) => {
      setProgress(((e.loaded / e.total) * 100).toFixed());
    });

    req.addEventListener('load', () => {
      if (req.status === 201) {
        setMessage('Téléversement réussi avec succès');
        setColorMsg('#60e026');
      } else {
        setMessage("Une erreur c'est produit lors du téléversement");
        setColorMsg('#f44336');
      }
    });

    req.send(formData);
    navigate('/settings');
    navigate('/create');
  };

  const addSongToAlbum = (event) => {
    event.persist();
    const id = Number(event.target.value);
    if (albumSongs.includes(id)) {
      const idx = albumSongs.indexOf(id);
      albumSongs.splice(idx, 1);
    } else {
      albumSongs.push(id);
    }
  };

  const createAlbum = async (event) => {
    event.preventDefault();
    const token = getToken();
    const res = await fetch(`${serveur}/album`, {
      method: 'POST',
      body: JSON.stringify({
        name: event.target.name.value,
        genre: event.target.genre.value,
        releaseDate: new Date().toISOString().slice(0, 10),
        musicIds: albumSongs,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      navigate('/album');
    } else {
      console.log(res);
    }
  };

  return (
    <div className="main-view-container">
      <div className="section-title">Téléverser une nouvelle musique</div>
      <form onSubmit={uploadSong}>
        <div className="create-form">
          <div className="create-form-label">Fichier Audio</div>
          <FileUpload
            setSelectedFile={setSongFile}
            id="audio"
            acceptedFileTypes={['audio/flac', 'audio/wav']}
          />
          <div className="create-form-label">Cover de la musique</div>
          <FileUpload
            setSelectedFile={setImageFile}
            id="image"
            acceptedFileTypes={[
              'image/png',
              'image/jpeg',
              'image/jpg',
              'image/gif',
            ]}
          />
          <div className="button-container">
            <button className="submit-button" type="submit">
              Téléverser
            </button>
          </div>
          {progress && (
            <>
              <ProgressBar
                completed={progress}
                maxCompleted={100}
                customLabel={`${progress}%`}
                width="50%"
              />
              <p style={{ color: colorMsg }}>{message}</p>
            </>
          )}
        </div>
      </form>
      <div className="section-title">Créé un nouvel album</div>
      <form onSubmit={createAlbum}>
        <div className="create-form-label">Nom de l&apos;album:</div>
        <input className="create-text" name="name" type="text" />
        <div className="create-form-label">Genre:</div>
        <input className="create-text" name="genre" type="text" />
        <div className="create-form-label">Vos musiques:</div>
        {userSongList?.map((item) => (
          <div key={item.id}>
            <input
              className="form-checkbox"
              onClick={addSongToAlbum}
              type="checkbox"
              name={item.id}
              id={item.id}
              value={item.id}
            />
            <label htmlFor={item.id}>{item.title}</label>
          </div>
        ))}
        <div className="button-container" style={{ paddingTop: '1rem' }}>
          <button className="submit-button" type="submit">
            Créé l&apos;album
          </button>
        </div>
      </form>
    </div>
  );
}
