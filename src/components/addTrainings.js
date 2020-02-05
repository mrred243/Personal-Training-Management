import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';


export default function AddTrainings(props) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState(
    {date: '', duration: '', activity: '', customer: props.link}
  )

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setTraining({...training, [event.target.name]: event.target.value});
  };

  const addTraining = () => {
    const trueDate = moment(training.date).toISOString();
    console.log(trueDate);
    setTraining({...training,
      date: trueDate.slice(0, -1)
    });

    console.log(JSON.stringify(training));
    props.saveTraining(training);
    handleClose();
  };

  return (
    <div style={{margin: 10}}>
    <Button variant="outlined" color="primary" onClick={handleClickOpen}>
      Add new training
    </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">New Training</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill training's information here
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="date"
          value= {training.date}
          onChange={e => handleInputChange(e)}
          label="Date"
          fullWidth
          type="datetime-local"
          />
          <TextField
          margin="dense"
          name="duration"
          value= {training.duration}
          onChange={e => handleInputChange(e)}
          label="duration"
          fullWidth
          />
          <TextField
          margin="dense"
          name="activity"
          value= {training.activity}
          onChange={e => handleInputChange(e)}
          label="Activity"
          fullWidth
        />


      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={addTraining} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </div> )
}
