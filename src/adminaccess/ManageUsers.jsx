

// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import './ManageUsers.css';

// Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const ManageUsers = () => {
//   const [basicInfoAccount, setBasicInfoAccount] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [updateOpen, setUpdateOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [newUser, setNewUser] = useState({
//     accountNumber: '',
//     loanAmount: '',
//     loanRequestedFor: ''
//   });

//   useEffect(() => {
//     fetch('http://localhost:8000/basic-info-account/')
//       .then(response => response.json())
//       .then(data => {
//         console.log('Fetched data:', data); // Debugging line
//         setBasicInfoAccount(data);
//       })
//       .catch(error => console.error('Error fetching users:', error));
//   }, []);

//   const handleDelete = (id) => {
//     fetch(`http://localhost:8000/basic-info-account/${id}`, { method: 'DELETE' })
//       .then(() => setBasicInfoAccount(basicInfoAccount.filter(user => user.id !== id)))
//       .catch(error => console.error('Error deleting user:', error));
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClickUpdateOpen = (user) => {
//     setCurrentUser(user);
//     setNewUser({
//       accountNumber: user.account_number,
//       loanAmount: user.loan_amount,
//       loanRequestedFor: user.loan_requested_for
//     });
//     setUpdateOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setUpdateOpen(false);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   const handleAddUser = () => {
//     fetch('http://localhost:8000/basic-info-account/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         account_number: newUser.accountNumber,
//         loan_amount: newUser.loanAmount,
//         loan_requested_for: newUser.loanRequestedFor
//       })
//     })
//     .then(response => response.json())
//     .then(data => {
//       setBasicInfoAccount([...basicInfoAccount, data]);
//       setNewUser({ accountNumber: '', loanAmount: '', loanRequestedFor: '' });
//       setOpen(false);
//     })
//     .catch(error => console.error('Error adding user:', error));
//   };

//   const handleUpdateUser = () => {
//     fetch(`http://localhost:8000/basic-info-account/${currentUser.id}/`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         account_number: newUser.accountNumber,
//         loan_amount: newUser.loanAmount,
//         loan_requested_for: newUser.loanRequestedFor
//       })
//     })
//     .then(response => response.json())
//     .then(data => {
//       setBasicInfoAccount(basicInfoAccount.map(user => (user.id === currentUser.id ? data : user)));
//       setNewUser({ accountNumber: '', loanAmount: '', loanRequestedFor: '' });
//       setUpdateOpen(false);
//     })
//     .catch(error => console.error('Error updating user:', error));
//   };

//   // Prepare data for the graph
//   const accountRequestData = basicInfoAccount.reduce((acc, user) => {
//     acc[user.account_number] = (acc[user.account_number] || 0) + 1;
//     return acc;
//   }, {});

//   const chartData = {
//     labels: Object.keys(accountRequestData),
//     datasets: [{
//       label: 'Number of Requests',
//       data: Object.values(accountRequestData),
//       backgroundColor: 'rgba(75, 192, 192, 0.2)',
//       borderColor: 'rgba(75, 192, 192, 1)',
//       borderWidth: 1
//     }]
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>Manage Users</Typography>
//       <Box mt={2} mb={2}>
//         <Button variant="contained" color="primary" onClick={handleClickOpen}>Add User</Button>
//       </Box>
//       <TableContainer component={Paper} className="table-container">
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell>Account Number</TableCell>
//               <TableCell>Loan Amount</TableCell>
//               <TableCell>Loan Requested For</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {basicInfoAccount.map(user => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.account_number}</TableCell>
//                 <TableCell>{user.loan_amount}</TableCell>
//                 <TableCell>{user.loan_requested_for}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
//                   <Button variant="contained" color="primary" onClick={() => handleClickUpdateOpen(user)}>Update</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box mt={4}>
//         <Typography variant="h6">Loan Requests by Account Number</Typography>
//         <Bar data={chartData} />
//       </Box>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New User</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To add a new user, please fill in the following fields.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="accountNumber"
//             label="Account Number"
//             type="text"
//             fullWidth
//             value={newUser.accountNumber}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="loanAmount"
//             label="Loan Amount"
//             type="text"
//             fullWidth
//             value={newUser.loanAmount}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="loanRequestedFor"
//             label="Loan Requested For"
//             type="text"
//             fullWidth
//             value={newUser.loanRequestedFor}
//             onChange={handleChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">Cancel</Button>
//           <Button onClick={handleAddUser} color="primary">Add</Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={updateOpen} onClose={handleClose}>
//         <DialogTitle>Update User</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To update the user details, please fill in the following fields.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="accountNumber"
//             label="Account Number"
//             type="text"
//             fullWidth
//             value={newUser.accountNumber}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="loanAmount"
//             label="Loan Amount"
//             type="text"
//             fullWidth
//             value={newUser.loanAmount}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="loanRequestedFor"
//             label="Loan Requested For"
//             type="text"
//             fullWidth
//             value={newUser.loanRequestedFor}
//             onChange={handleChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">Cancel</Button>
//           <Button onClick={handleUpdateUser} color="primary">Update</Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default ManageUsers;

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './ManageUsers.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ManageUsers = () => {
  const [basicInfoAccount, setBasicInfoAccount] = useState([]);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({
    accountNumber: '',
    loanAmount: '',
    loanRequestedFor: ''
  });

  useEffect(() => {
    fetch('http://localhost:8000/basic-info-account/')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debugging line
        setBasicInfoAccount(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/basic-info-account/${id}/`, {
      method: 'DELETE',
    })
    .then(() => setBasicInfoAccount(basicInfoAccount.filter(user => user.id !== id)))
    .catch(error => console.error('Error deleting user:', error));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickUpdateOpen = (user) => {
    setCurrentUser(user);
    setNewUser({
      accountNumber: user.account_number,
      loanAmount: user.loan_amount,
      loanRequestedFor: user.loan_requested_for
    });
    setUpdateOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdateOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    fetch('http://localhost:8000/basic-info-account/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        account_number: newUser.accountNumber,
        loan_amount: newUser.loanAmount,
        loan_requested_for: newUser.loanRequestedFor
      })
    })
    .then(response => response.json())
    .then(data => {
      setBasicInfoAccount([...basicInfoAccount, data]);
      setNewUser({ accountNumber: '', loanAmount: '', loanRequestedFor: '' });
      setOpen(false);
    })
    .catch(error => console.error('Error adding user:', error));
  };

  const handleUpdateUser = () => {
    fetch(`http://localhost:8000/basic-info-account/${currentUser.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        account_number: newUser.accountNumber,
        loan_amount: newUser.loanAmount,
        loan_requested_for: newUser.loanRequestedFor
      })
    })
    .then(response => response.json())
    .then(data => {
      setBasicInfoAccount(basicInfoAccount.map(user => (user.id === currentUser.id ? data : user)));
      setNewUser({ accountNumber: '', loanAmount: '', loanRequestedFor: '' });
      setUpdateOpen(false);
    })
    .catch(error => console.error('Error updating user:', error));
  };

  // Prepare data for the graph
  const accountRequestData = basicInfoAccount.reduce((acc, user) => {
    acc[user.account_number] = (acc[user.account_number] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(accountRequestData),
    datasets: [{
      label: 'Number of Requests',
      data: Object.values(accountRequestData),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Manage Users</Typography>
      <Box mt={2} mb={2}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>Add User</Button>
      </Box>
      <TableContainer component={Paper} className="table-container">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Account Number</TableCell>
              <TableCell>Loan Amount</TableCell>
              <TableCell>Loan Requested For</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basicInfoAccount.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.account_number}</TableCell>
                <TableCell>{user.loan_amount}</TableCell>
                <TableCell>{user.loan_requested_for}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
                  <Button variant="contained" color="primary" onClick={() => handleClickUpdateOpen(user)}>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4}>
        <Typography variant="h6">Loan Requests by Account Number</Typography>
        <Bar data={chartData} />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new user, please fill in the following fields.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="accountNumber"
            label="Account Number"
            type="text"
            fullWidth
            value={newUser.accountNumber}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="loanAmount"
            label="Loan Amount"
            type="text"
            fullWidth
            value={newUser.loanAmount}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="loanRequestedFor"
            label="Loan Requested For"
            type="text"
            fullWidth
            value={newUser.loanRequestedFor}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleAddUser} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={updateOpen} onClose={handleClose}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To update the user details, please fill in the following fields.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="accountNumber"
            label="Account Number"
            type="text"
            fullWidth
            value={newUser.accountNumber}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="loanAmount"
            label="Loan Amount"
            type="text"
            fullWidth
            value={newUser.loanAmount}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="loanRequestedFor"
            label="Loan Requested For"
            type="text"
            fullWidth
            value={newUser.loanRequestedFor}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleUpdateUser} color="primary">Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageUsers;


// import React, { useState, useEffect } from 'react'; // Ensure useState and useEffect are imported
// import { 
//   Container, 
//   Typography, 
//   Box, 
//   Button, 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableContainer, 
//   TableHead, 
//   TableRow, 
//   Paper, 
//   TextField, 
//   Dialog, 
//   DialogActions, 
//   DialogContent, 
//   DialogContentText, 
//   DialogTitle 
// } from '@mui/material';
// import './ManageUsers.css';

// const ManageUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [basicInfoAccount, setBasicInfoAccount] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [newUser, setNewUser] = useState({
//     accountNumber: '',
//     loanAmount: '',
//     loanRequestedFor: ''
//   });

//   useEffect(() => {
//     fetch('http://localhost:8000/basic-info-account/')
//       .then(response => response.json())
//       .then(data => setBasicInfoAccount(data))
//       .catch(error => console.error('Error fetching users:', error));

//     fetch('http://localhost:8000/basic-information/')
//       .then(response => response.json())
//       .then(data => setUsers(data))
//       .catch(error => console.error('Error fetching users:', error));
//   }, []);

//   const handleDelete = (id) => {
//     fetch(`http://localhost:8000/basic-info-account/${id}/`, { method: 'DELETE' })
//       .then(() => setBasicInfoAccount(basicInfoAccount.filter(user => user.id !== id)))
//       .catch(error => console.error('Error deleting user:', error));
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   const handleAddUser = () => {
//     fetch('http://localhost:8000/basic-info-account/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(newUser) // Assuming Django handles ID generation
//     })
//     .then(response => response.json())
//     .then(data => {
//       setBasicInfoAccount([...basicInfoAccount, data]);
//       setNewUser({ accountNumber: '', loanAmount: '', loanRequestedFor: '' });
//       setOpen(false);
//     })
//     .catch(error => console.error('Error adding user:', error));
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>Manage Users</Typography>
//       <Box mt={2} mb={2}>
//         <Button variant="contained" color="primary" onClick={handleClickOpen}>Add User</Button>
//       </Box>
//       <TableContainer component={Paper} className="table-container">
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell>Account Number</TableCell>
//               <TableCell>Loan Amount</TableCell>
//               <TableCell>Loan Requested For</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {basicInfoAccount.map(user => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.accountNumber}</TableCell>
//                 <TableCell>{user.loanAmount}</TableCell>
//                 <TableCell>{user.loanRequestedFor}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New User</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To add a new user, please fill in the following fields.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="accountNumber"
//             label="Account Number"
//             type="text"
//             fullWidth
//             value={newUser.accountNumber}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="loanAmount"
//             label="Loan Amount"
//             type="text"
//             fullWidth
//             value={newUser.loanAmount}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="loanRequestedFor"
//             label="Loan Requested For"
//             type="text"
//             fullWidth
//             value={newUser.loanRequestedFor}
//             onChange={handleChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">Cancel</Button>
//           <Button onClick={handleAddUser} color="primary">Add</Button>
//         </DialogActions>
//       </Dialog>
//       <Typography variant="h5" gutterBottom>Users with Basic Information</Typography>
//       <TableContainer component={Paper} className="table-container">
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>Full Name</TableCell>
//               <TableCell>Father/Husband Name</TableCell>
//               <TableCell>Gender</TableCell>
//               <TableCell>Occupation</TableCell>
//               <TableCell>Income</TableCell>
//               <TableCell>KYC Document Number</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Mobile</TableCell>
//               <TableCell>Permanent Address</TableCell>
//               <TableCell>Address Details</TableCell>
//               <TableCell>Communication Address</TableCell>
//               <TableCell>Pin Code</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map(user => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.id}</TableCell>
//                 <TableCell>{user.full_name}</TableCell>
//                 <TableCell>{user.father_or_husband_name}</TableCell>
//                 <TableCell>{user.gender}</TableCell>
//                 <TableCell>{user.occupation}</TableCell>
//                 <TableCell>{user.income}</TableCell>
//                 <TableCell>{user.kyc_document_number}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{user.mobile}</TableCell>
//                 <TableCell>{user.permanent_address}</TableCell>
//                 <TableCell>{user.address_details}</TableCell>
//                 <TableCell>{user.communication_address}</TableCell>
//                 <TableCell>{user.pin_code}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// };

//  export default ManageUsers;

// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Typography,
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle
// } from '@mui/material';
// import './ManageUsers.css';

// const ManageUsers = () => {
//   const [basicInfoAccount, setBasicInfoAccount] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [newUser, setNewUser] = useState({
//     account_number: '',
//     loan_amount: '',
//     loan_requested_for: ''
//   });

//   useEffect(() => {
//     fetch('http://localhost:8000/basic-info-account/')
//       .then(response => response.json())
//       .then(data => setBasicInfoAccount(data))
//       .catch(error => console.error('Error fetching users:', error));
//   }, []);

//   const handleDelete = (id) => {
//     fetch(`http://localhost:8000/basic-info-account/${id}`, { method: 'DELETE' })
//       .then(() => setBasicInfoAccount(basicInfoAccount.filter(user => user.id !== id)))
//       .catch(error => console.error('Error deleting user:', error));
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setNewUser({ ...newUser, [name]: value });
//   };

//   const handleAddUser = () => {
//     fetch('http://localhost:8000/basic-info-account/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ ...newUser, id: Math.random().toString(36).substr(2, 9) }) // Add an ID to the new user
//     })
//     .then(response => response.json())
//     .then(data => {
//       setBasicInfoAccount([...basicInfoAccount, data]);
//       setNewUser({ account_number: '', loan_amount: '', loan_requested_for: '' });
//       setOpen(false);
//     })
//     .catch(error => console.error('Error adding user:', error));
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>Manage Users</Typography>
//       <Box mt={2} mb={2}>
//         <Button variant="contained" color="primary" onClick={handleClickOpen}>Add User</Button>
//       </Box>
//       <TableContainer component={Paper} className="table-container">
//         <Table stickyHeader>
//           <TableHead>
//             <TableRow>
//               <TableCell>Account Number</TableCell>
//               <TableCell>Loan Amount</TableCell>
//               <TableCell>Loan Requested For</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {basicInfoAccount.map(user => (
//               <TableRow key={user.id}>
//                 <TableCell>{user.account_number}</TableCell>
//                 <TableCell>{user.loan_amount}</TableCell>
//                 <TableCell>{user.loan_requested_for}</TableCell>
//                 <TableCell>
//                   <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>Add New User</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             To add a new user, please fill in the following fields.
//           </DialogContentText>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="account_number"
//             label="Account Number"
//             type="text"
//             fullWidth
//             value={newUser.account_number}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="loan_amount"
//             label="Loan Amount"
//             type="text"
//             fullWidth
//             value={newUser.loan_amount}
//             onChange={handleChange}
//           />
//           <TextField
//             margin="dense"
//             name="loan_requested_for"
//             label="Loan Requested For"
//             type="text"
//             fullWidth
//             value={newUser.loan_requested_for}
//             onChange={handleChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color="primary">Cancel</Button>
//           <Button onClick={handleAddUser} color="primary">Add</Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default ManageUsers;

