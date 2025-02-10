import { createFileRoute } from '@tanstack/react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { motion } from 'framer-motion';

const formSchema = z.object({
  message: z.string().min(2, {
    message: 'Message must be at least 2 characters.',
  }),
});

const formSchemaPassword = z.object({
  password: z.string().min(2, {
    message: 'Password must be at least 2 characters.',
  }),
});

export const Route = createFileRoute('/message')({
  component: RouteComponent,
});

function RouteComponent() {
  const [data, setData] = useState([]);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const formDialog = useForm({
    resolver: zodResolver(formSchemaPassword),
  });

  function onSubmit(values) {
    setData((prev) => [...prev, values]);
    form.reset({ message: '' });
  }

  function onSubmitDialog(values) {
    formDialog.reset({ password: '' });
  }

  return (
    <div className='bg-[#ff2644] min-h-screen p-4 flex flex-col items-center gap-10'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full max-w-md space-y-3'>
          <FormField
            control={form.control}
            name='message'
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
            <Button className='mb-4 max-w-md w-full block mx-auto'>Unlock</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <Form {...formDialog}>
              <form onSubmit={formDialog.handleSubmit(onSubmitDialog)} className='space-y-4'>
                <FormField
                  control={formDialog.control}
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

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {data.map((val, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} whileHover={{
              scale: 1.1,
              transition: { duration: 0.3 },
            }}>
              <CardWishList message={val.message} />
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
