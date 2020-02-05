import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditCustomer(props) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState(
    {firstname: '', lastname: '', email: '', streetaddress: '', city: '', postcode: '', phone: ''}
  )

  const handleClickOpen = () => {
    console.log(props.cus)
    setCustomer({firstname: props.customer.firstname, lastname: props.customer.lastname, email: props.customer.email,
       streetaddress: props.customer.streetaddress, city: props.customer.city, postcode: props.customer.postcode, phone: props.customer.phone });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setCustomer({...customer, [event.target.name]: event.target.value});
  }

  const updateCus = () => {
    props.updateCus(customer, props.customer.links[1].href);
    handleClose();
  }

  return (
    <div>
    <Button size="small" color="primary" onClick={handleClickOpen}>
      Edit
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit Customer's information here
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="firstname"
          value= {customer.firstname}
          onChange={e => handleInputChange(e)}
          label="First name"
          fullWidth
          />
          <TextField
          margin="dense"
          name="lastname"
          value= {customer.lastname}
          onChange={e => handleInputChange(e)}
          label="Last name"
          fullWidth
          />
          <TextField
          margin="dense"
          name="streetaddress"
          value= {customer.streetaddress}
          onChange={e => handleInputChange(e)}
          label="Street Address"
          fullWidth
        />
          <TextField
          margin="dense"
          name="postcode"
          value= {customer.postcode}
          onChange={e => handleInputChange(e)}
          label="Postcode"
          fullWidth
        />
          <TextField
          margin="dense"
          name="city"
          value= {customer.city}
          onChange={e => handleInputChange(e)}
          label="City"
          fullWidth
        />
        <TextField
        margin="dense"
        name="phone"
        value= {customer.phone}
        onChange={e => handleInputChange(e)}
        label="Phone number"
        fullWidth
      />
        <TextField
        margin="dense"
        name="email"
        value= {customer.email}
        onChange={e => handleInputChange(e)}
        label="Email"
        fullWidth
      />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={updateCus} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </div> )
}
