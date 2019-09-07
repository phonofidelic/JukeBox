import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import {
  ThemeContext,
  getPrimaryHover,
  getSecondaryBackgroundColor
} from '../../contexts/theme.context';

import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import Schedule from '@material-ui/icons/Schedule';

const useStyles = makeStyles({
  cell: { height: 50 }
});

const columnData = [
  // { id: 'empty', numeric: false, disablePadding: true, label: '', labelText: '', width: '1%' },
  {
    id: 'title',
    disablePadding: false,
    label: 'Title',
    labelText: 'Title',
    span: 1
  },
  {
    id: 'duration',
    disablePadding: false,
    label: <Schedule />,
    labelText: 'Duration',
    width: '1%',
    span: 1
  },
  {
    id: 'artist',
    disablePadding: false,
    label: 'Artist',
    labelText: 'Artist',
    width: '1%',
    span: 1
  },
  {
    id: 'album',
    disablePadding: false,
    label: 'Album',
    labelText: 'Album',
    width: '1%',
    span: 1
  }
];

const Container = styled(TableHead)`
  background-color: ${getSecondaryBackgroundColor};
  cursor: pointer;
`;

const LibraryTableHead = props => {
  const theme = useContext(ThemeContext);
  const classes = useStyles();
  const [hoveredCell, hoverOnCell] = useState(null);

  const { order, orderBy, handleRequestSort } = props;

  return (
    <Container theme={theme}>
      <TableRow>
        <TableCell></TableCell>
        {columnData.map(column => (
          <TableCell
            classes={{ root: classes.cell }}
            style={{
              backgroundColor:
                hoveredCell === column.id
                  ? getPrimaryHover({ theme })
                  : getSecondaryBackgroundColor({ theme }),
              paddingLeft: 20
            }}
            scope="col"
            colSpan={column.span}
            onMouseEnter={() => hoverOnCell(column.id)}
            onMouseLeave={() => hoverOnCell(null)}
            key={column.id}
            sortDirection={orderBy === column.id ? order : false}
            onClick={e => handleRequestSort(e, column.id)}
          >
            <Tooltip
              title={column.labelText}
              placement="bottom-start"
              enterDelay={300}
            >
              <TableSortLabel active={orderBy === column.id} direction={order}>
                {column.label}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        ))}
      </TableRow>
    </Container>
  );
};

export default LibraryTableHead;
