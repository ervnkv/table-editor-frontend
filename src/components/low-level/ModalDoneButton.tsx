// Material UI элементы
import { 
  Box,
  Button,
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
          <Button 
            disabled={disable} 
            startIcon={<DoneIcon />} 
            variant="outlined"
            color="primary"
            onClick={onClick}
          >
            ОК
          </Button>
        </Box>
    )
};