import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {data} from './default';
import { Fragment } from "react";
import { getDataTable, getSubYears, getUniqueYear } from './functions';
import CustomTableCell from "./TableCell";

function CustomTable() {
    const [dataTable, setDataTable] = useState()
    const [rerender, setRerender] = useState(false)

    window.addEventListener('storage', () => {
        setRerender(true)
    })

    useEffect(() => {
        if (localStorage.getItem('newData')) {
            setDataTable(getDataTable(JSON.parse(localStorage.getItem('newData'))))
            setRerender(false)
        } else {
            setDataTable(getDataTable(data))
        }
    }, [rerender])

    const uniqueYears = getUniqueYear(Object.keys(data), data);
    const subYears = getSubYears(data);

    const popUp = (val) => {
        window.open('/popup',  "_blank", 'height=500,width=1000,scrollbars=yes' );
        localStorage.setItem("currentElement", JSON.stringify(val))
    };

    return (
        <>
            {dataTable && <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"} rowSpan={2}>Regions</TableCell>
                            {uniqueYears.map(e =>
                                <TableCell colSpan={4} align={"center"} key={Math.random() * e}>{e}</TableCell>)}
                        </TableRow>
                        <TableRow>
                            {uniqueYears.map(e =>
                                <Fragment key={Math.random() * e}>
                                    {subYears.map(e => <TableCell key={Math.random() * 100} align={"center"}>{e}</TableCell>)}
                                    <TableCell align={"center"} sx={{ borderRight: '1px solid', borderLeft: '1px solid' }}>WW</TableCell>
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
                                        {subYears.map(y =>
                                            <CustomTableCell
                                                key={Math.random() * 100}
                                                isPointer={i.data[e]}
                                                click={() => popUp({region: x.region, year: e, sub: y})}
                                                value={ i.data[e] && i.data[e][y].value }
                                            />
                                        )}
                                        <TableCell align={"center"} sx={{ borderRight: '1px solid', borderLeft: '1px solid' }}>{
                                            i.data[e] && subYears.map((m) => i.data[e][m].value).reduce((p, c) => +p + +c)
                                        }</TableCell>
                                    </Fragment>
                                ))}
                            </TableRow>)}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    );
}

export default CustomTable;
