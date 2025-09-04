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

// Services
import { deleteData, getData, postData, putData } from "../../Services/services";

export default function Books() {
    const [books, setBooks]     = useState([]);
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    // Controle do modal
    const [open, setOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        year: "",
        edition: "",
        author: null
    });

    useEffect(() => {
        fetchBooks();

        getData('/authors').then(response => {
            if (response.status === 200 && response.data.status) {
                setAuthors(response.data.data.List);
            }
        })
    }, []);

    const fetchBooks = async () => {
        await getData('/books').then(response => {
            if (response.status === 200 && response.data.status) {
                setBooks(response.data.data.List);
            }
        })

        setLoading(false);
    };

    const handleOpen = (book) => {
        if (book) {
            setEditingBook(book);
            setFormData({
                title: book.Title,
                subtitle: book.Subtitle,
                year: book.Year,
                edition: book.Edition,
                author: book.Author.id
            });
        } else {
            setEditingBook(null);
            setFormData({ title: "", subtitle: "", year: "", edition: "", author: null });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingBook(null);
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSave = async () => {
        if (editingBook) {
            const uri = `/books/${editingBook.Id}`;

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
        await deleteData(`/books/${id}`).then(response => {
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
                        📚 Lista de Livros
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
                        + Adicionar Livro
                    </Button>

                    <Grid container spacing={4}>
                        {books.map((book) => (
                            <Grid item xs={12} md={6} lg={4} key={book.Id}>
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
                                            {book.Title}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{ color: "var(--theme3)", mb: 1 }}
                                        >
                                            {book.Subtitle}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{ color: "var(--theme3)", mb: 1 }}
                                        >
                                            Ano: {book.Year} | Edição: {book.Edition}
                                        </Typography>

                                        {book.Author !== null ? (
                                            <Typography
                                                variant="caption"
                                                sx={{ color: "var(--theme4)", fontStyle: "italic" }}
                                            >
                                                Autor: {book.Author.name} ({book.Author.pseudonym})
                                            </Typography>
                                        ) : (
                                            <Typography
                                                variant="caption"
                                                sx={{ color: "var(--theme4)", fontStyle: "italic" }}
                                            >
                                                Autor não definido
                                            </Typography>
                                        )}
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
                                            onClick={() => handleOpen(book)}
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
                                            onClick={() => handleDelete(book.Id)}
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
                        {editingBook ? "Editar Livro" : "Adicionar Livro"}
                    </DialogTitle>

                    <DialogContent sx={{ mt: 1 }}>
                        <TextField
                            margin="dense"
                            label="Título"
                            name="title"
                            fullWidth
                            value={formData.title}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="Subtítulo"
                            name="subtitle"
                            fullWidth
                            value={formData.subtitle}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="Ano"
                            name="year"
                            fullWidth
                            value={formData.year}
                            onChange={handleChange}
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            margin="dense"
                            label="Edição"
                            name="edition"
                            fullWidth
                            value={formData.edition}
                            onChange={handleChange}
                            variant="outlined"
                        />
                        <TextField
                            select
                            margin="dense"
                            label="Autor"
                            name="author"
                            fullWidth
                            value={formData.author}
                            onChange={handleChange}
                            variant="outlined"
                        >
                            { authors.map((data) => {
                                return (
                                    <MenuItem value={data.Id}>
                                        {data.Name}
                                    </MenuItem>
                                )
                            })}
                        </TextField>
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
                            onClick={handleSave}
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
                </Dialog>
            </Container>
        </Fade>
    );
}
