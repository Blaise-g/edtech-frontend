// src/pages/StudyMaterials.js
import React, { useState, useCallback } from 'react';
import { 
  Typography, Button, Box, IconButton, Paper, Grid, TextField, Chip, Menu, MenuItem, 
  Card, CardContent, CardActions, CardMedia, Pagination, Rating, LinearProgress,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import FilterListIcon from '@mui/icons-material/FilterList';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import MovieIcon from '@mui/icons-material/Movie';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

const StudyMaterials = () => {
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Math Notes.pdf', subject: 'Mathematics', type: 'pdf', lastAccessed: '2023-05-10', progress: 70, favorite: true, tags: ['algebra', 'calculus'] },
    { id: 2, name: 'Science Summary.docx', subject: 'Science', type: 'doc', lastAccessed: '2023-05-09', progress: 45, favorite: false, tags: ['biology', 'chemistry'] },
    { id: 3, name: 'History Lecture.mp4', subject: 'History', type: 'video', lastAccessed: '2023-05-08', progress: 30, favorite: true, tags: ['world war II', 'european history'] },
    { id: 4, name: 'English Literature Audio.mp3', subject: 'English', type: 'audio', lastAccessed: '2023-05-07', progress: 90, favorite: false, tags: ['shakespeare', 'poetry'] },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewMaterial, setPreviewMaterial] = useState(null);
  const materialsPerPage = 8;

  const onDrop = useCallback(acceptedFiles => {
    const newMaterials = acceptedFiles.map((file, index) => ({
      id: materials.length + index + 1,
      name: file.name,
      subject: 'Uncategorized',
      type: getFileType(file.name),
      lastAccessed: new Date().toISOString().split('T')[0],
      progress: 0,
      favorite: false,
      tags: [],
    }));
    setMaterials(prevMaterials => [...prevMaterials, ...newMaterials]);
  }, [materials]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDelete = (id) => {
    setMaterials(materials.filter((material) => material.id !== id));
  };

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['pdf', 'doc', 'docx'].includes(extension)) return extension;
    if (['mp4', 'avi', 'mov'].includes(extension)) return 'video';
    if (['mp3', 'wav', 'ogg'].includes(extension)) return 'audio';
    return 'other';
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <PictureAsPdfIcon />;
      case 'doc':
      case 'docx': return <DescriptionIcon />;
      case 'video': return <MovieIcon />;
      case 'audio': return <AudioFileIcon />;
      default: return <DescriptionIcon />;
    }
  };

  const toggleFavorite = (id) => {
    setMaterials(materials.map(material => 
      material.id === id ? { ...material, favorite: !material.favorite } : material
    ));
  };

  const handlePreview = (material) => {
    setPreviewMaterial(material);
    setPreviewOpen(true);
  };

  const filteredMaterials = materials.filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const indexOfLastMaterial = currentPage * materialsPerPage;
  const indexOfFirstMaterial = indexOfLastMaterial - materialsPerPage;
  const currentMaterials = filteredMaterials.slice(indexOfFirstMaterial, indexOfLastMaterial);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const recentMaterials = [...materials].sort((a, b) => new Date(b.lastAccessed) - new Date(a.lastAccessed)).slice(0, 3);
  const favoriteMaterials = materials.filter(material => material.favorite).slice(0, 3);

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom>
        Study Materials
      </Typography>

      {/* Quick Access Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>Quick Access</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">Recent Materials</Typography>
                {recentMaterials.map((material) => (
                  <Box key={material.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {getFileIcon(material.type)}
                    <Typography variant="body2" sx={{ ml: 1 }}>{material.name}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">Favorite Materials</Typography>
                {favoriteMaterials.map((material) => (
                  <Box key={material.id} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {getFileIcon(material.type)}
                    <Typography variant="body2" sx={{ ml: 1 }}>{material.name}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* File Upload Section */}
      <Paper {...getRootProps()} sx={{ p: 2, mb: 4, textAlign: 'center', cursor: 'pointer', bgcolor: isDragActive ? 'action.hover' : 'background.paper' }}>
        <input {...getInputProps()} />
        <UploadFileIcon sx={{ fontSize: 48, mb: 2 }} />
        <Typography>
          {isDragActive ? 'Drop the files here...' : 'Drag and drop files here, or click to select files'}
        </Typography>
      </Paper>

      {/* Search, Sort, and Filter Section */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              startIcon={<SortIcon />} 
              onClick={(e) => setSortAnchorEl(e.currentTarget)}
            >
              Sort
            </Button>
            <Menu
              anchorEl={sortAnchorEl}
              open={Boolean(sortAnchorEl)}
              onClose={() => setSortAnchorEl(null)}
            >
              <MenuItem onClick={() => setSortAnchorEl(null)}>Name</MenuItem>
              <MenuItem onClick={() => setSortAnchorEl(null)}>Date</MenuItem>
              <MenuItem onClick={() => setSortAnchorEl(null)}>Subject</MenuItem>
              <MenuItem onClick={() => setSortAnchorEl(null)}>Progress</MenuItem>
            </Menu>
            <Button 
              startIcon={<FilterListIcon />} 
              onClick={(e) => setFilterAnchorEl(e.currentTarget)}
            >
              Filter
            </Button>
            <Menu
              anchorEl={filterAnchorEl}
              open={Boolean(filterAnchorEl)}
              onClose={() => setFilterAnchorEl(null)}
            >
              <MenuItem onClick={() => setFilterAnchorEl(null)}>All</MenuItem>
              <MenuItem onClick={() => setFilterAnchorEl(null)}>PDF</MenuItem>
              <MenuItem onClick={() => setFilterAnchorEl(null)}>Document</MenuItem>
              <MenuItem onClick={() => setFilterAnchorEl(null)}>Video</MenuItem>
              <MenuItem onClick={() => setFilterAnchorEl(null)}>Audio</MenuItem>
              <MenuItem onClick={() => setFilterAnchorEl(null)}>Favorites</MenuItem>
            </Menu>
          </Box>
        </Grid>
      </Grid>

      {/* Materials Grid */}
      <Grid container spacing={2}>
        {currentMaterials.map((material) => (
          <Grid item xs={12} sm={6} md={3} key={material.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="div"
                sx={{
                  pt: '56.25%',
                  bgcolor: 'grey.200',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                {getFileIcon(material.type)}
                <IconButton
                  sx={{ position: 'absolute', top: 5, right: 5 }}
                  onClick={() => toggleFavorite(material.id)}
                >
                  <StarIcon color={material.favorite ? 'primary' : 'action'} />
                </IconButton>
              </CardMedia>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {material.name}
                </Typography>
                <Typography>
                  Subject: {material.subject}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last accessed: {material.lastAccessed}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>Progress:</Typography>
                  <LinearProgress variant="determinate" value={material.progress} sx={{ flexGrow: 1 }} />
                  <Typography variant="body2" sx={{ ml: 1 }}>{material.progress}%</Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                  {material.tags.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <IconButton size="small" onClick={() => handlePreview(material)}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton size="small">
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => handleDelete(material.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination 
          count={Math.ceil(filteredMaterials.length / materialsPerPage)} 
          page={currentPage} 
          onChange={handleChangePage} 
          color="primary" 
        />
      </Box>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{previewMaterial?.name}</DialogTitle>
        <DialogContent>
          {/* Add preview content here based on material type */}
          <Typography>Preview not available for this file type.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudyMaterials;