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
    MenuItem,
    Fade,
} from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";

// Services
import { deleteData, getData, postData, putData } from "../../Services/services";

dayjs.extend(customParseFormat);

export default function Authors() {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Controle do modal
    const [open, setOpen] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        pseudonym: "",
        birth: "",
        death: "",
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        await getData('/authors').then(response => {
            if (response.status === 200 && response.data.status) {
                setAuthors(response.data.data.List);
            }
        })

        setLoading(false);
    };

    const handleOpen = (book) => {
        if (book) {
            setEditingAuthor(book);
            setFormData({
                name: book.Name,
                pseudonym: book.Pseudonym,
                birth: book.Birth,
                death: book.Death,
            });
        } else {
            setEditingAuthor(null);
            setFormData({  name: "", pseudonym: "", birth: "", death: "" });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingAuthor(null);
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (editingAuthor) {
            const uri = `/authors/${editingAuthor.Id}`;

            await putData({ uri, formData }).then(response => {
                if (response.status === 200 && response.data.status) {
                    fetchBooks();
                }
            })
        } else {
            const uri = `/books`;

            await postData({ uri, formData }).then(response => {
                if (response.status === 200 && response.data.status) {
                    fetchBooks();
                }
            })
        }

        handleClose();
    };

    const handleDelete = async (id) => {
        await deleteData(`/authors/${id}`).then(response => {
            if (response.status === 200 && response.data.status) {
                fetchBooks();
            }
        })
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
                            color: "var(--theme2)",
                            fontWeight: "bold",
                            mb: 4,
                            textAlign: "center",
                        }}
                    >
                        🖋️ Lista de Autores
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
                            bgcolor: "var(--theme2)",
                            "&:hover": { bgcolor: "var(--theme4)" },
                        }}
                        onClick={() => handleOpen()}
                    >
                        + Adicionar Autor
                    </Button>

                    <Grid container spacing={4}>
                        {authors.map((author) => (
                            <Grid item xs={12} md={6} lg={4} key={author.Id}>
                                <Card
                                    sx={{
                                        bgcolor: "var(--panel)",
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
                                            sx={{ color: "var(--theme2)", fontWeight: "bold" }}
                                        >
                                            {author.Name}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{ color: "var(--theme3)", mb: 1 }}
                                        >
                                            {author.Pseudonym}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{ color: "var(--theme3)", mb: 1 }}
                                        >
                                            Nascimento: {author.Birth} <br/>
                                            Falecimento: {author.Death}
                                        </Typography>
                                    </CardContent>

                                    <CardActions sx={{ justifyContent: "flex-end", p: 2 }}>
                                        <Button
                                            size="small"
                                            sx={{
                                                textTransform: "none",
                                                color: "var(--theme2)",
                                                fontWeight: "bold",
                                                "&:hover": { color: "var(--theme4)" },
                                            }}
                                            onClick={() => handleOpen(author)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            size="small"
                                            sx={{
                                                textTransform: "none",
                                                color: "#fff",
                                                fontWeight: "bold",
                                                bgcolor: "crimson",
                                                borderRadius: "10px",
                                                px: 2,
                                                "&:hover": { bgcolor: "#a3002c" },
                                            }}
                                            onClick={() => handleDelete(author.Id)}
                                        >
                                            Deletar
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

                {/* Modal */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        sx: {
                            borderRadius: "20px",
                            p: 2,
                            bgcolor: "var(--panel)",
                        },
                    }}
                >
                    <DialogTitle
                        sx={{
                            fontWeight: "bold",
                            color: "var(--theme2)",
                            textAlign: "center",
                        }}
                    >
                        {editingAuthor ? "Editar Autor" : "Adicionar Autor"}
                    </DialogTitle>
                    <form onSubmit={handleSave}>
                        <DialogContent sx={{ mt: 1 }}>
                            <TextField
                                required
                                margin="dense"
                                label="Nome"
                                name="name"
                                fullWidth
                                value={formData.name}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                required
                                margin="dense"
                                label="Pseudônimo"
                                name="pseudonym"
                                fullWidth
                                value={formData.pseudonym}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{ mb: 2 }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Nascimento"
                                    format="DD/MM/YYYY"
                                    value={
                                        formData.birth
                                            ? dayjs(formData.birth, ["YYYY-MM-DD", "DD/MM/YYYY"])
                                            : null
                                    }
                                    onChange={(newValue) =>
                                        setFormData({ ...formData, birth: newValue ? newValue.format("DD-MM-YYYY") : "" })
                                    }
                                    slotProps={{ textField: { fullWidth: true, margin: "dense", sx: { mb: 2 }, required: true } }}
                                />

                                <DatePicker
                                    label="Falecimento"
                                    format="DD/MM/YYYY"
                                    value={
                                        formData.death
                                            ? dayjs(formData.death, ["YYYY-MM-DD", "DD/MM/YYYY"])
                                            : null
                                    }
                                    onChange={(newValue) =>
                                        setFormData({ ...formData, death: newValue ? newValue.format("DD-MM-YYYY") : "" })
                                    }
                                    slotProps={{ textField: { fullWidth: true, margin: "dense" } }}
                                />
                            </LocalizationProvider>
                        </DialogContent>

                        <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
                            <Button
                                onClick={handleClose}
                                sx={{
                                    textTransform: "none",
                                    color: "var(--theme3)",
                                    "&:hover": { color: "var(--theme2)" },
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    textTransform: "none",
                                    bgcolor: "var(--theme2)",
                                    px: 4,
                                    borderRadius: "12px",
                                    "&:hover": { bgcolor: "var(--theme4)" },
                                }}
                            >
                                Salvar
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Container>
        </Fade>
    );
}
