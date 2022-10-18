import React, { useState } from "react";
import Button from '@mui/material/Button';
import {
  Box,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import Container from '@mui/material/Container';

const LoginForm = ({ joinRoom }) => {
  const [user, setUser] = useState();
  const [room, setRoom] = useState();
  
  return (
    <Container component="main" sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '80vh',
      width: '500px',
      mt: 10,
    }}
      maxWidth="lg">

      <form
        onSubmit={e => {
          e.preventDefault();
          joinRoom(user, room);
        }}
      >
        <Box
          animate={{
            transition: {
              staggerChildren: 0.55,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            initial={{ opacity: 0, y: 40 }}
          >
            <TextField autoComplete="username" type="text" label="User Name" onChange={e => setUser(e.target.value)} />
            <TextField autoComplete="Room" type="text" label="Room" onChange={e => setRoom(e.target.value)} />
          </Box>
          <Box initial={{ opacity: 1, y: 20 }}>
            <Stack
              direction="row"
              alignItems="end"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >
              <Button type="submit" variant="contained" disabled={!user || !room}>Join</Button>
            </Stack>
          </Box>
        </Box>
      </form>
    </Container>
  );
};

export default LoginForm;
