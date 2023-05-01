// Material UI элементы
import { 
  Button,
  Grid,
  Tooltip,
} from '@mui/material';
import {
  AddCircle as AddCircleIcon,
  Edit as EditIcon,
  DeleteForever as DeleteForeverIcon,
} from '@mui/icons-material';
// Локализация
import { useTranslation } from 'react-i18next';

// Типизация пропсов
interface ToolsProps {
  addOnClick: () => void,
  editOnClick: () => void,
  editDisable: boolean,
  removeOnClick: () => void,
  removeDisable: boolean,
  removeTipOpen?: boolean,
};

export const Tools = ({addOnClick,editOnClick,editDisable,removeOnClick,removeDisable,removeTipOpen = false}: ToolsProps) => {
  const {t} = useTranslation(['buttons', 'errors']);

  return(
    <Grid container justifyContent="space-between" >
      <Grid item>
          <Button 
              startIcon={<AddCircleIcon />} 
              variant="outlined" 
              // color="success"
              color="primary"
              onClick={addOnClick}
          >
              {t('add_button')}
          </Button>
      </Grid>
      <Grid item>
          <Button 
              disabled={editDisable} 
              startIcon={<EditIcon />} 
              variant="outlined" 
              // color="warning"
              color="primary"
              onClick={editOnClick}
          >
              {t('edit_button')}
          </Button>
      </Grid>
      <Grid item>
          <Tooltip sx={{zIndex: 3}} title={t('errors:degree_used')} placement="bottom" arrow open={removeTipOpen} >
              <Button 
                  disabled={removeDisable} 
                  startIcon={<DeleteForeverIcon />} 
                  variant="outlined" 
                  // color="error"
                  color="primary"
                  onClick={removeOnClick}
              >
                  {t('remove_button')}
              </Button>
          </Tooltip>
      </Grid>
    </Grid>
  )
};