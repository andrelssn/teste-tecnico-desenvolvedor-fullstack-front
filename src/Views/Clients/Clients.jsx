import { useEffect, useState } from "react";
import {
    Container,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
    Fade,
} from "@mui/material";

// Services
import { getData, postData, putData } from "../../Services/services";

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    // Controle do modal
    const [open, setOpen] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [formData, setFormData] = useState({
        nome: "",
        email: ""
    });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setLoading(true);
        await getData('/clientes').then(response => {
            if (response.status === 200) {
                setClients(response.data);
            }
        });
        setLoading(false);
    };

    const handleOpen = (client) => {
        if (client) {
            setEditingClient(client);
            setFormData({
                nome: client.nome,
                email: client.email
            });
        } else {
            setEditingClient(null);
            setFormData({ nome: "", email: "" });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingClient(null);
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        if (editingClient) {
            await putData({ uri: `/clientes/${editingClient.id}`, formData }).then(() => fetchClients());
        } else {
            await postData({ uri: '/clientes', formData }).then(() => fetchClients());
        }
        handleClose();
    };

    if (loading) return (
        <CircularProgress sx={{ display: "flex", justifySelf: "center", color: "var(--theme)", mt: 10 }}/>
    );

    return (
        <Fade in={true}>
            <Container maxWidth="lg" sx={{ my: 6 }}>
                <Paper
                    elevation={8}
                    sx={{
                        p: 5,
                        borderRadius: "24px",
                        bgcolor: "var(--panel)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    }}
                >
                    <Typography
                        variant="h4"
                        gutterBottom
                        sx={{
                            color: "var(--text)",
                            fontWeight: "bold",
                            mb: 4,
                            textAlign: "center",
                        }}
                    >
                        👥 Lista de Clientes
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            mb: 4,
                            px: 4,
                            py: 1.2,
                            borderRadius: "50px",
                            fontWeight: "bold",
                            textTransform: "none",
                            bgcolor: "var(--theme)",
                            "&:hover": { bgcolor: "var(--theme2)" },
                        }}
                        onClick={() => handleOpen()}
                    >
                        + Adicionar Cliente
                    </Button>

                    <Grid container spacing={4}>
                        {clients.map(client => (
                            <Grid item xs={12} md={6} lg={4} key={client.id}>
                                <Card
                                    sx={{
                                        bgcolor: "var(--theme)",
                                        borderRadius: "20px",
                                        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.28)",
                                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                        "&:hover": {
                                            transform: "translateY(-6px)",
                                            boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                                        },
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            sx={{ color: "var(--text)", fontWeight: "bold" }}
                                        >
                                            {client.nome}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{ color: "var(--text-secondary)", mb: 1 }}
                                        >
                                            Email: {client.email}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

                {/* Modal */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{ sx: { borderRadius: "20px", p: 2, bgcolor: "var(--panel)" } }}
                >
                    <DialogTitle sx={{ fontWeight: "bold", color: "var(--text)", textAlign: "center" }}>
                        {editingClient ? "Editar Cliente" : "Adicionar Cliente"}
                    </DialogTitle>

                    <DialogContent sx={{ mt: 1 }}>
                        <TextField
                            margin="dense"
                            label="Nome"
                            name="nome"
                            fullWidth
                            value={formData.nome}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{
                                mb: 2,
                                "& .MuiOutlinedInput-root": {
                                    bgcolor: "var(--background)",
                                    color: "var(--text)",
                                    "& fieldset": { borderColor: "var(--theme3)" },
                                    "&:hover fieldset": { borderColor: "var(--theme4)" },
                                    "&.Mui-focused fieldset": { borderColor: "var(--theme2)" }
                                },
                                "& .MuiInputLabel-root": { color: "var(--text)" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "var(--text)" }
                            }}
                        />
                        <TextField
                            margin="dense"
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    bgcolor: "var(--background)",
                                    color: "var(--text)",
                                    "& fieldset": { borderColor: "var(--theme3)" },
                                    "&:hover fieldset": { borderColor: "var(--theme4)" },
                                    "&.Mui-focused fieldset": { borderColor: "var(--theme2)" }
                                },
                                "& .MuiInputLabel-root": { color: "var(--text)" },
                                "& .MuiInputLabel-root.Mui-focused": { color: "var(--text)" }
                            }}
                        />
                    </DialogContent>

                    <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
                        <Button
                            onClick={handleClose}
                            sx={{ textTransform: "none", color: "var(--text-secondary)", "&:hover": { color: "var(--text)" } }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSave}
                            variant="contained"
                            sx={{ textTransform: "none", bgcolor: "var(--theme)", px: 4, borderRadius: "12px", "&:hover": { bgcolor: "var(--theme4)" } }}
                        >
                            Salvar
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </Fade>
    );
}
