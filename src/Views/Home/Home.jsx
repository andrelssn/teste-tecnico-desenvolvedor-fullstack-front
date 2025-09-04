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
                <Typography variant="h3" gutterBottom sx={{ color: "var(--text)" }}>
                    Bem-vindo ao Sistema de Produtos
                </Typography>

                <Typography variant="body1" sx={{ mb: 4, color: "var(--text-secondary)" }}>
                    Aqui você pode gerenciar seus produtos e clientes com facilidade.
                    Adicione novos produtos, visualize o catálogo, e acompanhe os dados dos seus clientes.
                </Typography>
            </Paper>
        </Container>
    );
}
