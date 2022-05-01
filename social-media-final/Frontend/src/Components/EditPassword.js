import React, { useState } from 'react'
import { TextField, Box, Grid, Container, Typography, Button } from '@mui/material';
import axios from "axios"


function EditPassword(props) {

let id =  JSON.parse(localStorage.getItem("id"))
const[error , setError]= useState('')
const [ data , setData] = useState({
  userId:id,
  previousPassword:"",
  newPassword:"",
  confirmPassword:""
})

console.log(error)

function fetching(e) {
  axios.put(`http://localhost:7000/user/changepassword/${id}`, data , { headers: { authorization:JSON.parse(localStorage.getItem("token")) } })
      .then((response) => {
         console.log(response)
         setError('')
         props.handleClose2()
         props.handleClickk()
      })
      .catch((error) =>{
      
          setError(error.response.data.message)
        }
      )
}


  return (
  <>
  <form >


          <Grid
            container
            alignItems={"center"}
            sx={{ marginLeft: "auto", marginRight: "auto" }}
            spacing={2}
          >
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                 Change Password
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField

                fullWidth
                onChange={(e) => setData({ ...data, previousPassword: e.target.value })}
                type="text"
                value={data.previousPassword}
                label="Current Password"


                error={ Array.isArray(error) && error[0] && true }
                helperText={Array.isArray(error) &&  error[0] && error[0]}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                onChange={(e) => setData({ ...data, newPassword: e.target.value })}
                label="New Password"
                type="password"                                                 // please make change in backend in user line no 126    
                error={ Array.isArray(error) && error[1] && true }              //res.status(403).json({
                                                                                  // success: false,
                                                                                     //  message: "please provide correct password",
                helperText={ Array.isArray(error) && error[1] && error[1]}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
                label="Confirm Password"
                type="password"
                error={Array.isArray(error) &&  error[2] && true }
                helperText={Array.isArray(error) &&  error[2] && error[2]}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h6" sx={{ color:"red" }}>
                {!Array.isArray(error) &&  error && error}
                  
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={(e)=>fetching(e)}>
                {" "}
                Save
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={(e)=>props.handleClose2()}>
                {" "}
                close
              </Button>
            </Grid>
          </Grid>
        </form>
  </>
    )
}

export default EditPassword
