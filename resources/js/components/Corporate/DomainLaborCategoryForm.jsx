import React from 'react';
import {
  Typography,
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Stack
} from '@mui/material';
import DomainLaborCategory from './DomainLaborCategory';

const DomainLaborCategoryForm = ({ domain }) => {
  return (
    <>
      <TableContainer>
        <Table size="small" sx={{mb: 2}}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={7} sx={{ px: '5px' }}>
                <Stack direction="row" spacing={1}>
                  <Typography sx={{ minWidth: '200px', fontWeight: 'bold' }} variant="h5" gutterBottom>{domain.name}</Typography>
                  <Typography variant="body1" gutterBottom>{domain.description}</Typography>
                </Stack>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell width={"200px"} sx={{ px: '5px' }}></TableCell>
              <TableCell align='center' sx={{ px: '5px', width: '10ch' }}>Limited or No Past Performance</TableCell>
              <TableCell sx={{ px: '5px', width: '20ch' }} align="center">Last Date Performed Services</TableCell>
              <TableCell sx={{ px: '5px', width: '12ch' }} align="center">Maximum Number on One Contract</TableCell>
              <TableCell sx={{ px: '5px', width: '20ch' }} align="center">Locations Serviced</TableCell>
              <TableCell sx={{ px: '5px', width: '16ch' }} align="center">Customer Type</TableCell>
              <TableCell sx={{ px: '5px', width: '18ch' }} align="center">Overall Service Rating</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              _.map(domain.labor_categories, (category, index) => {
                return (
                  <DomainLaborCategory key={index} category={category} />
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer >
    </>
  );
};

export default DomainLaborCategoryForm;