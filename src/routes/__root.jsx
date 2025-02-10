import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import music from '@/assets/sanctuary.mp3';
import { useEffect, useRef } from 'react';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const audioRef = useRef(null);

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

  return (
    <React.Fragment>
      <div>
        <Outlet />
      </div>
      <audio ref={audioRef} autoPlay loop>
        <source src={music} type='audio/mp3' />
      </audio>
    </React.Fragment>
  );
}
