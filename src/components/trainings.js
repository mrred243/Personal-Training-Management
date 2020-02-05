import React, {useState} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import AddTrainings from './addTrainings';

export default function Training(props) {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);
  const customerURL = props.customer.links[0].href;
  console.log(customerURL);

  const handleClickOpen = (event) => {
    setOpen(true);
    fetchTrainings(props.customer.links[2].href);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const fetchTrainings = (link) => {
    fetch(link)
    .then( response => response.json())
    .then( data =>
      {setTrainings(data.content);
        ;}
    );

  };

  const saveTraining = (newTrain) => {
    fetch('https://customerrest.herokuapp.com/api/trainings/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTrain)
      }
    )
    .then(res => fetchTrainings(props.customer.links[2].href))
    .catch(err => console.error(err))
};

  const deleteTraining = (link) => {
    console.log(link);
    if (window.confirm('Are you sure?')) {
      fetch(link, {method: 'DELETE'})
      .then(res => {fetchTrainings(props.customer.links[2].href);
        })
      .catch(err => console.error(err))
    };
  }


const columns = [
  {
    Header: 'Date',
    accessor: 'date',
    width: 200,


  },
  {
    Header: 'Duration (mins)',
    accessor: 'duration',
    width: 150
  },
  {
    Header: 'Activity',
    accessor: 'activity',
    width: 150
  },
  {
    sortable: false,
    filterable: false,
    width: 150,
    accessor: 'links[1].href',
    Cell: ({value}) => <Button size="small" color="secondary" onClick={() => deleteTraining(value)}>Delete</Button>
  }

]

return (
    <div style={{margin: 10}}>
        <Button size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
          Get trainings
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id=" form-dialog-title">Trainings</DialogTitle>
          <DialogContent>
              <ReactTable  defaultPageSize={5} data={trainings} columns={columns} />
          </DialogContent>
          <DialogActions>
              <AddTrainings saveTraining={saveTraining} link={customerURL} />
              <Button onClick={handleClose} color="secondary">
                Close
              </Button>
          </DialogActions>
          </Dialog>
    </div>
);




}
