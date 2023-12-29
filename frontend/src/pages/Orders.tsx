import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { OrdersTable } from '../components/TableOrder';
import { API_URL } from '../constant';
import { Order } from '../models/Order';
import { GetWithAuthentication } from '../shared/action';
import SelectOne from '../components/SelectOne';

const token = localStorage.getItem('user');

export async function fetchPointData(token: string, id: string): Promise<string> {
  const response = await fetch(`${API_URL}/${id}/point`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

async function fetchOrderType(
  token: string,
  id: string,
  type: string,
): Promise<Order[]> {
  const response = await fetch(`${API_URL}/${id}/${type}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

export async function fetchCurrentLocation(
  id: string,
): Promise<string> {
  const response = await fetch(`${API_URL}/stage/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}
 export async function fetchPointName( id: string): Promise<string> {
  const response = await fetch(`${API_URL}/${id}/name`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

async function getOrderDatabyType(
  token: string,
  id: string,
  type: string,
): Promise<Order[]> {
  const pointId = await GetWithAuthentication<string>(
    `${API_URL}/${id}/point`,
    token,
  );
  return fetchOrderType(token, pointId, type).then((orders) => {
    return orders;
  });
}
export default function Orders ()  {
  const [ordersList, setordersList] = useState<Order[]>([]);
  const [orderType, setOrderType] = useState('complete');
  const [ordersFail, setordersFail] = useState<Order[]>([]);
  const [ordersSend, setordersSend] = useState<Order[]>([]);
  const [ordersReceive, setordersReceive] = useState<Order[]>([]);
  
  useEffect(() => {
    let tokenObject = JSON.parse(token ? token : '');
    getOrderDatabyType(tokenObject.token, tokenObject.id, orderType).then(
      (ordersFail) => {
        setordersList(ordersFail);
      },
    );
    getOrderDatabyType(tokenObject.token, tokenObject.id, 'fail').then(
      (ordersFail) => {
        setordersFail(ordersFail);
      },
    );
    getOrderDatabyType(tokenObject.token, tokenObject.id, 'send').then(
      (ordersFail) => {
        setordersSend(ordersFail);
      },
    );
    getOrderDatabyType(tokenObject.token, tokenObject.id, 'receive_cf').then(
      (ordersFail) => {
        setordersReceive(ordersFail);
      },
    );
  }, []);

  return (<div> 
      <Breadcrumb pageName="Orders" />

      <OrdersTable tableName='Order Complete' orders={ordersList} />
      <OrdersTable tableName='Order Fail' orders={ordersFail} />
      <OrdersTable tableName='Order Send' orders={ordersSend} />
      <OrdersTable tableName='Order Received' orders={ordersReceive} />
    </div>
  );
};

