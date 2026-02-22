import { useEffect, useMemo, useState } from "react";
// Import komponen UI dari Material UI (MUI)
import {
    Card, CardHeader, CardContent, CardActions,
    Avatar, IconButton, Typography, Container,
    Box, Button, TextField, ButtonGroup, Paper,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
// Import koleksi warna dari MUI
import { red, blue, green, orange, purple } from '@mui/material/colors';
// Import icon-icon yang dibutuhkan
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useNavigate } from 'react-router';
import { usePosts } from '../hooks/usePosts';
import { useDeletePost } from '../hooks/useDeletePost';
import { useCreatePost } from '../hooks/useCreatePost';
import { useUpdatePost } from '../hooks/useUpdatePost';
import type { Post } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';



// 2. KOMPONEN KECIL: PostCardItem (Untuk menampilkan satu kotak kartu)
// Tambahkan properti onDelete
function PostCardItem({ post, onDetail, onDelete, onEdit }: { post: Post, onDetail: (id: string) => void, onDelete: (id: string) => void, onEdit: (post: Post) => void }) {
    const colors = [red[500], blue[500], green[500], orange[500], purple[500]];
    const avatarColor = colors[post.user.name.length % 5];

    return (
        <Card sx={{ height: '240px', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2 }}>
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: avatarColor }}>{post.user.name[0].toUpperCase()}</Avatar>}
                // Tombol Hapus ditaruh di sini (pojok kanan atas)
                action={
                    <Box>
                        {/* TOMBOL EDIT (UPDATE) */}
                        <IconButton size="small" color="primary" onClick={() => onEdit(post)}>
                            <MoreVertIcon fontSize="small" /> {/* Bisa diganti EditIcon */}
                        </IconButton>
                        {/* TOMBOL DELETE */}
                        <IconButton size="small" color="error" onClick={() => onDelete(post.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                }
                title={<Typography variant="subtitle1" fontWeight="bold" noWrap>{post.title}</Typography>}
                subheader={<Typography variant="caption">{new Date(post.createdAt).toLocaleDateString('id-ID')}</Typography>}
            />
            <CardContent sx={{ flexGrow: 1, overflow: 'hidden', pt: 0 }}>
                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                    {post.content}
                </Typography>
            </CardContent>
            <CardActions sx={{ borderTop: '1px solid #f0f0f0', justifyContent: 'space-between', px: 2, py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small" color="error"><FavoriteIcon fontSize="small" /></IconButton>
                    <Typography variant="caption" fontWeight="bold" color="primary">{post.status.toUpperCase()}</Typography>
                </Box>
                <Button size="small" variant="outlined" onClick={() => onDetail(post.id)}>
                    Detail
                </Button>
            </CardActions>
        </Card>
    );
}

// 3. KOMPONEN UTAMA
export default function PostList() {

    // const [posts, setPosts] = useState<Post[]>([]); // Nyimpen daftar postingan dari API
    const { posts, reload, state } = usePosts();
    const deletePost = useDeletePost()
    const createPost = useCreatePost();
    const updatePost = useUpdatePost();

    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ title: "", content: "" });

    const [search, setSearch] = useState("");      // Nyimpen teks pencarian user
    const [sortBy, setSortBy] = useState("createdAt"); // Kolom yang mau diurutkan
    const [isSortAscending, setIsSortAscending] = useState(true); // Urutan A-Z (true) atau Z-A (false)
    const navigate = useNavigate(); // Hook untuk pindah-pindah halaman

    // Fungsi untuk pindah ke halaman detail postingan (yg postDetail ituh)
    const goToPost = (id: string) => navigate(`/post/${id}`);

    useEffect(() => {
        reload();
    }, [reload]);

    // // --- FETCH DATA (Ambil data dari server) ---
    // useEffect(() => {
    //     const reloadPostList = async () => {
    //         try {
    //             // Ambil data dari API lokal
    //             const response = await fetch("http://localhost:5173/api/post");
    //             // Cek kalau request gagal
    //             if (response.status !== 200) {
    //                 alert("Failed to fetch post");
    //                 return;
    //             }
    //             // Ubah respon jadi JSON dan simpan ke state 'posts'
    //             const data = await response.json();
    //             setPosts(data.records);
    //             console.log(data.records); // Log data untuk debug
    //         } catch (error) {
    //             console.error("Error fetching data:", error);
    //         }
    //     }
    //     reloadPostList(); // Jalankan fungsi di atas
    // }, []) // Kosong [] artinya cuma jalan 1x pas halaman pertama kali dibuka

    // --- LOGIKA FILTER & SORTIR (Pake useMemo biar gak lemot saat ngetik) ---
    const displayPosts = useMemo(() => {
        // 1. Filter: Cari post yang judul atau nama user-nya cocok dengan kata kunci 'search'
        let result = posts.filter(p =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.user.name.toLowerCase().includes(search.toLowerCase())
        );

        // 2. Sortir: Mengurutkan hasil filter tadi
        return result.sort((a, b) => {
            let fieldA: string, fieldB: string;

            // Pilih kolom mana yang mau dibandingin
            if (sortBy === 'title') {
                fieldA = a.title; fieldB = b.title;
            } else if (sortBy === 'userName') {
                fieldA = a.user.name; fieldB = b.user.name;
            } else {
                fieldA = a.createdAt; fieldB = b.createdAt;
            }

            // Atur arah urutan (Ascending atau Descending)
            const multiplier = isSortAscending ? 1 : -1;
            // localeCompare: Cara standar JS buat bandingin teks (ngatur A-Z)
            return fieldA.localeCompare(fieldB) * multiplier;
        });
    }, [posts, search, sortBy, isSortAscending]); // Ulangi hitung kalau salah satu ini berubah

    // Fungsi untuk handle klik tombol sortir
    const handleSort = (field: string) => {
        // Kalau user klik tombol yang sama, balikkan arahnya (A-Z jadi Z-A)
        if (sortBy === field) {
            setIsSortAscending(!isSortAscending);
        } else {
            // Kalau klik tombol baru, set kolom sortirnya dan mulai dari A-Z
            setSortBy(field);
            setIsSortAscending(true);
        }
    };

    if (state === 'loading') {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleOpenCreate = () => {
        setEditId(null);
        setFormData({ title: "", content: "" });
        setOpen(true);
    };

    const handleOpenEdit = (post: Post) => {
        setEditId(post.id);
        setFormData({ title: post.title, content: post.content });
        setOpen(true);
    };

    const handleSubmit = async () => {
        try {
            if (editId) {
                await updatePost(editId, formData);
            } else {
                await createPost(formData);
            }
            setOpen(false);
            reload(); // Refresh data setelah simpan
        } catch (err) {
            alert("Gagal menyimpan post");
        }
    };

    // --- TAMPILAN (JSX) ---
    return (
        <Container sx={{ py: 6 }} maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                {/* Judul Besar Halaman */}
                <Typography variant="h3" fontWeight="900" sx={{ mb: 4, color: '#1976d2', textAlign: 'center' }}>
                    FORUM FEED
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<MoreVertIcon />} // Ganti dengan AddIcon jika ada
                    onClick={handleOpenCreate}
                >
                    Add Post
                </Button>
            </Box>

            {/* Toolbar: Kotak Search & Tombol Urutkan */}
            <Paper elevation={0} sx={{ p: 3, mb: 5, backgroundColor: '#f5f5f5', borderRadius: 3 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', alignItems: 'center' }}>
                    {/* Kolom Pencarian */}
                    <TextField
                        placeholder="Cari judul atau user..."
                        variant="outlined" size="small"
                        sx={{ backgroundColor: 'white', borderRadius: 2, width: { xs: '100%', sm: '300px' } }}
                        // Setiap ngetik, update state 'search'
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {/* Grup Tombol Sortir */}
                    <ButtonGroup variant="contained" aria-label="sort button group">
                        {/* Tombol Judul */}
                        <Button
                            onClick={() => handleSort('title')}
                            // Munculkan icon panah cuma di tombol yang lagi aktif
                            endIcon={sortBy === 'title' ? (isSortAscending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />) : null}
                        >
                            Title
                        </Button>
                        {/* Tombol User */}
                        <Button
                            onClick={() => handleSort('userName')}
                            endIcon={sortBy === 'userName' ? (isSortAscending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />) : null}
                        >
                            User
                        </Button>
                        {/* Tombol Tanggal */}
                        <Button
                            onClick={() => handleSort('createdAt')}
                            endIcon={sortBy === 'createdAt' ? (isSortAscending ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />) : null}
                        >
                            Date
                        </Button>
                    </ButtonGroup>
                </Box>
            </Paper>

            {/* Area Grid: Tempat kartu-kartu muncul */}
            {displayPosts.length > 0 ? (
                <Box sx={{
                    display: 'grid',
                    // Grid otomatis: per kolom minimal 300px, selebihnya bagi rata (1fr)
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 4
                }}>
                    {/* Looping data displayPosts dan tampilkan komponen PostCardItem */}
                    {displayPosts.map(post => (
                        <PostCardItem
                            key={post.id} // Key unik wajib buat React
                            post={post}   // Lempar data post
                            onDetail={goToPost} // Lempar fungsi navigasi
                            onDelete={() => deletePost(post.id)}
                            onEdit={handleOpenEdit}
                        />
                    ))}
                </Box>
            ) : (
                // Tampilan kalau hasil filter/search kosong
                <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mt: 5 }}>
                    Tidak ada postingan yang ditemukan.
                </Typography>
            )}

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>{editId ? "Edit Post" : "Create New Post"}</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                    <TextField
                        label="Title" fullWidth value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <TextField
                        label="Content" fullWidth multiline rows={4} value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

