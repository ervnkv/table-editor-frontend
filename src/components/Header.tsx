// React
import {NavLink, useLocation} from 'react-router-dom';
// Material UI элементы
import { Box, Button, Tab, Tabs } from '@mui/material';

import { useTranslation } from 'react-i18next';


interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
    const location = useLocation().pathname.split('/').at(-1);
    
    const {t, i18n} = useTranslation('header');

    const toggleLang = () => {
      i18n.language === "ru" ? i18n.changeLanguage('en'): i18n.changeLanguage("ru");
    };

    return(
      <>
        <Box sx={{ mb: 5 }}>
            <Tabs value={location} centered> 
                <Tab label={t('employee_tab')} component={NavLink} to="/employees" value='employees'/>
                <Tab label={t('degree_tab')} component={NavLink} to="/degrees" value='degrees'/>
            </Tabs>
        </Box>

        <Button 
          variant="text" 
          onClick={toggleLang}
          sx={{position: "absolute", left: 0, top: 5}}
        >{i18n.language}</Button>
      </>
    )
};

