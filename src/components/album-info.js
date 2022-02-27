import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useToken from '../hooks/useToken';
import { serveur } from '../const';
import MusicList from './music-list';
import ModalChangeCover from './modal-change-cover';

import '../styles/album-info.css';

export default function AlbumInfo() {
  // Page pour afficher un album et ses informations
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [ownAlbum, setOwnAlbum] = useState();
  const [modalOpen, setModalOpen] = useState();

  const { getToken } = useToken();

  const token = getToken();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserAlbum = async () => {
      const res = await fetch(`${serveur}/album/user/0`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const { length } = data;
        const idAlbum = [];
        for (let i = 0; i < length; i += 1) {
          idAlbum.push(data[i].id);
        }
        setOwnAlbum(idAlbum.includes(parseInt(id, 10)));
      } else {
        console.log(res);
      }
    };
    if (token) getUserAlbum();

    const getAlbumInfo = async () => {
      const res = await fetch(`${serveur}/album/${id}`);

      if (res.ok) {
        const data = await res.json();
        await setAlbum(data);
      } else {
        console.log(res);
      }
    };

    getAlbumInfo();
    async function getFavorite() {
      const url = `${serveur}/favorite`;
      const content = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await fetch(url, content);

      if (res.ok) {
        const data = await res.json();
        const { length } = data;
        const idFav = [];
        for (let i = 0; i < length; i += 1) {
          idFav.push(data[i].music_id);
        }
        setFavorites(idFav);
      } else {
        console.log("une erreur s'est produite lors de l'appel à /music");
      }
    }

    if (token) getFavorite();
  }, [setAlbum]);

  const imgSrc = album?.cover
    ? `${serveur}/uploads/${album.cover}`
    : './bunny.png';

  const delAlbum = async () => {
    const res = await fetch(`${serveur}/album/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.ok) {
      navigate('/album');
    } else {
      console.log(res);
    }
  };

  const changeCover = async () => {
    setModalOpen(true);
  };
  return (
    <div className="albuminfo-container">
      <div className="albuminfo-header">
        <img className="albuminfo-image" src={imgSrc} alt="album cover" />
        <div className="albuminfo-infobox">
          <div className="albuminfo-title">{album?.name ?? ''}</div>
          <div className="albuminfo-artist">{album?.genre ?? ''}</div>
          {ownAlbum && (
            <>
              <div className="albuminfo-ownership">Vous possédez cet album</div>
              <div className="button-container">
                <button
                  className="submit-button"
                  type="button"
                  onClick={changeCover}
                >
                  Change Cover
                </button>
                <button
                  className="submit-button"
                  type="button"
                  onClick={delAlbum}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <ModalChangeCover
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        id={id}
      />

      <MusicList music={album?.musicList ?? []} favorites={favorites} />
    </div>
  );
}
