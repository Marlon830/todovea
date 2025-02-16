"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import { LoginFormData, useAuth } from '@/services/authService';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { login } = useAuth();

  const onSubmit: SubmitHandler<LoginFormData> = async (data: LoginFormData) => {
    setErrorMessage(null);
    try {
      await login(data);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      setErrorMessage('Erreur lors de la connexion (nom d\'utilisateur ou mot de passe incorrect)');
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
        <Typography variant="h4">Connexion</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('username')}
            label="Username"
            fullWidth
            margin="normal"
          />
          <TextField
            {...register('password')}
            label="Mot de passe"
            type="password"
            fullWidth
            margin="normal"
          />
          <Box display="flex" justifyContent="center" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Se connecter
            </Button>
          </Box>      </form>
        <Typography variant="body1">
          Pas encore de compte ?{' '}
          <Link href="/signup" passHref>
            <Button variant="text" color="primary">
              Inscrivez-vous
            </Button>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
