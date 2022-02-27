import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicList from './music-list';
import FileUpload from './fileupload';
import '../styles/container.css';
import { serveur } from '../const';
import useToken from '../hooks/useToken';

export default function CreateAlbums() {
  const [userSongList, setUserSongList] = useState(null);
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  // const [albumSongs, setAlbumSongs] = useState(null);
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
    const res = await fetch(`${serveur}/music`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else {
      console.log(res);
    }
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
    console.log(albumSongs);
  };

  const createAlbum = async (event) => {
    event.preventDefault();
    const token = getToken();
    console.log(new Date().toISOString().slice(0, 10));
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
      const data = await res.json();
      navigate('/album');
      console.log(data);
    } else {
      console.log(res);
    }
  };

  return (
    <div className="main-view-container">
      <div className="section-title">Upload a new song</div>
      <form onSubmit={uploadSong}>
        <div className="create-form">
          <div className="create-form-label">Audio file</div>
          <FileUpload
            setSelectedFile={setSongFile}
            id="audio"
            acceptedFileTypes={['audio/flac', 'audio/wav']}
          />
          <div className="create-form-label">Cover image</div>
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
              Upload
            </button>
          </div>
        </div>
      </form>
      <div className="section-title">Create a new album</div>
      <form onSubmit={createAlbum}>
        <div className="create-form-label">Album name:</div>
        <input className="create-text" name="name" type="text" />
        <div className="create-form-label">Genre:</div>
        <input className="create-text" name="genre" type="text" />
        <div className="create-form-label">Songs:</div>
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
            Create album
          </button>
        </div>
      </form>
    </div>
  );
}
