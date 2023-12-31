import { useEffect, useState, useCallback } from 'react';
import { API_URL } from '../constant';
import {
  Column,
  ColumnDef,
  ColumnHelper,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Account } from '../models/Account';
import { BsTrashFill } from 'react-icons/bs';
import GenericDataTable from './shad-table/app/people/data-table';
import axios from 'axios';
const token = localStorage.getItem('user');
let tokenObject = JSON.parse(token ? token : '');

const columnHelper = createColumnHelper<Account>();

const columns = [
  columnHelper.accessor((row) => row.username, {
    id: 'username',
  }),
  columnHelper.accessor((row) => row.profile.firstname, {
    id: 'firstname',
  }),
  columnHelper.accessor((row) => row.profile.lastname, {
    id: 'lastname',
  }),
  columnHelper.accessor((row) => row.profile.ssn, {
    id: 'ssn',
  }),
  columnHelper.accessor((row) => row.profile.birthDate.substring(0,10), {
    id: 'birhtDate',
  }),
  columnHelper.accessor((row) => row.profile.sex, {
    id: 'sex',
  }),
  
  columnHelper.display({
    header: () => null,
    id: 'actions',
  }),
];

type Props = {
  list: Account[];
};
const TableEmployee = (props: Props) => {
  const { list } = props;
  const [data, setData] = useState(list);

  return <GenericDataTable data={list} columns={columns} />;
};

export default TableEmployee;
