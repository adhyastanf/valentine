import { createFileRoute } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useLoaderData } from '@tanstack/react-router';
import { useMutation, useQuery, useQueryClient, queryOptions } from '@tanstack/react-query';
import axios from 'axios';

const formSchema = z.object({
  suggestion: z.string().min(2, { message: 'Suggestion must be at least 2 characters.' }),
  place: z.string().min(2, { message: 'Place must be at least 2 characters.' }),
  todo: z.string().optional(),
});

const fetchWishlist = async () => {
  const response = await axios.get(`${import.meta.env.VITE_URL_API}/suggest`);
  return response.data.data;
};

const createWishlistItem = async (newItem) => {
  const response = await axios.post(`${import.meta.env.VITE_URL_API}/suggest`, newItem);
  return response.data.data;
};

export const Route = createFileRoute('/wish-list')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(
      queryOptions({
        queryKey: ['wishlist'],
        queryFn: fetchWishlist,
      })
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const initialData = useLoaderData({ from: '/wish-list' });

  // Fetch wishlist data dengan initialData dari loader
  const { data: wishListData = [] } = useQuery({
    queryKey: ['wishlist'],
    queryFn: fetchWishlist,
    initialData, // Gunakan initial data dari loader
  });

  const form = useForm({ resolver: zodResolver(formSchema) });

  const mutation = useMutation({
    mutationFn: createWishlistItem,
    onMutate: async (newItem) => {
      await queryClient.cancelQueries(['wishlist']);
      const previousData = queryClient.getQueryData(['wishlist']);

      // Optimistic update: Tambahkan item baru sebelum server merespons
      queryClient.setQueryData(['wishlist'], (old = []) => [...old, { ...newItem, id: Date.now() }]);

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist']); // Refresh data dari server
    },
    onError: (err, newItem, context) => {
      queryClient.setQueryData(['wishlist'], context.previousData);
    },
  });

  function onSubmit(values) {
    mutation.mutate(values);
    form.reset({ suggestion: '', place: '', todo: '' });
  }

  return (
    <div className='bg-[#ff2644] min-h-screen'>
      <Navbar />
      <div className='flex flex-col lg:flex-row w-full gap-10 p-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3 sm:w-full lg:w-[30%]'>
            <FormField control={form.control} name='suggestion' render={({ field }) => (
              <FormItem>
                <FormLabel className='font-sacramento font-semibold text-white text-xl'>Suggestion</FormLabel>
                <FormControl>
                  <Input placeholder='Romantic idea?' className='text-white font-sacramento' {...field} />
                </FormControl>
                <FormMessage className='text-white' />
              </FormItem>
            )} />
            <FormField control={form.control} name='place' render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white font-sacramento font-semibold text-xl'>Place</FormLabel>
                <FormControl>
                  <Input placeholder='Best love spot?' className='text-white font-sacramento' {...field} />
                </FormControl>
                <FormMessage className='text-white' />
              </FormItem>
            )} />
            <FormField control={form.control} name='todo' render={({ field }) => (
              <FormItem>
                <FormLabel className='text-white font-sacramento font-semibold text-xl'>Todo</FormLabel>
                <FormControl>
                  <Input placeholder='Fun things to do?' className='text-white font-sacramento' {...field} />
                </FormControl>
                <FormMessage className='text-white' />
              </FormItem>
            )} />
            <Button type='submit' className='w-full'>
              Submit
            </Button>
          </form>
        </Form>

        <div className='w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {wishListData?.map((val, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}>
                <CardWishList suggestion={val.suggestion} place={val.place} todo={val.todo} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CardWishList({ suggestion, place, todo }) {
  return (
    <Card className='w-full max-w-[300px] mx-auto'>
      <CardHeader>
        <CardTitle className='text-center'>Perfect Date Ideas for Us 💕</CardTitle>
      </CardHeader>
      <CardContent className='font-comfortaa text-xs'>
        <p>💡 {suggestion}</p>
        <p>📍 {place}</p>
        <p>🎉 {todo}</p>
      </CardContent>
    </Card>
  );
}

export default RouteComponent;
