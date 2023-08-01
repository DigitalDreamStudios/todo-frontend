import React, { useState } from 'react';
import { Box, Button, Modal, TextField, createTheme, ThemeProvider } from '@mui/material';
import { Todo } from '../../models/Todo.type';

interface EditModalProps {
    open: boolean;
    onClose: () => void;
    editedTodo: Todo | null;
    onModalSave: (updatedTodo: Todo) => Promise<void>;
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const EditModal: React.FC<EditModalProps> = ({ open, onClose, editedTodo, onModalSave }) => {
    const [editedTitle, setEditedTitle] = useState(editedTodo?.title || '');
    const [editedDescription, setEditedDescription] = useState(editedTodo?.description || '');

    const handleModalSave = async () => {
        const updatedTodo: Todo = { ...editedTodo!, title: editedTitle, description: editedDescription };
        await onModalSave(updatedTodo);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        minWidth: 400,
                        borderRadius: '10px', // Round the corners
                    }}
                >
                    <h2
                        id="modal-title"
                        style={{
                            color: 'white', // Set the title color to white
                            marginBottom: '16px', // Add margin to separate it from the inputs
                        }}
                    >
                        Edit Todo
                    </h2>
                    <TextField
                        label="Title"
                        variant="outlined"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        fullWidth
                        sx={{ mt: 2 }} // Add margin-top to separate it from the buttons
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" color="success" onClick={handleModalSave}>
                            Save
                        </Button>
                        <Button variant="contained" color="error" onClick={onClose}>
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </ThemeProvider>
    );
};

export default EditModal;
