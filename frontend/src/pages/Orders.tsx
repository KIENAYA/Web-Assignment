import Breadcrumb from '../components/Breadcrumb';
import { useEffect, useState } from 'react';
import { API_URL } from '../constant';
import TableThree from '../components/TableThree';
import TableTwo from '../components/TableTwo';
import { Account } from '../models/Account';
import {OrdersTable} from '../components/TableOrder';
import { Order } from '../models/Order';
const token = localStorage.getItem('user');
async function fetchEmployeeData(token: string, id: string): Promise<string[]> {
  const response = await fetch(`${API_URL}/${id}/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
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
async function fetchEmployeeProfile(
  token: string,
  id: string,
): Promise<string> {
  const response = await fetch(`${API_URL}/${id}/profile`, {
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

function convertISODate(date: string): string {
  return new Date(date).toString();
}
function getOrderDatabyType(token: string, id: string, type: string): Order[] {
  let orderList: Order[] = [];
  fetchPointData(token, id).then((pointId) => {
    fetchOrderType(token, pointId, 'fail').then((orders) => {
      orders.forEach((element) => {
        fetchPointName(token, element.sentPoint).then((sPoint) => {
          element.sentPoint = sPoint;
          fetchPointName(token, element.receivePoint).then((rPoint) => {
            element.receivePoint = rPoint;
            fetchCurrentLocation(token, element._id).then((location) => {
              element.currentLocation = location;
            });
          });
        });
      });
      orderList.push(...orders)
    });
  });
  return orderList;

}

const Orders = () => {
  const [ordersFail, setordersFail] = useState<Order[]>([]);
  useEffect(() => {
  let tokenObject = JSON.parse(token ? token : '');
    setordersFail(getOrderDatabyType(tokenObject.token,tokenObject.id,"fail"));
  }, []);
  return (
    <>
      <Breadcrumb pageName="Orders" />

      <div className="flex flex-col gap-10">
        <OrdersTable orders={ordersFail} />
      </div>
    </>
  );
  
  //lấy đơn hàng thất bại tại điểm giao dịch có id:...
async function fetchOrderFail(token: string, id: string): Promise<string[]> {
  const response = await fetch(`${API_URL}/${id}/fail`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

  //lấy đơn hàng thành công tại điểm giao dịch có id:...
  async function fetchOrderSuccess(token: string, id: string): Promise<string[]> {
    const response = await fetch(`${API_URL}/${id}/complete`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  }

  //lấy ra đơn hàng nhận tại điểm giao dịch đã confirm với id của điểm giao dịch đó
  async function fetchOrderReceiveCFAtTP(token: string, id: string, role: string): Promise<string[]> {
    const response = await fetch(`${API_URL}/${id}/receive_cf`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }

  //lấy ra đơn hàng tại điểm giao dịch chưa confirm với id của điểm giao dịch đó 
  async function fetchOrderReceiveUCFAtTP(token: string, id: string, role: string): Promise<string[]> {
    const response = await fetch(`${API_URL}/${id}/receive_cf`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }

  //lấy ra đơn hàng cần gửi tại điểm giao dịch với id của điểm giao dịch đó
  async function fetchOrderSendAtTP(token: string, id: string): Promise<string[]> {
    const response = await fetch(`${API_URL}/${id}/send`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }

  //lấy ra đơn hàng điểm tập kết nhận từ điểm giao dịch chưa confirm
  async function fetchOrderReceiveAtAP1Ucf(token: string, id: string): Promise<string[]> {
    const response = await fetch(`${API_URL}/${id}/receive/type1_ucf`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }

  //lấy ra đơn hàng điểm tập kết nhận từ điểm giao dịch đã confirm
  async function fetchOrderReceiveAtAP1Cf(token: string, id: string): Promise<string[]> {
    const response = await fetch(`${API_URL}/${id}/receive/type1_cf`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }

  //lấy ra đơn hàng điểm tập kết nhận từ điểm tập kết chưa confirm
  async function fetchOrderReceiveAtAP2Ucf(token: string, id: string): Promise<string[]> {
    const response = await fetch(`${API_URL}/${id}/receive/type2_ucf`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }

  //lấy ra đơn hàng tại điểm tập kết nhận từ điểm tập kết đã confirm
  async function fetchOrderReceiveAtAP2Cf(token: string, id: string): Promise<string[]> {
    const response = await fetch(`${API_URL}/${id}/receive/type2_cf`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  }
};

export default Orders;
