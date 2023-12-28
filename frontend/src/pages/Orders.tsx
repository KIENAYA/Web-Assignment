import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { OrdersTable } from '../components/TableOrder';
import { API_URL } from '../constant';
import { Order } from '../models/Order';
import { GetWithAuthentication } from '../shared/action';
const token = localStorage.getItem('user');

async function fetchPointData(token: string, id: string): Promise<string> {
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

async function fetchCurrentLocation(
  token: string,
  id: string,
): Promise<string> {
  const response = await fetch(`${API_URL}/stage/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

async function fetchPointName(token: string, id: string): Promise<string> {
  const response = await fetch(`${API_URL}/${id}/name`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
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
    orders.forEach((element) => {
      fetchPointName(token, element.sentPoint).then((sPoint) => {
        element.sentPoint = sPoint;
      });
      fetchPointName(token, element.receivePoint).then((rPoint) => {
        element.receivePoint = rPoint;
      });
      fetchCurrentLocation(token, element._id).then((location) => {
        element.currentLocation = location;
      });
    });
    return orders;
  });
}

export default function Orders() {
  const [ordersFail, setordersFail] = useState<Order[]>([]);
  useEffect(() => {
    let tokenObject = JSON.parse(token ? token : '');
    getOrderDatabyType(tokenObject.token, tokenObject.id, 'fail').then(
      (ordersFail) => {
        setordersFail(ordersFail);
      },
    );
  }, []);

  return (
    <>
      <Breadcrumb pageName="Orders" />

      <div className="flex flex-col gap-10">
        <OrdersTable orders={ordersFail} />
      </div>
    </>
  );
}
