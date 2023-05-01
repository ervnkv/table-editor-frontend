// Material UI элементы
import { 
  Box,
  Button,
} from '@mui/material';
import {
    Done as DoneIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// Типизация пропсов
interface ModalDoneButtonProps {
    onClick: () => void,
    disable: boolean,
};

export const ModalDoneButton = ({onClick, disable}: ModalDoneButtonProps) => {
  const {t} = useTranslation('buttons');
    return(
        <Box  sx={{display: 'flex', justifyContent: 'center'}}>         
          <Button 
            disabled={disable} 
            startIcon={<DoneIcon />} 
            variant="outlined"
            color="primary"
            onClick={onClick}
          >
            {t('accept_button')}
          </Button>
        </Box>
    )
};