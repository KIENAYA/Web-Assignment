import { createColumnHelper } from '@tanstack/react-table';
import { useCallback } from 'react';
import { BsTrashFill } from 'react-icons/bs';
import { API_URL } from '../constant';
import { Order } from '../models/Order';
import { CommonTable } from './Table';
const token = localStorage.getItem('user');
let tokenObject = JSON.parse(token ? token : '');
async function deleteOrder(token: string, id: string): Promise<unknown> {
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
function DeleteOrderButton({ username }: { username: string }) {
  console.log(username);
  const onClick = useCallback(
    function () {
      deleteOrder(tokenObject.token, tokenObject.id).then(() => {});
    },
    [tokenObject.token, tokenObject.id],
  );

  return <button onClick={onClick}>Delete</button>;
}

const columnHelper = createColumnHelper<Order>();
const columns = [
  columnHelper.accessor((row) => row.cargoList, {
    id: 'List of cargos',
  }),
  columnHelper.accessor((row) => row.sentCustomer, {
    id: 'Sender',
  }),
  columnHelper.accessor((row) => row.sentDate, {
    id: 'Send date',
  }),
  columnHelper.accessor((row) => row.sentPoint, {
    id: 'Send point',
  }),
  columnHelper.accessor((row) => row.receiveCustomer, {
    id: 'Receiver',
  }),
  columnHelper.accessor((row) => row.receivedDate, {
    id: 'Received date',
  }),
  columnHelper.accessor((row) => row.receivePoint, {
    id: 'Receive point',
  }),
  columnHelper.accessor((row) => row.currentLocation, {
    id: 'Current location',
  }),
  columnHelper.accessor((row) => row.cost, {
    id: 'cost',
  }),
  columnHelper.display({
    header: () => null,
    id: 'actions',
    cell: (info) => {
      return <BsTrashFill />;
    },
  }),
];
export function OrdersTable({ orders }: { orders: Order[] }) {
  return <CommonTable data={orders} columns={columns} />;
}
