import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Account } from '../models/Account';

function DeleteAccountButton({ username }: { username: string }) {
  // const auth = useAuth()
  // const onClick = useCallback(
  // function () {
  // deleteAccount(auth.session.token, username)
  // },
  // [auth.session.token, username]
  // )

  //  return <button onClick={onClick}>Delete</button>
  return <button />;
}

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
  columnHelper.accessor((row) => row.profile.sex, {
    id: 'sex',
  }),
  columnHelper.accessor((row) => row.profile.ssn, {
    id: 'ssn',
  }),
  columnHelper.accessor((row) => row.role, {
    id: 'role',
  }),
  columnHelper.display({
    header: () => null,
    id: 'actions',
    cell: (info) => {
      return (
        <DeleteAccountButton
          username={info.row.getValue('username') as string}
        />
      );
    },
  }),
];

function AccountsTable() {
//   const auth = useAuth();
  const [accounts, setAccounts] = useState<Account[]>(()=>[{
    username:"djwqifwi",
    password:"vewjivjwvw",
    role:,
    _id:"-",
    profile:{
        firstname:"l",
        lastname:"z",
        sex:'male',
        ssn:"jqcjq"
    }
  }]);

  useEffect(() => {
    getUsers(auth.session.token)
      .then((data) => {
        setAccounts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth.session.token]);

  const table = useReactTable({
    data: accounts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <div>
      <table>
        <TableHead table={table} />
        <TableBody table={table} />
      </table>
    </div>
  );
}

export default function ListAllAccountsPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h5>Accounts List</h5>
      </div>
      <button onClick={() => navigate(RoutePath.UserCreate)}>
        Create account
      </button>
      <AccountsTable />
    </div>
  );
}
