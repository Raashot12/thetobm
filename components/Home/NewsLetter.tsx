import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { z } from 'zod';
import { Box, Button, Container, Flex, Text, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { appColors } from '../appColors';

const NewsLetter = () => {
  const addInviteSchema = z.object({
    emailAddress: z.string().email({ message: 'Please enter valid email address' }),
  });
  const [isSubmitting, setIsubmitting] = useState(false);
  const form = useForm({
    validate: zodResolver(addInviteSchema),
    initialValues: {
      emailAddress: '',
    },
  });
  const handleSubmit = async (values: { emailAddress: string }) => {
    const baseId = 'appYi5UJUgW3d1yGc';
    const tableName = 'Newsletter';
    setIsubmitting(true);
    const endpoint = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    const headers = {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      'Content-Type': 'application/json',
    };
    const serializedData = {
      Email: values.emailAddress,
    };
    try {
      const response = await axios.post(endpoint, { fields: serializedData }, { headers });

      if (response.status === 200) {
        Swal.fire('Submitted Successfully!', 'You clicked the button!', 'success');
        setIsubmitting(false);
        form.reset();
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      Swal.fire(`${axiosError.message}`, 'You clicked the button!', 'error');
      setIsubmitting(false);
    }
  };
  return (
    <Container size="xl">
      <Box
        component="form"
        onSubmit={form.onSubmit(handleSubmit)}
        px={{ base: 20, sm: 30, md: 40, lg: 60 }}
        py={30}
        sx={{ background: 'rgba(87, 18, 68, 0.1)', borderRadius: 8 }}
        my={50}
      >
        <Text fz={{ base: 16, sm: 24 }} mb={10} fw={700} c="#151515">
          Sign Up for Our Newsletter
        </Text>
        <Text fz={{ base: 14, sm: 20 }} mb={16} fw={400} c="#151515">
          Subscribe to receive our latest company updates
        </Text>
        <Flex align="center" gap={20} wrap={{ base: 'wrap', md: 'nowrap' }}>
          <TextInput
            placeholder="Enter your mail"
            sx={{
              width: '100%',
              '.mantine-TextInput-input': {
                background: 'transperant',
                color: '#051438',
                fontWeight: 500,
                height: 53,
              },
            }}
            {...form.getInputProps('emailAddress')}
          />

          <Button
            type="submit"
            px={24}
            w={{ base: 'fit-content' }}
            sx={{
              flexShrink: 0,
              position: 'relative',
              zIndex: 2,
              '&.mantine-Button-root': {
                background: appColors?.activeColor,
              },
              '& .mantine-Button-label': {
                fontSize: 16,
                fontWeight: 600,
              },
              maxHeight: 53,
              width: '',
            }}
            loading={isSubmitting}
          >
            Subscribe
          </Button>
        </Flex>
      </Box>
    </Container>
  );
};

export default NewsLetter;
