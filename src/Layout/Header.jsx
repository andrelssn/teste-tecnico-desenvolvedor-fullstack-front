import { AppBar, Tabs, Tab, Typography, Box } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Person, Home as HomeIcon } from "@mui/icons-material";

import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    // define qual tab está ativa com base na URL
    const currentPath = location.pathname;
    const tabValue =
        currentPath === "/" ? 0 : currentPath.startsWith("/products") ? 1 : 2;

    const handleChange = (event, newValue) => {
        if (newValue === 0) navigate("/");
        if (newValue === 1) navigate("/products");
        if (newValue === 2) navigate("/clients");
    };

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <AppBar
                position="static"
                sx={{
                    bgcolor: "var(--theme)",
                    p: 2,
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" fontWeight="bolder" color="#ffffff" gutterBottom>
                    Sistema de Produtos
                </Typography>

                {/* Tabs de navegação */}
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    textColor="inherit"
                    TabIndicatorProps={{ style: { backgroundColor: "#f7f7f7ff" } }}
                >
                    <Tab icon={<HomeIcon />} label="Início" />
                    <Tab icon={<LocalGroceryStoreIcon />} label="Produtos" />
                    <Tab icon={<Person />} label="Clientes" />
                </Tabs>
            </AppBar>

            {/* Conteúdo */}
            <Box sx={{ flex: 1 }}>
                <Outlet />
            </Box>

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    bgcolor: "var(--theme)",
                    color: "#fff",
                    textAlign: "center",
                    py: 2,
                    mt: "auto",
                }}
            >
                <Typography variant="body2">
                    © 2025 Sistema de Produtos - Todos os direitos reservados
                </Typography>
            </Box>
        </Box>
    );
}
