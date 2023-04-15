// Material UI элементы
import { 
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  Edit as EditIcon,
  Backspace as BackspaceIcon,
} from '@mui/icons-material';
// Redux-toolkit инструменты
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { modalDegreeOpen } from '../../store/slices/employeeSlice';
import { selectedClear } from '../../store/slices/degreeSlice';

// Типизация пропсов
interface ModalSelectProps {
  label: string,
  value: number,
  defaultValue: number,
  onChange: (e: SelectChangeEvent<number>) => void,
  clearOnClick: () => void,
};

export const ModalSelect = ({label,value,defaultValue,onChange,clearOnClick}: ModalSelectProps) => {
  const dispatch = useAppDispatch();
  const listDegree = useAppSelector(state => state.degree.list);
  const defaultDegreeName = 'Не выбрано';

  return(
    <Box sx={{mb: 3, display: 'inline-flex', width: '100%'}}>
      <FormControl sx={{width: '100%'}}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          value={value}
          label="Образование"
          onChange={onChange}
        >
          <MenuItem disabled value={defaultValue}>{defaultDegreeName}</MenuItem>
          {listDegree.map(degree => (
            <MenuItem key={degree.name} value={degree.id}>{degree.name}</MenuItem>
          ))}

        </Select>
      </FormControl>
      
      <IconButton sx={{m: 1}} color="primary" onClick={() => {
        dispatch(selectedClear());
        dispatch(modalDegreeOpen());
      }}>
        <EditIcon />
      </IconButton>

      <IconButton sx={{m: 1, ml: 0, mr: 0}} color="primary" disabled={value === defaultValue} onClick={clearOnClick}>
        <BackspaceIcon />
      </IconButton>
    </Box>
  )
};