import {useState} from 'react';
import {NavLink} from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';


interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, value: number) => {
      setValue(value);
    };
    
    return(
        <Box sx={{ mb: 5 }}>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label='Сотрудники' component={NavLink} to="/employees" />
                <Tab label='Образование' component={NavLink} to="/degrees" />
            </Tabs>
        </Box>
    )
};

