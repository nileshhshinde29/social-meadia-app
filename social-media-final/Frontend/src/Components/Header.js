import  React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import Modal from '@mui/material/Modal';
import { TextField, Box, Grid, Container, Typography, Button } from '@mui/material';
import EditPassword from './EditPassword';
import EditProfile from './EditProfile';
import {Outlet, useLocation, useNavigate} from "react-router-dom"
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';


const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function ButtonAppBar(props) {

  let id =  JSON.parse(localStorage.getItem("id"))
  const [state, setState]= React.useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const [data , setData]= React.useState()

  React.useEffect(()=>{
    if(id)
    {
      fetching()
    }
     
  },[])


  
     function fetching() {
      
        axios.get(`http://localhost:7000/user/${id}`, { headers: { authorization:JSON.parse(localStorage.getItem("token")) } })
            .then((response) => {
            setData(response.data)
            })
            .catch((error) =>
                console.log(error)
            )
    }

    

var _a = React.useState(null), anchorEl = _a[0], setAnchorEl = _a[1];
var open = Boolean(anchorEl);
var handleClick = function (event) {
    setAnchorEl(event.currentTarget);
};
var handleClose = function () {
    setAnchorEl(null);
};

const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const Logout =()=>{

    localStorage.clear()
    props.setToken('')
    navigate("/login")
    
    
  }

  const [openn, setOpenn] = React.useState(false);

  const handleClickk = () => {
    setOpenn(true);
  };

  const handleClosee = (event: React.SyntheticEvent | Event, reason ?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenn(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClosee}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClosee}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <Button onClick={handleClickk}>Open simple snackbar</Button> */}
      <Snackbar
        open={openn}
        autoHideDuration={6000}
        onClose={handleClosee}
        message="Password Changed Successfully"
        action={action}
      />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News Feed
          </Typography>
         
          
          <Avatar aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} alt="Remy Sharp" src={data && data.profilePicture} />
      {/* <Button
        id="basic-button"
        color="inherit"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button> */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleOpen3}>Edit Profile</MenuItem>
            <Modal
                open={open3}
                onClose={handleClose3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <EditProfile/>
                </Box>
            </Modal>
        <MenuItem onClick={handleOpen2}>Change Password</MenuItem>
                <Modal
                open={open2}
                // onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <EditPassword handleClickk={handleClickk} handleClose2={handleClose2} />
                </Box>
            </Modal>
        <MenuItem onClick={()=>Logout()}>Logout</MenuItem>
      </Menu>
    
    <Button color="inherit">{data && data.firstname +" "+ data.lastname} </Button>
        </Toolbar>
      </AppBar>
      <Outlet/>
    </Box>
    
  );
}
