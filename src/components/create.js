import React, { useState, useEffect } from 'react';
import MusicList from './music-list';
import FileUpload from './fileupload';
import '../styles/container.css';
import { serveur } from '../const';
import useToken from '../hooks/useToken';

export default function CreateAlbums() {
  const [userSongList, setUserSongList] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

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
    // TODO make this request work
    const res = await fetch(`${serveur}/upload/song`, {
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

  return (
    <div className="main-view-container">
      <div className="section-title">
        Upload a new song
      </div>
      <form onSubmit={uploadSong}>
        <div className="create-form">
          <FileUpload setSelectedFile={setSelectedFile} acceptedFileTypes={['image/png']} />
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
