import { createFileRoute } from '@tanstack/react-router';
import Img1 from '@/assets/happyval.jpg';
import ImgPC from '@/assets/happyvalpc.jpg';
import ImgMobile from '@/assets/happyvalmobile.jpg';
import ttdShidqi from '@/assets/ttdshidqi.png';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const Route = createFileRoute('/our-1st-valentine')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
        {/* Foto */}
        <div className="h-screen w-screen relative overflow-hidden">
          <picture className="absolute inset-0">
            {/* Mobile version (iPhone 11 optimal size) */}
            <source srcSet={ImgMobile} media="(max-width: 768px)" />
            {/* Default (PC) version */}
            <img src={ImgPC} className="w-full h-full object-cover block" />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF]/0 via-[#FFF]/10 to-[#ff546a] opacity-100"></div>
        </div>

        <div className='bg-[#ff546a] text-center py-12 flex-1 flex flex-col items-center justify-center'> 
        <h1 className='text-5xl font-bold text-white font-sacramento'>💌 "Happy Valentine"</h1>

        {/* List */}
        <div className='mt-8 mb-10 text-[#ffffff] px-6'>
          <p className="max-w-3xl mx-auto text-left text-justify">
Dear My Baby, Shiba,
<br />
<br />
Happy Valentine my babyy, my girll, my love, my everything 💖💖
<br />
Thank you for being with me, being patience with me, being strong for me, being who you are to me, and being in love to me these whole time. I couldn’t thank you enough for that. You said that you are thankful to being loved the way I love you, me too babe.
<br /> 
I’m not good with words and maybe this will be too short to your liking hehehe.
<br />
These past 6 months really feel like a rollercoaster to us yeah? You finished your study, me finished my study, we went out almost everyday, me get my first job, you get bored everyday, then you get job, then you have to move from Jakarta to Tangerang, then me being accepted at BNI. 
<br />
{"(I might forgot to write something wkwk, with that I’m sorry)"}
<br />
Even after all that, remember, the train is not stopping for stupid reasons. I hope we as the Pilot, will work together to make whatever obstacle in front of us didn’t stop the train.
<br />
In the end, I love you so much baby. I want our train will go long and long and go beyond the limit.
<br />
<br />
<br />
With so much love,
<br />
Your baby, your man, your love,
<br />
<img src={ttdShidqi} alt="Shidqi's Signature" className="w-40" />
Shidqi Fadhlurrahman Yusri</p>
        </div>

        </div>

      {/* ubah gradsi from red to white, via itu /0-100 buat mulai gradasi, color via sesuai dari from */}

      <div className='bg-gradient-to-b from-[#ff546a] via-[#ff546a] to-[#ffdadf] text-center py-32 flex flex-col items-center justify-center w-full'>
  {/* Content inside the gradient */}
</div>
<div className='bg-[#ffdadf] text-center py-32 flex flex-col items-center justify-center w-full'>
  <h1 className='text-5xl font-bold text-red font-sacramento'>💌 Date Plan</h1>
  <div className='mb-10 text-[#ff546a]'>
    <br />
    <Card className='w-full max-w-[300px] mx-auto'>
      <CardHeader>
        <CardTitle className='text-center'>Broadway Alam Sutera 🎉</CardTitle>
      </CardHeader>
      <CardContent className='font-comfortaa text-xs'>
        <p>⌚ 13.00-Gabut</p>
        <p>💡 Jalan-Jalan, Makan, Jajan</p>
        <p>📍 Broadway, Alam Sutera</p>
      </CardContent>
    </Card>
    <br />
    <Card className='w-full max-w-[300px] mx-auto'>
      <CardHeader>
        <CardTitle className='text-center'>Photobox 💕</CardTitle>
      </CardHeader>
      <CardContent className='font-comfortaa text-xs'>
        <p>⌚ 15.00</p>
        <p>💡 Photobox YEAYY!!!</p>
        <p>📍 Fotohokkie, Broadway</p>
      </CardContent>
    </Card>
    <br />
    <Card className='w-full max-w-[300px] mx-auto'>
      <CardHeader>
        <CardTitle className='text-center'>❓❓❓❓</CardTitle>
      </CardHeader>
      <CardContent className='font-comfortaa text-xs'>
        <p>⌚ 18.00</p>
        <p>💡 Secret???? Hehehehe </p>
        <p>📍 Secret???? Hehehehe</p>
      </CardContent>
    </Card>
    
  </div>
</div>

    </div>
  );
}
