import React, { useMemo } from "react";
import "./BillTable.css";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const BillTable = ({ products }) => {
  const rows = products;

  return (
    <div className="billTable">
      <TableContainer component={Paper} className="tableCom">
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BillTable;
