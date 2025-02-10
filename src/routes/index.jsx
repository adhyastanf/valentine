import { createFileRoute } from '@tanstack/react-router';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import Img1 from '@/assets/1.jpg';
import Img2 from '@/assets/2.jpg';
import Img3 from '@/assets/3.jpg';
import Img4 from '@/assets/4.jpg';
import Img5 from '@/assets/5.jpg';
import Img6 from '@/assets/6.jpg';
import Img7 from '@/assets/7.jpg';
import Img8 from '@/assets/8.jpg';
import Img9 from '@/assets/9.jpg';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

const ListCarousel = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9];

function RouteComponent() {
  const navigate = useNavigate();
  const [yesClickCount, setYesClickCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const handleYesClick = () => {
    if (yesClickCount < 10) {
      setYesClickCount(yesClickCount + 1);
    } else {
      navigate({ to: '/thank-you' });
    }
  };

  const handleNoClick = () => {
    const randomX = (Math.random() - 0.5) * 300;
    const randomY = Math.random() * 200 - 100;
    setNoPosition({ x: randomX, y: randomY });
  };

  return (
    <div className='min-h-screen bg-black flex flex-col relative'>
      <Carousel className='w-full'>
        <CarouselContent className='m-0 p-0'>
          {ListCarousel.map((img, index) => (
            <CarouselItem key={index} className='m-0 p-0'>
              <Card className='m-0 p-0 border-0'>
                <CardContent className='flex aspect-video items-center justify-center p-0 w-full relative'>
                  <img src={img} className={clsx('w-full h-full object-cover block;', index === 4 || index === 7 ? '' : 'object-top')} />
                  <div className='absolute inset-0 bg-gradient-to-b from-[#FFF]/0 via-[#FFF]/10 to-[#ff546a] opacity-100'></div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-[20px]' />
        <CarouselNext className='right-[20px]' />
      </Carousel>

      <div className='bg-[#ff546a] text-center py-12 flex-1 flex flex-col items-center justify-center'>
        <h1 className='text-5xl font-bold text-white font-sacramento'>💌 "Will you be my Valentine this year?"</h1>
        <div className='my-[100px] flex justify-center items-center gap-2 relative '>
          <motion.div style={{ scale: 1 + yesClickCount * 0.5 }} className='relative'>
            <Button className='bg-[#ff0022] hover:bg-[#ffffff] hover:text-[#ff546a]' onClick={handleYesClick}>
              Yes!!!
            </Button>
          </motion.div>

          <motion.div className='relative' initial={{ x: 0, y: 0 }} animate={{ x: noPosition.x, y: noPosition.y }} transition={{ type: 'spring', stiffness: 100 }}>
            <Button className='bg-[#000000] hover:bg-[#ffffff] hover:text-[#000000]' onClick={handleNoClick}>
              No!!!
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
