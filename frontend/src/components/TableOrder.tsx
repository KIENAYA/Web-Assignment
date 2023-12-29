import { createColumnHelper } from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';
import { BsCheck} from 'react-icons/bs';
import { API_URL } from '../constant';
import { Order } from '../models/Order';
import GenericDataTable from './shad-table/app/people/data-table';
import { fetchCurrentLocation, fetchPointName } from '../pages/Orders';
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
  columnHelper.accessor((row) => row._id, {
    id: '_id',
  }),
  columnHelper.accessor((row) => row.sentCustomer, {
    id: 'Sender',
  }),
  columnHelper.accessor((row) => row.sentDate.substring(0,10), {
    id: 'Send date',
  }),
  columnHelper.accessor((row) => row.sentPoint, {
    id: 'Send point',
    cell: (info) => {
      const [loc,setLoc]=useState("")
      useEffect(()=>{
        fetchPointName(info.getValue()).then((location) => {
          setLoc(location)
          });
      },[])
      return loc
    },
  }),
  columnHelper.accessor((row) => row.receiveCustomer, {
    id: 'Receiver',
  }),
  columnHelper.accessor((row) => row.receivedDate.substring(0,10), {
    id: 'Received date',
  }),
  columnHelper.accessor((row) => row.receivePoint, {
    id: 'Receive point',
    cell: (info) => {
      const [loc,setLoc]=useState("")
      useEffect(()=>{
        fetchPointName(info.getValue()).then((location) => {
          setLoc(location)
          });
      },[])
      return loc
    },
  }),
  columnHelper.accessor((row) => row.currentLocation, {
    id: 'Current location',
    cell: (info) => {
      const [loc,setLoc]=useState("")
      useEffect(()=>{
        fetchCurrentLocation(info.row.getValue("_id")).then((location) => {
          setLoc(location)
          });
      },[])
      return loc
    },
  }),
  columnHelper.accessor((row) => row.cost, {
    id: 'cost',
  }),
  columnHelper.display({
    header: "Actions",
    id: "actions",
    cell: (info) => {
      return (
        <BsCheck onClick= {() => {
          alert("Confirm Order:"+" "+(info.row.getValue("_id") as string))
          fetchConfirm((info.row.getValue("_id") as string),"confirm")
        }}     
        />
      );
    },
  }),
];
async function fetchConfirm(
  id: string,
  type: string,
): Promise<Order> {
  const response = await fetch(`${API_URL}/${id}/${type}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}
export function OrdersTable({ orders, tableName }: { orders: Order[], tableName:string }) {
  return <div>
    <h1>{tableName}</h1>
  <GenericDataTable
  data={orders}
  columns={columns}
  />
  </div>
  ;
}
