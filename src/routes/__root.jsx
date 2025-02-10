import * as React from 'react';
import { Outlet, createRootRoute, createRootRouteWithContext } from '@tanstack/react-router';
import music from '@/assets/sanctuary.mp3';
import { useEffect, useRef, useState } from 'react';

export const Route = createRootRouteWithContext()({
  component: RootComponent,
  meta:{
    title:'Happy Valentine Shiba'
  }
});

function RootComponent() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Ubah title di tab browser
    document.title = "Happy Valentine Shiba";

  }, []);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio
      .play()
      .then(() => {
        audio.muted = false; // Unmute setelah berhasil autoplay
      })
      .catch((error) => {
        console.log('Autoplay dicegah, menunggu interaksi:', error);
      });

    // Tambahkan event listener agar bisa autoplay setelah interaksi pertama
    const enableAudio = () => {
      audio.play().catch((err) => console.log('Autoplay masih dicegah:', err));
      document.removeEventListener('click', enableAudio);
    };

    document.addEventListener('click', enableAudio);

    return () => {
      document.removeEventListener('click', enableAudio);
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <React.Fragment>
      <div>
        <Outlet />
      </div>
      <button
        onClick={toggleMute}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 15px',
          backgroundColor: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
      <audio ref={audioRef} autoPlay loop>
        <source src={music} type='audio/mp3' />
      </audio>
    </React.Fragment>
  );
}
