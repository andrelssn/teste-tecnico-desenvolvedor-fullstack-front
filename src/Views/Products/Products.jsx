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

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Controle do modal
    const [open, setOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        nome: "",
        preco: "",
        estoque: ""
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        await getData('/produtos').then(response => {
            if (response.status === 200) {
                setProducts(response.data);
            }
        });
        setLoading(false);
    };

    const handleOpen = (product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                nome: product.nome,
                preco: parseInt(product.preco),
                estoque: parseInt(product.estoque)
            });
        } else {
            setEditingProduct(null);
            setFormData({ nome: "", preco: "", estoque: "" });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingProduct(null);
    };

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        if (editingProduct) {
            await putData({ uri: `/produtos/${editingProduct.id}`, formData }).then(() => fetchProducts());
        } else {
            await postData({ uri: '/produtos', formData }).then(() => fetchProducts());
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
                        🛒 Lista de Produtos
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
                        + Adicionar Produto
                    </Button>

                    <Grid container spacing={4}>
                        {products.map(product => (
                            <Grid item xs={12} md={6} lg={4} key={product.id}>
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
                                            {product.nome}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{ color: "var(--text-secondary)", mb: 1 }}
                                        >
                                            Preço: R$ {product.preco} | Estoque: {product.estoque}
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
                        {editingProduct ? "Editar Produto" : "Adicionar Produto"}
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
                                    "& fieldset": {
                                        borderColor: "var(--theme3)"
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "var(--theme4)"
                                    },
                                    "&.Mui-focused fieldset": {
                                        borderColor: "var(--theme2)"
                                    }
                                },
                                "& .MuiInputLabel-root": {
                                    color: "var(--text)"
                                },
                                "& .MuiInputLabel-root.Mui-focused": {
                                    color: "var(--text)"
                                }
                            }}
                        />
                        <TextField
                            margin="dense"
                            label="Preço"
                            name="preco"
                            type="number"
                            fullWidth
                            value={formData.preco}
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
                        <TextField
                            margin="dense"
                            label="Estoque"
                            name="estoque"
                            type="number"
                            fullWidth
                            value={formData.estoque}
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
