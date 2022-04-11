import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {data} from './default';
import {Fragment} from "react";
import { getDataTable, getUniqueYear } from './functions';

function CustomTable() {
    const dataTable = getDataTable(data);
    const uniqueYears = getUniqueYear(Object.keys(data), data);

    const popUp = () => {
        window.open('/popup',  "_blank", 'height=500,width=1000,scrollbars=yes', );
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"} rowSpan={2}>Regions</TableCell>
                            {uniqueYears.map(e =>
                                <TableCell colSpan={3} align={"center"} key={Math.random() * e}>{e}</TableCell>)}
                        </TableRow>
                        <TableRow>
                            {uniqueYears.map((e, i) =>
                                <Fragment key={Math.random() * e}>
                                    <TableCell align={"center"}>XX</TableCell>
                                    <TableCell align={"center"}>YY</TableCell>
                                    <TableCell align={"center"}>ZZ</TableCell>
                                </Fragment>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataTable.map(x => x.hasOwnProperty('region') &&
                            <TableRow key={x.region}>
                                <TableCell component="th" scope="row" align={"center"}>
                                    {x.region}
                                </TableCell>
                                {uniqueYears.map(e => dataTable.map(i =>
                                    i.region === x.region &&
                                    <Fragment key={Math.random() * e}>
                                        <TableCell align={"center"} >
                                            <TableRow onClick={popUp} sx={{ cursor: 'pointer' }}>{i.data[e] && i.data[e].XX.value}</TableRow>
                                            <TableRow>{i.data[e] && i.data[e].XX.dateRelease}</TableRow>
                                        </TableCell >
                                        <TableCell align={"center"} >
                                            <TableRow onClick={popUp} sx={{ cursor: 'pointer' }}>{i.data[e] && i.data[e].YY.value}</TableRow>
                                            <TableRow>{i.data[e] && i.data[e].YY.dateRelease}</TableRow>
                                        </TableCell>
                                        <TableCell align={"center"} >
                                            <TableRow onClick={popUp} sx={{ cursor: 'pointer' }}>{i.data[e] && i.data[e].ZZ.value}</TableRow>
                                            <TableRow>{i.data[e] && i.data[e].ZZ.dateRelease}</TableRow>
                                        </TableCell>
                                    </Fragment>
                                ))}
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default CustomTable;
