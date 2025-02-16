"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TodoData, useTodo } from '@/services/todoService';
import { useCookies } from 'react-cookie';

export default function LoginPage() {
  const { register, handleSubmit } = useForm<TodoData>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { createTodo } = useTodo();
  const [cookies] = useCookies(['todovea_auth_token'], {
    doNotParse: true,
  });

  useEffect(() => {
    if (!cookies["todovea_auth_token"]) {
      router.push('/');
    }
  }, []);

  const onSubmit: SubmitHandler<TodoData> = async (data: TodoData) => {
    setErrorMessage(null);
    try {
      await createTodo(data);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      setErrorMessage('Erreur lors de la création de la tâche');
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={2}
      >
        <Typography variant="h4">Création de tâche</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('title')}
            label="Titre"
            fullWidth
            margin="normal"
          />
          <TextField
            {...register('description')}
            label="Description"
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Créer la tâche
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
