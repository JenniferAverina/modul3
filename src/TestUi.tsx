import { AddShoppingCart, Alarm, Delete } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";

export function TestUi() {
    return <Box>
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>

        <IconButton aria-label="delete">
            <Delete fontSize="inherit"/>
        </IconButton>
        <IconButton aria-label="delete" disabled color="primary">
            <Delete fontSize="small"/>
        </IconButton>
        <IconButton color="secondary" aria-label="add an alarm">
            <Alarm />
        </IconButton>
        <IconButton color="primary" aria-label="add to shopping cart">
            <AddShoppingCart /> 
            </IconButton>
    </Box>
}