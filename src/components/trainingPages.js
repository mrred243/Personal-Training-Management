import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import moment from 'moment';


export default function TrainingPage() {



  const [trainings, setTrainings] = useState([]);



  const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then( response => response.json())
    .then( data => {setTrainings(data);
      console.log(data);}
        );
  };





  useEffect(() => fetchTrainings(), []);

const columns = [
  {
    Header: 'ID',
    Cell: row => (row.index + 1),
    width: 50
  },
  {
    Header: 'Date',
    accessor: 'date',
    width: 200,
    Cell: ({value}) => moment(value).format ("L, LT")

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
    Header: "Customers' name",
    Cell: row => {
      let name = row.original.customer.firstname + ' ' + row.original.customer.lastname;
      return name;
    }
    },
]

return (
    <div style={{margin: 10}}>

              <ReactTable  defaultPageSize={15} data={trainings} columns={columns} />

    </div>
);




}
