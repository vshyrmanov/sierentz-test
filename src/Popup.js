import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getDate } from './functions';
import { Button, Input, MenuItem, Select, Stack } from "@mui/material";
import { data } from './default';


const Popup = () => {
    const [popupData, setPopupData] = useState([
        {value: 4, date: "20.01.2022", user: "Petro", comment: "comment 1"},
        {value: 5, date: "20.07.2020", user: "Nikola", comment: "comment 2"},
        {value: 6, date: "20.04.2021", user: "Liza", comment: "comment 3"},
        {value: 7, date: "20.05.2021", user: "Jim", comment: "comment 4"},
    ])

    const [newData, setNewData] = useState()
    const [currentElement, setCurrentElement] = useState()

    let usersArr = popupData.map(e => e.user);
    let selectProps = [...new Set(usersArr)];

    const [value, setValue] = useState(
        {
            value: "",
            date: getDate(),
            user: selectProps[selectProps.length - 1],
            comment: ""
        }
    );

    useEffect(() => {
        if (localStorage.getItem('newData')) {
            setNewData(JSON.parse(localStorage.getItem('newData')))
        } else  {
            setNewData(data)
        }
        setCurrentElement(JSON.parse(localStorage.getItem('currentElement')))
    }, [])

    const handleValue = (e, type) => {
        if (type === 'value') {
            setNewData({
                ...newData,
                [`${currentElement.region}`]:
                    {...newData[`${currentElement.region}`], ['G']:
                            {...newData[`${currentElement.region}`]['G'], [`${currentElement.year}`]:
                                    {...newData[`${currentElement.region}`]['G'][`${currentElement.year}`], [`${currentElement.sub}`]:
                                            {...newData[`${currentElement.region}`]['G'][`${currentElement.year}`][`${currentElement.sub}`], value: e.target.value}}}}})
        }
        setValue({...value, [type]: e.target.value})
    };

    const testSend = () => {
        localStorage.setItem('newData', JSON.stringify(newData))
    }

    const closePopUp = () =>  {
        window.close()
    };

    const handleSubmit = () => {
        testSend()
        setPopupData([...popupData, value]);
        console.log(value);
        setValue({...value, value: "", comment: ""})
        closePopUp()
    };

    return (
        <>
            {newData && <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align={"center"} rowSpan={2}>Value</TableCell>
                            <TableCell align={"center"} rowSpan={2}>Date</TableCell>
                            <TableCell align={"center"} rowSpan={2}>User</TableCell>
                            <TableCell align={"center"} rowSpan={2}>Comment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {popupData.map(e =>
                            <TableRow key={Math.random() * 100}>
                                <TableCell align={"center"}>{e.value}</TableCell>
                                <TableCell align={"center"}>{e.date}</TableCell>
                                <TableCell align={"center"}>{e.user}</TableCell>
                                <TableCell align={"center"}>{e.comment}</TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                            <TableCell align={"center"}>
                                <Input
                                    value={value.value}
                                    placeholder="Enter value"
                                    type="number"
                                    onChange={(e) => handleValue(e, 'value')}
                                    fullWidth />
                            </TableCell>
                            <TableCell align={"center"}>
                                <Input
                                    value={value.date}
                                    fullWidth />
                            </TableCell>
                            <TableCell align={"center"}>
                                <Select
                                    fullWidth
                                    value={value.user}
                                    onChange={(e) => handleValue(e, 'user')}
                                >
                                    {selectProps.map(e => <MenuItem key={Math.random() * 100} value={e}>{e}</MenuItem>)}
                                </Select>
                            </TableCell>
                            <TableCell align={"center"}>
                                <Input
                                    placeholder="Enter comment"
                                    value={value.comment}
                                    onChange={e => handleValue(e, 'comment')}
                                    fullWidth />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>}
            <Stack
                direction="row"
                justifyContent="end"
                alignItems="center"
                spacing={5}
                sx={{ margin: '10px' }}
            >
                <Button variant="outlined" onClick={closePopUp}>Close</Button>
                <Button variant="contained" onClick={handleSubmit}>Add </Button>
            </Stack>
        </>
    );
};

export default Popup;