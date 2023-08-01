import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { RegisterRequest } from './models/RegisterRequest.interface';
import SignUpService from './services/SignUp.service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PasswordField from '../../components/PasswordField/PasswordField';
import { TextField } from '@mui/material';
import zxcvbn from 'zxcvbn';

function SignUp() {
    const navigate = useNavigate();

    const validatePasswordStrength = (password: string) => {
        const minPasswordScore = 3; // You can adjust this value based on your requirements
        const passwordScore = zxcvbn(password).score;
        return passwordScore >= minPasswordScore;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const username = data.get("username") as string;
        const firstName = data.get("firstName") as string;
        const lastName = data.get("lastName") as string;
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        const confirmation = data.get("confirmation") as string;

        // Validate required fields
        if (!username || !firstName || !lastName || !email || !password || !confirmation) {
            toast.error("Please fill in all the required fields");
            return;
        }

        // Create a data object that matches the IRegisterRequest interface
        const requestData: RegisterRequest = {
            username,
            firstName,
            lastName,
            email,
            password,
        };

        // Validate password strength
        const isPasswordValid = validatePasswordStrength(password);
        if (!isPasswordValid) {
            toast.error("Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.");
            return;
        }

        // Check if passwords match
        if (password !== confirmation) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const signUpService = new SignUpService();
            await signUpService.postRegister(requestData);

            // Assuming registration was successful, navigate to the login page
            navigate("/login", { replace: true });
        } catch (error) {
            // Handle error appropriately (e.g., display an error message)
            toast.error("Something went wrong, please try again later");
        }
    };

    const defaultTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" color="black">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordField label="Password" autoComplete="new-password" />
                            </Grid>
                            <Grid item xs={12}>
                                <PasswordField label="Confirm Password" isConfirmation autoComplete="new-password" />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link component={RouterLink} to="/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <ToastContainer />
            </Container>
        </ThemeProvider>
    );
}

export default SignUp;
