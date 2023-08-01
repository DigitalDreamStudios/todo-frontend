import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '25vh', // Changed to 100vh to fill the whole viewport height
                }}
            >
                <CssBaseline />
                <Box
                    component="footer"
                    sx={{
                        py: 3,
                        px: 2,
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[200]
                                : theme.palette.grey[800],
                        position: 'fixed', // Added position fixed
                        bottom: 0, // Added bottom 0
                        width: '100%', // Added to make sure it spans the whole width
                    }}
                >
                    <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
                        <Typography variant="body1">
                            Powered by{' '}
                            <Link color="inherit" href="https://mui.com/">
                                DigitalDreams
                            </Link>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {'Copyright © '}
                            {new Date().getFullYear()}{' '}
                            <Link color="inherit" href="https://mui.com/">
                                DigitalDreams
                            </Link>
                            {'.'}
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
