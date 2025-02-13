import { createFileRoute } from '@tanstack/react-router';
import Img1 from '@/assets/1.jpg';

export const Route = createFileRoute('/our-1st-valentine')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
        {/* Foto */}
      <div className='h-screen relative'>
        <img src={Img1} className={'w-full h-full object-cover block object-top'} />
        <div className='absolute inset-0 bg-gradient-to-b from-[#FFF]/0 via-[#FFF]/10 to-[#ff546a] opacity-100'></div>
      </div>

      {/* ubah gradsi from red to white, via itu /0-100 buat mulai gradasi, color via sesuai dari from */}

      <div className='bg-gradient-to-b from-[#ff546a] via-[#ff546a]/90 to-[#FFF]/0 opacity-100 text-center py-12 flex-1 flex flex-col items-center justify-center'>
        
        {/* ubah font tinggal ganti antara comfortaa atau sacramento */}
        <h1 className='text-5xl font-bold text-white font-sacramento'>💌 "Happy Valentine"</h1>

        {/* List */}
        <div className='mt-8 mb-10 text-[#ffffff]'>
          <p>dda</p>
          <p>dda</p>
          <p>dda</p>
          <p>dda</p>
          <p>dda</p>
          <p>dda</p>
          <p>dda</p>
          <p>dda</p>
          <p>dda</p>
        </div>
      </div>

      <div className='bg-[#fff] text-center py-12 flex-1 flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-bold text-red font-sacramento'>💌 Date Plan</h1>
        <div className='mb-10 text-[#ff546a]'>
          <p>💡 </p>
          <p>📍 </p>
          <p>🎉 </p>
        </div>
      </div>
    </div>
  );
}
