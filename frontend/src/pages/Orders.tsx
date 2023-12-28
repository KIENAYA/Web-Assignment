import Breadcrumb from '../components/Breadcrumb';
import TableOne from '../components/TableOne';
import TableThree from '../components/TableThree';
import TableTwo from '../components/TableTwo';
import { API_URL } from '../constant';

const Orders = () => {
  return (
    <>
      <Breadcrumb pageName="Orders" />

      <div className="flex flex-col gap-10">
        <TableTwo />
        <TableThree />
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
