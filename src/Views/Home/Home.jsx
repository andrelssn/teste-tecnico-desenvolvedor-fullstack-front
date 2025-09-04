import { Typography, Box, Container, Paper } from "@mui/material";

export default function Home() {
    return (
        <Container
            maxWidth="md"
            sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                my: 5,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 5,
                    borderRadius: 4,
                    bgcolor: "var(--panel)",
                    textAlign: "center",
                }}
            >
                <Typography variant="h3" gutterBottom sx={{ color: "var(--theme2)" }}>
                    Bem-vindo à Galeria de Livros
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: "var(--theme3)" }}>
                    Explore o mundo da literatura! Aqui você pode visualizar livros,
                    conhecer autores e até cadastrar novas obras.
                </Typography>
            </Paper>
        </Container>
    );
}
