// React
import {matchPath, NavLink, useLocation} from 'react-router-dom';
// Material UI элементы
import { Box, Tab, Tabs } from '@mui/material';


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
    return(
        <Box sx={{ mb: 5 }}>
            <Tabs value={currentTab} centered> 
                <Tab label='Сотрудники' component={NavLink} to="/employees" value="/employees"/>
                <Tab label='Образование' component={NavLink} to="/degrees" value="/degrees"/>
            </Tabs>
        </Box>
    )
};

