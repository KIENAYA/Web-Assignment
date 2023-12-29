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
  useEffect(() => {
    let tokenObject = JSON.parse(token ? token : '');
    getOrderDatabyType(tokenObject.token, tokenObject.id, orderType).then(
      (ordersFail) => {
        setordersList(ordersFail);
      },
    );
  }, []);

  return (
    <div>
      <Breadcrumb pageName="Orders" />
      <div >
   <select
   onChange={
    (choice)=>{setOrderType(choice.target.value)
    console.log(choice.target.value)
    }
   }
   className="  appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
     <option value="complete">Complete</option>
     <option value="fail">Fail</option>
     <option value="receive_ucf">Receive(Unconfirmed)</option>
     <option value="receive_cf">Receive(Confimed)</option>
     <option value="return">Return</option>
   </select>
    </div>
      <OrdersTable orders={ordersList} />
    </div>
  );
};

