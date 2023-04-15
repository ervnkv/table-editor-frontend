// Material UI элементы
import { 
  Box,
  Typography,
  IconButton
} from '@mui/material';
import {
  Clear as ClearIcon,
} from '@mui/icons-material';

// Типизация пропсов
interface ModalHeaderProps {
    title: string,
    closeFunction: () => void,
};

export const ModalHeader = ({title, closeFunction}: ModalHeaderProps) => {
    return(
        <Box sx={{display: 'inlineFlex', justifyContent: 'space-between'}}>
            <Typography variant="h6" component="h2" sx={{mb: 3}}>
                {title}
            </Typography>
            <IconButton  color="inherit" onClick={closeFunction}>
                <ClearIcon />
            </IconButton>
        </Box>
    )
};