import React, { useState, useEffect } from 'react';
import MusicList from './music-list';
import FileUpload from './fileupload';
import '../styles/container.css';
import { serveur } from '../const';
import useToken from '../hooks/useToken';

export default function CreateAlbums() {
  const [userSongList, setUserSongList] = useState(null);
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const { getToken } = useToken();

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

  return (
    <div className="main-view-container">
      <div className="section-title">
        Upload a new song
      </div>
      <form onSubmit={uploadSong}>
        <div className="create-form">
          <div className="create-form-label">song audio file</div>
          <FileUpload
            setSelectedFile={setSongFile}
            id="audio"
            acceptedFileTypes={[
              'audio/flac',
              'audio/wav',
            ]}
          />
          <div className="create-form-label">song cover image</div>
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
            <button className="submit-button" type="submit">Submit</button>
          </div>
        </div>
      </form>
      <div className="section-title">
        Create a new album
      </div>
      <form onSubmit={uploadSong}>
        {/* <input type="submit" value="XD" /> */}
      </form>
      <div className="section-title">
        User's songs
      </div>
      <MusicList music={userSongList} />
    </div>
  );
}
