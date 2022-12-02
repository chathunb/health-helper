import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type MessagePayload = {
  id: number;
  rowId: number;
  error: string;
};

// const rows = [
//   createData(1  ,255,"error"),
// ];

interface Props {
  messages:MessagePayload[]| null;
}

const ResultTable: React.FC<Props> = (props) => {
  const { messages } = props;
  
  return (
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Row ID</TableCell>
            <TableCell align="right">Error</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {messages   !== null   &&   messages.map((row : any, index  :   number) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {++index}
              </TableCell>
              <TableCell align="left">{row.rowId}</TableCell>
              <TableCell align="right">{row.error}</TableCell>
        
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ResultTable;