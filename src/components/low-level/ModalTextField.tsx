// Material UI элементы
import { 
  TextField,
} from '@mui/material';

// Типизация пропсов
interface ModalTextFieldProps {
    label: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    defaultValue?: string,
};

export const ModalTextField = ({label, placeholder, onChange, defaultValue}: ModalTextFieldProps) => {
    return(
        <TextField
          sx={{width: '100%', mb: 3}}
          label={label}
          placeholder={placeholder}
          defaultValue={defaultValue}
          size="medium"
          onChange={onChange}
        />
    )
};