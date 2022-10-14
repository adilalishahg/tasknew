// import Toolbar from '@mui/material/Toolbar';
import { Typography, AppBar, Toolbar, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
const Header = styled(AppBar)`
  background: #111111;
`;
const Tabs = styled(NavLink)`
  font-size: 20px;
  margin-right: 20px;
  color: inherit;
  text-decoration: none;
`;
const NavBar = () => {
  return (
    <Header position="static">
      <Toolbar>
        <Tabs to="/all">All</Tabs>
        <Tabs to="/add">Add New</Tabs>
        <Tabs to="/login">LogIn</Tabs>
      </Toolbar>
    </Header>
  );
};
export default NavBar;
