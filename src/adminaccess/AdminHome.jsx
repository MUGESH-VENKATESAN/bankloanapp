import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ManageUsers from './ManageUsers';
import './AdminHome.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminHome = () => {
  const [basicInformation, setBasicInformation] = useState([]);
  const [basicInfoAccount, setBasicInfoAccount] = useState([]);
  const [showReports, setShowReports] = useState(false);
  const [showManageUsers, setShowManageUsers] = useState(false);

  useEffect(() => {
    // Fetch Basic Information data from server
    fetch('http://localhost:8000/basic-information/')
      .then(response => response.json())
      .then(data => {
        setBasicInformation(data);
      })
      .catch(error => console.error('Error fetching basic information:', error));

    // Fetch Basic Info Account data from server
    fetch('http://localhost:8000/basic-info-account')
      .then(response => response.json())
      .then(data => {
        setBasicInfoAccount(data);
      })
      .catch(error => console.error('Error fetching basic info account:', error));
  }, []);

  // Aggregate loan requests by account number
  const loanRequestsByAccount = basicInfoAccount.reduce((acc, curr) => {
    acc[curr.accountNumber] = (acc[curr.accountNumber] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the bar chart
  const data = {
    labels: Object.keys(loanRequestsByAccount),
    datasets: [{
      label: 'Loan Requests by Account',
      data: Object.values(loanRequestsByAccount),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="admin-home-page">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Typography variant="h6">Admin Dashboard</Typography>
        </div>
        <div className="admin-sidebar-content">
          <List>
            <ListItem button onClick={() => { setShowReports(false); setShowManageUsers(false); }}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => { setShowReports(true); setShowManageUsers(false); }}>
              <ListItemText primary="View Reports" />
            </ListItem>
            <ListItem button onClick={() => { setShowReports(false); setShowManageUsers(true); }}>
              <ListItemText primary="Manage Users" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </div>
      </div>
      <div className="admin-main-content">
        <Container>
          <Typography variant="h4" gutterBottom>Welcome, Admin</Typography>
          {!showReports && !showManageUsers && (
            <Typography variant="body1">Select an option from the sidebar to get started.</Typography>
          )}
          {showReports && (
            <div className="admin-reports-container">
              <section className="admin-reports">
                <Typography variant="h6">Basic Information Reports</Typography>
                {basicInformation.length > 0 ? (
                  <TableContainer component={Paper} style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell>Full Name</TableCell>
                          <TableCell>Father's/Husband's Name</TableCell>
                          <TableCell>Gender</TableCell>
                          <TableCell>Occupation</TableCell>
                          <TableCell>Income</TableCell>
                          <TableCell>KYC Document Number</TableCell>
                          <TableCell>Email</TableCell>
                          <TableCell>Mobile</TableCell>
                          <TableCell>Permanent Address</TableCell>
                          <TableCell>Address Details</TableCell>
                          <TableCell>Communication Address</TableCell>
                          <TableCell>Pin Code</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {basicInformation.map(info => (
                          <TableRow key={info.id}>
                            <TableCell>{info.full_name}</TableCell>
                            <TableCell>{info.father_or_husband_name}</TableCell>
                            <TableCell>{info.gender}</TableCell>
                            <TableCell>{info.occupation}</TableCell>
                            <TableCell>{info.income}</TableCell>
                            <TableCell>{info.kyc_document_number}</TableCell>
                            <TableCell>{info.email}</TableCell>
                            <TableCell>{info.mobile}</TableCell>
                            <TableCell>{info.permanent_address}</TableCell>
                            <TableCell>{info.address_details}</TableCell>
                            <TableCell>{info.communication_address}</TableCell>
                            <TableCell>{info.pin_code}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body1">No basic information reports available.</Typography>
                )}
                <div className='admin-reports-container-basicinfo'>
                  <Typography variant="h6">Loan Requests by Account</Typography>
                  {Object.keys(loanRequestsByAccount).length > 0 ? (
                    <Box mt={4}>
                      <Bar data={data} options={options} />
                    </Box>
                  ) : (
                    <Typography variant="body1">No loan requests available.</Typography>
                  )}
                </div>
              </section>
            </div>
          )}
          {showManageUsers && <ManageUsers />}
          <Box mt={4}>
            <Button variant="contained" color="primary" onClick={() => setShowReports(true)}>View Reports</Button>
            <Button variant="outlined" color="primary" onClick={() => setShowManageUsers(true)}>Manage Users</Button>
          </Box>
        </Container>
      </div>
      <div className="admin-right-sidebar">
        <Typography variant="h6">Quick Links</Typography>
        <List>
          <ListItem button onClick={() => { setShowReports(false); setShowManageUsers(true); }}>
            <ListItemText primary="Manage Users" />
          </ListItem>
          <ListItem button onClick={() => { setShowReports(true); setShowManageUsers(false); }}>
            <ListItemText primary="View Reports" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
        <Typography variant="body2" style={{ marginTop: '16px' }}>
          For assistance, contact support at: support@example.com
        </Typography>
      </div>
    </div>
  );
};

export default AdminHome;
