import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

const defaultTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function Footer() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box
                component="footer"
                sx={{
                    py: 2, // Decreased padding on the y-axis
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                }}
            >
                <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
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
        </ThemeProvider>
    );
}
