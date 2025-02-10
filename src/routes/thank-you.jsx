import { createFileRoute, Link } from '@tanstack/react-router';
import GIF from '@/assets/gif.gif';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/thank-you')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='flex-1 bg-[#ff2644] h-screen flex flex-col justify-center items-center text-center p-4'>
      <img src={GIF} alt='gif-hug' className='w-40 sm:w-60 md:w-80 lg:w-96' />
      <div className='mt-4 text-white text-lg sm:text-xl md:text-2xl font-sacramento max-w-xs sm:max-w-md md:max-w-lg'>
        <p>Thank you baby!!!!! &lt;3</p>
        <p>See you on 15 February</p>
        <p>Has to be weekend of course, cause u're on night shift rn mwehehehehe</p>
      </div>
      <Link to='/wish-list'>
        <Button className='mt-6 px-6 py-2 text-lg'>NEXT</Button>
      </Link>
    </div>
  );
}

export default RouteComponent;
