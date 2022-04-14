import React from 'react';
import {TableCell} from "@mui/material";

const CustomTableCell = ({ isPointer, value, click }) => {
    return (
        <TableCell
            align="center"
            onClick={isPointer && click}
            sx={ isPointer && { cursor: 'pointer' }}
        >
            { value }
        </TableCell>
    );
};

export default CustomTableCell;