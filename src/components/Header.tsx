// React
import {matchPath, NavLink, useLocation} from 'react-router-dom';
// Material UI элементы
import { Box, Button, Tab, Tabs } from '@mui/material';

import { useTranslation } from 'react-i18next';

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();
  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }
  return null;
}

interface HeaderProps {}

export const Header = ({}: HeaderProps) => {
    const routeMatch = useRouteMatch(['/employees', '/degrees']);
    const currentTab = routeMatch?.pattern?.path;
    
    const {t, i18n} = useTranslation('header');

    const toggleLang = () => {
      i18n.language === "ru" ? i18n.changeLanguage('en'): i18n.changeLanguage("ru");
      // i18n.changeLanguage('en');
    };

    return(
      <>
        <Box sx={{ mb: 5 }}>
            <Tabs value={currentTab} centered> 
                <Tab label={t('employee_tab')} component={NavLink} to="/employees" value="/employees"/>
                <Tab label={t('degree_tab')} component={NavLink} to="/degrees" value="/degrees"/>
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

