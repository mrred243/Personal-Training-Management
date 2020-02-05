import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import AddCustomers from './addCustomers';
import Training from './trainings';
import EditCustomer from './editCustomer';


export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');


  useEffect(() => fetchData(), []);

  const inputChanged = (event) => {
    setInput(event.target.value);
  }

  const searchById = (event) => {
    event.preventDefault();
    console.log(input);
    fetch('https://customerrest.herokuapp.com/api/customers/' + input)
    .then( response => response.json())
    .then( data => {
                    setCustomers([data]);
                    setInput('');
                  });
  }

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers/')
    .then( response => response.json())
    .then( data => { setCustomers(data.content);
    })
    .catch(err => console.error(err))

  }

  const saveCus = (newCus) => {
    fetch('https://customerrest.herokuapp.com/api/customers/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCus)
      }
    )
    .then(res => fetchData())
    .catch(err => console.error(err))

  }

  const deleteCus = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(link, {method: 'DELETE'})
      .then(res => fetchData())
      .then(res => setMessage('Customers is deleted'))
      .catch(err => console.error(err))
    }
  }

  const updateCus = (cus, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cus)
    })
    .then(res => fetchData())
    .catch(err => console.error(err))
  }


const columns = [
  {
    Header: 'ID',
    Cell: row => (row.index + 1),
    width: 50
  },
  {
    Header: 'First Name',
    accessor: 'firstname'
  },
  {
    Header: 'Last Name',
    accessor: 'lastname'
  },
  {
    Header: 'Street Address',
    accessor: 'streetaddress'
  },
  {
    Header: 'Postcode',
    accessor: 'postcode'
  },
  {
    Header: 'City',
    accessor: 'city'
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Phone number',
    accessor: 'phone'
  },

  {
    sortable: false,
    filterable: false,
    width: 150,
    Cell: row => <div>
                    <EditCustomer updateCus={updateCus} customer={row.original} />
                    <Training customer={row.original} />
                </div>
  },
  {
    sortable: false,
    filterable: false,
    width: 75,
    accessor: 'links[1].href',
    Cell: ({value}) => <button size="small" color="secondary" onClick={() => deleteCus(value)} >Delete</button>
  },



]

return (
    <div>
          <form style={{margin: "20px 0px 20px 0px"}} onSubmit={searchById} value={input}>
              <input type="number" onChange={inputChanged} value={input} />
              <input type="submit" value="Search by CustomerID" />
          </form>

          <ReactTable defaultPageSize={15}
            defaultSortDesc={true}
           filterable={true} data={customers} columns={columns} />
          <AddCustomers saveCus={saveCus} />
    </div>
);




}
