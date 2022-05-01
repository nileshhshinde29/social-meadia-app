import React from 'react'
import { TextField, Box, Grid, Container, Typography, FormControl ,FormLabel ,Button, TextareaAutosize, Radio ,RadioGroup, FormControlLabel } from '@mui/material';

import AdapterDateFns from "@mui/lab/AdapterDateFns"
import { LocalizationProvider , DatePicker} from '@mui/lab'
import axios from "axios"



function EditProfile() {
let id =  JSON.parse(localStorage.getItem("id"))

const [data , setData]= React.useState({
  profilePicture: '',
  username: '',
  lastname: '',
  email: '',
  password: '',
  isAdmin: '',
  bio: '',
  dob: '',
  gender: '',
  mobile: '',
  username: '',
    
  
})

React.useEffect(()=>{
fetching()
},[])
const formData =new FormData();

function Update(e) {

formData.append("profilePicture", data.profilePicture)
formData.append("userId", data.userId)
formData.append("email", data.email)
formData.append("firstname", data.firstname)
formData.append("password", data.password)
formData.append("username", data.username)
formData.append("bio", data.bio)
formData.append("dob", data.dob)
formData.append("gender", data.gender)
// console.log(formData.get('profilePicture'))
// console.log(formData.getAll)

  axios.put(`http://localhost:7000/user/${id}`, formData , { headers: { authorization:JSON.parse(localStorage.getItem("token")) } })
      .then((response) => {
         console.log(response)
      })
      .catch((error) =>
          console.log(error)
      )
}

function fetching() {
      
  axios.get(`http://localhost:7000/user/${id}`, { headers: { authorization:JSON.parse(localStorage.getItem("token")) } })
      .then((response) => {
          // console.log(response)

      setData( {...response.data, userId:id ,  username:response.data.firstname,password:'Nilesh@123'})
      })
      .catch((error) =>
          console.log(error)
      )
}
console.log(data)



  return (
    <>
      <form>
          <Grid
            container
            alignItems={"center"}
            sx={{ marginLeft: "auto", marginRight: "auto" }}
            spacing={2}
            // xs={12}
          >
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                 Edit Profile
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <input
                fullWidth
                // name="image"
                // onChange={(e) => setData({ ...data, email: e.target.value })}
                id="outlined-basic"
                type="file"
                accept="image/*"
                // value={data.profilePicture}
                label="Upload Photo"
                onChange={(e) => setData({ ...data, profilePicture: e.target.files[0] })}
                // error={formErrors.email && true}
                // helperText={formErrors.email}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                // onChange={(e) => setData({ ...data, password: e.target.value })}
                label="Name"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                // error={formErrors.password && true}
                // helperText={formErrors.password}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
            <TextareaAutosize
                aria-label="empty textarea"
                 placeholder="Bio"
                 value={data.bio}
                 onChange={(e) => setData({ ...data, bio: e.target.value })}
                 minRows={3}
                //  labal="Bio"
                 style={{ width: '100%' }}
                />

            </Grid>
            <Grid item xs={12} >
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={data.gender}
                  onChange={(e) =>setData({ ...data, gender: e.target.value })}
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    disableFuture
                    label="Date Of Birth"
                    value={data.dob}
                    openTo="year"
                    views={["year", "month", "day"]}
                    // value={AllEmployeData.DOB}
                    onChange={(newValue) => {
                      setData({ ...data, DOB: newValue });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-basic"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
                label="Email"
                type="email"
                // error={formErrors.password && true}
                // helperText={formErrors.password}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                id="outlined-basic"
                onChange={(e) => setData({ ...data, mobile: e.target.value })}
                label="Mobile"
                value={data.mobile}
                type="mobile"

                // error={formErrors.password && true}
                // helperText={formErrors.password}
                variant="outlined"
              />
            </Grid>
            
            <Grid item xs={12}>
            <Typography variant="h6" sx={{ color:"red" }}>
                {/* {formErrors.backendError} */}
                  
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Button fullWidth variant="contained" onClick={()=>Update()}>
                {" "}
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
    </>
  )
}

export default EditProfile