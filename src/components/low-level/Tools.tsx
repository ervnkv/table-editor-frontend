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
  return(
    <Grid container justifyContent="space-between" >
      <Grid item>
          <Button 
              startIcon={<AddCircleIcon />} 
              variant="contained" 
              color="success"
              onClick={addOnClick}
          >
              Добавить!
          </Button>
      </Grid>
      <Grid item>
          <Button 
              disabled={editDisable} 
              startIcon={<EditIcon />} 
              variant="contained" 
              color="warning"
              onClick={editOnClick}
          >
              Редактировать
          </Button>
      </Grid>
      <Grid item>
          <Tooltip title="Выделенный уровень образования используется" placement="bottom" arrow open={removeTipOpen} >
              <Button 
                  disabled={removeDisable} 
                  startIcon={<DeleteForeverIcon />} 
                  variant="contained" 
                  color="error"
                  onClick={removeOnClick}
              >
                  Удалить
              </Button>
          </Tooltip>
      </Grid>
    </Grid>
  )
};