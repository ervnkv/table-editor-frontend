// Material UI элементы
import { 
  Box,
  IconButton
} from '@mui/material';
import {
    Done as DoneIcon,
} from '@mui/icons-material';

// Типизация пропсов
interface ModalDoneButtonProps {
    onClick: () => void,
    disable: boolean,
};

export const ModalDoneButton = ({onClick, disable}: ModalDoneButtonProps) => {
    return(
        <Box  sx={{display: 'flex', justifyContent: 'center'}}>         
          <IconButton 
            color="primary" 
            onClick={onClick}
            disabled={disable} 
        >
            <DoneIcon />
          </IconButton>
        </Box>
    )
};