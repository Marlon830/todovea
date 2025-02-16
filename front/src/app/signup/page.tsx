"use client";

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SignupFormData, useAuth } from '@/services/authService';

export default function SignUpPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData & { confirmPassword: string }>();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { signup } = useAuth();

  const onSubmit: SubmitHandler<SignupFormData & { confirmPassword: string }> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      return;
    }
    setErrorMessage(null);
    try {
      await signup(data);
      router.push('/dashboard');
    } catch (error) {
      console.error('Erreur lors de l\'inscription', error);
      setErrorMessage('Erreur lors de l\'inscription (nom d\'utilisateur déjà utilisé)');
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
        <Typography variant="h4">Inscription</Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <TextField
              {...register('username')}
              label="Username"
              fullWidth
              margin="normal"
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ''}
            />
            <TextField
              {...register('password')}
              label="Mot de passe"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
            <TextField
              {...register('confirmPassword')}
              label="Confirmer le mot de passe"
              type="password"
              fullWidth
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
            />
            <TextField
              {...register('firstname')}
              label="Prénom"
              fullWidth
              margin="normal"
              error={!!errors.firstname}
              helperText={errors.firstname ? errors.firstname.message : ''}
            />
            <TextField
              {...register('lastname')}
              label="Nom de famille"
              fullWidth
              margin="normal"
              error={!!errors.lastname}
              helperText={errors.lastname ? errors.lastname.message : ''}
            />
          </Box>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              S'inscrire
            </Button>
          </Box>
        </form>
        <Typography variant="body1">
          Déjà un compte ?{' '}
          <Link href="/login" passHref>
            <Button variant="text" color="primary">
              Connectez-vous
            </Button>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
