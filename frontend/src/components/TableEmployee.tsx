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
import { TableBody, TableHead } from './Table';
import { BsTrashFill } from 'react-icons/bs';
const token = localStorage.getItem('user');
let tokenObject = JSON.parse(token ? token : '');
async function deleteAccount(token: string, id: string): Promise<unknown> {
  const response = await fetch(`${API_URL}/${id}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
function DeleteAccountButton({ username }: { username: string }) {
  const onClick = useCallback(
    function () {
      deleteAccount(tokenObject.token, tokenObject.id).then(() => {});
    },
    [tokenObject.token, tokenObject.id],
  );
  //
  return <button onClick={onClick}>Delete</button>;
}

const columnHelper = createColumnHelper<Account>();

function AccountsTable({
  accounts,
  cols,
}: {
  accounts: Account[];
  cols: ColumnDef<Account, any>[];
}) {
  const table = useReactTable({
    data: accounts,
    columns: cols,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: false,
  });

  return (
    <table>
      <TableHead table={table} />
      <TableBody table={table} />
    </table>
  );
}

type Props = {
  list: Account[];
};

const TableEmployee = (props: Props) => {
  const { list } = props;
  const [data, setData] = useState(list as Account[]);
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
    columnHelper.accessor((row) => row.profile.sex, {
      id: 'sex',
    }),
    columnHelper.accessor((row) => row.role, {
      id: 'role',
    }),
    columnHelper.display({
      header: () => null,
      id: 'actions',
      cell: (info) => {
        return (
          <BsTrashFill
            onClick={() => {
              deleteAccount(tokenObject.token, tokenObject.id);
              const listCopy = [...list];
              listCopy.splice(info.row.index, 1);
              setData(listCopy);
            }}
          />
        );
      },
    }),
  ];
  return <AccountsTable accounts={list} cols={columns} />;
};

export default TableEmployee;
