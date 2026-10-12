import { Urls } from "@/config/urls";
import { AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { MenuIcon, User } from "lucide-react";
import { useState, type ReactNode } from "react";

function LeftSlot() {
  return (<>
    <IconButton size="large" color="inherit" edge="start" aria-label="menu">
      <MenuIcon />
    </IconButton>
  </>);
}

const settings = [{
  label: "Profile",
  url:   Urls.AuthProfile,
}, {
  label: "Sign In",
  url:   Urls.AuthSignIn,
}, {
  label: "Sign Out",
  url:   Urls.AuthSignOut,
}];

function RightSlot() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (<>
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open Menu">
        <IconButton onClick={handleOpenUserMenu} size="large" color="inherit" edge="end" aria-label="user">
          <User />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
        className="-mt-1"
      >
        {settings.map(({ label, url }, key) => (
          <MenuItem key={key} onClick={handleCloseUserMenu}>
            <Typography className="w-full min-w-24 text-sm">
              <Link to={url}>{label}</Link>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  </>);
}

type Props = {
  leftSlot?:  ReactNode,
  children:   ReactNode,
  rightSlot?: ReactNode,
}

function NavigationBar(props: Props) {
  const { leftSlot = <LeftSlot />, children, rightSlot = <RightSlot /> } = props;

  return (<>
    <Box className="grow">
      <AppBar position="static">
        <Toolbar>
          {leftSlot}
          <Box className="flex grow justify-center">
            {children}
          </Box>
          {rightSlot}
        </Toolbar>
      </AppBar>
    </Box>
  </>);
}

export default NavigationBar;
