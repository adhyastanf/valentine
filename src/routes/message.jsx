import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  improvement: z.string().min(2, { message: 'Message must be at least 2 characters.' }),
});

const formSchemaPassword = z.object({
  password: z.string().min(2, { message: 'Password must be at least 2 characters.' }),
});

const fetchImprove = async (query = '') => {
  console.log(query);
  const response = await axios.get(`${import.meta.env.VITE_URL_API}/improve${query ? `?password=${query}` : ''}`);
  return response.data.data;
};

const createImproveItem = async (newItem) => {
  const response = await axios.post(`${import.meta.env.VITE_URL_API}/improve`, newItem);
  return response.data.data;
};

// const fetchPassword = async () => {
//   const response = await axios.get(`${import.meta.env.VITE_URL_API}/password`);
//   return response.data; // Response: { isPassword: true/false }
// };

const createPasswordItem = async (newItem) => {
  const response = await axios.post(`${import.meta.env.VITE_URL_API}/password`, newItem);
  return response.data; // Response: { success: true/false }
};

export const Route = createFileRoute('/message')({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(
      queryOptions({
        queryKey: ['improve'],
        queryFn: () => fetchImprove(),
      })
    );
  },
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const initialData = useLoaderData({ from: '/message' });

  const form = useForm({ resolver: zodResolver(formSchema) });
  const formSetPassword = useForm({ resolver: zodResolver(formSchemaPassword) });
  const formUnlock = useForm({ resolver: zodResolver(formSchemaPassword) });

  const { data: improveData = [], refetch: refetchImprove } = useQuery({
    queryKey: ['improve'],
    queryFn: () => fetchImprove(),
    initialData,
  });

  // const { data: passwordData, refetch: refetchPassword } = useQuery({
  //   queryKey: ['password'],
  //   queryFn: fetchPassword,
  // });

  const mutation = useMutation({
    mutationFn: createImproveItem,
    onMutate: async (newItem) => {
      await queryClient.cancelQueries(['improve']);
      const previousData = queryClient.getQueryData(['improve']);
      queryClient.setQueryData(['improve'], (old = []) => [...old, { ...newItem, id: Date.now() }]);
      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['improve']);
    },
    onError: (err, newItem, context) => {
      queryClient.setQueryData(['improve'], context.previousData);
    },
  });

  const mutationSetPassword = useMutation({
    mutationFn: createPasswordItem,
    onSuccess: () => {
      formSetPassword.reset();
      alert('Password has been set successfully.');
    },
    onError: () => {
      alert('Failed to set password.');
    },
  });

  function onSubmit(values) {
    mutation.mutate(values);
    form.reset({ improvement: '' });
  }

  async function onSubmitSetPassword(values) {
    mutationSetPassword.mutate(values);
    formSetPassword.reset({ password: '' });
  }
  
  async function onSubmitUnlock(values) {
    try {
      const data = await fetchImprove(values.password); // Ambil data dari API dengan password
      queryClient.setQueryData(['improve'], data); // Perbarui cache Tanstack Query dengan hasil baru
      formUnlock.reset({ password: '' });
    } catch (error) {
      console.error('Error fetching data with password:', error);
    }
  }

  return (
    <div className='bg-[#ff2644] min-h-screen p-4 flex flex-col items-center gap-10'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-md space-y-3'>
          <FormField
            control={form.control}
            name='improvement'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-sacramento font-semibold text-white text-xl'>Message</FormLabel>
                <FormControl>
                  <Input placeholder='message' className='text-white font-sacramento placeholder:text-white placeholder:font-sacramento' {...field} />
                </FormControl>
                <FormMessage className='text-white' />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </Form>

      <div className='w-full max-w-4xl'>
        <Dialog>
          <DialogTrigger asChild>
            <Button className='mb-4 max-w-md w-full block mx-auto'>Set Password</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Set Password</DialogTitle>
              <DialogDescription>Enter your password.</DialogDescription>
            </DialogHeader>
            <Form {...formSetPassword}>
              <form onSubmit={formSetPassword.handleSubmit(onSubmitSetPassword)} className='space-y-4'>
                <FormField
                  control={formSetPassword.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder='Enter your password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type='submit'>Save changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Dialog Unlock */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className='mb-4 max-w-md w-full block mx-auto'>Unlock</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Unlock</DialogTitle>
              <DialogDescription>Enter your password to unlock messages.</DialogDescription>
            </DialogHeader>
            <Form {...formUnlock}>
              <form onSubmit={formUnlock.handleSubmit(onSubmitUnlock)} className='space-y-4'>
                <FormField
                  control={formUnlock.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type='password' placeholder='Enter your password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type='submit'>Unlock</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {improveData?.map((val, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <CardWishList message={val.improvement} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardWishList({ message }) {
  return (
    <Card className='w-full max-w-xs sm:max-w-[250px] mx-auto'>
      <CardHeader>
        <CardTitle>Message</CardTitle>
      </CardHeader>
      <CardContent className='font-comfortaa text-xs'>
        <p>{message}</p>
      </CardContent>
    </Card>
  );
}
