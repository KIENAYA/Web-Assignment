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
  columnHelper.accessor('cargoList', {
    header: 'List of cargos',
    cell: (info) =>
      info.getValue().map((cargo) => (
        <>
          <span>{`${cargo.slice(0, 10)}...`}</span>
          <br />
        </>
      )),
  }),
  columnHelper.accessor('sentCustomer', {
    header: 'Sender',
  }),
  columnHelper.accessor('sentDate', {
    header: 'Sent date',
  }),
  columnHelper.accessor('sentPoint', {
    header: 'Sent point',
  }),
  columnHelper.accessor('receiveCustomer', {
    header: 'Receiver',
  }),
  columnHelper.accessor('receivedDate', {
    header: 'Received date',
  }),
  columnHelper.accessor('receivePoint', {
    header: 'Receive point',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('currentLocation', {
    header: 'Current location',
    cell: (info) => info.getValue() as string,
  }),
  columnHelper.accessor('cost', {
    header: 'Cost',
    cell: (info) => String(info.getValue()),
  }),
  columnHelper.display({
    header: 'Actions',
    id: 'actions',
    cell: (info) => {
      return <BsTrashFill />;
    },
  }),
];
export function OrdersTable({ orders }: { orders: Order[] }) {
  return <CommonTable data={orders} columns={columns} />;
}
