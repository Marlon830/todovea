"use client";

import Link from 'next/link';
import { Button, Container, Typography, Box } from '@mui/material';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

export default function HomePage() {
  const router = useRouter();
  const [cookies, setCookie, removeCookie] = useCookies(['todovea_auth_token'], {
    doNotParse: true,
  });

  useEffect(() => {
    if (cookies["todovea_auth_token"]) {
      router.push('/dashboard');
    }
  }, []);

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
        <Typography variant="h3" gutterBottom>
          Bienvenue sur l'application de gestion de tâches
        </Typography>
        <Link href="/login" passHref>
          <Button variant="contained" color="primary">
            Connexion
          </Button>
        </Link>
        <Link href="/signup" passHref>
          <Button variant="outlined" color="primary">
            Inscription
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
