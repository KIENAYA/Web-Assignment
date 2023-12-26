import { IOrder } from '../Order.type';
import { BsTrashFill } from 'react-icons/bs';
import { BsPencilFill } from 'react-icons/bs';
import { useState } from 'react';
type TableProps = {
  list: IOrder[];
};
const TableOne = (prop: TableProps) => {
  const [editorder, setOrderToEdit] = useState({} as IOrder);
  const { list } = prop;
  const [orderList, setOrderList] = useState(list as IOrder[]);
  const handleDeleteRow = (data: IOrder) => {
    const indexToDel = orderList.indexOf(data);
    const tempList = [...orderList];
    tempList.splice(indexToDel, 1);
    setOrderList(tempList);
  };
  const handleEditRow = (data: IOrder) => {
    setOrderToEdit(data);
  };
  const updateEditRow = (data: IOrder) => {};
  const Updateorder = (data: IOrder) => {
    const filteredData = orderList.filter((x) => x.id === data.id)[0];
    const indexOfEdit = orderList.indexOf(filteredData);
    const tempData = [...orderList];
    tempData[indexOfEdit] = data;
    setOrderList(tempData);
  };
  const Addorder = (data: IOrder) => {
    setOrderList([...orderList, data]);
    console.log('new 1');
    orderList.forEach((element) => {
      console.log(element);
    });
  };

  return (
    <div className="flex flex-col orders-center justify-center  w-full">
      <table className="block overflow-hidden table-fixed border-separate shadow-[0_10_10_rgba(204,204,204,0.3)] rounded-sm w-full overflow-x-auto m-auto">
        <thead className="bg-primary text-white  ">
          <tr>
            <th className="p-3 border-solid border-black overflow-ellipsis  w-full">
              Description
            </th>
            <th className="p-3 border-solid border-black overflow-ellipsis">
              Quantity
            </th>
            <th className="p-3 border-solid border-black overflow-ellipsis ">
              Weight
            </th>
            <th className="flex justify-around p-3 border-solid border-black overflow-ellipsis ">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => {
            return (
              <tr
                key={order.id}
                className="justify-center text-center hover:bg-gray-2"
              >
                <td className="px-8 py-4 border">{order.receiver}</td>
                <td className="px-8 py-4 border">{order.receiveDate}</td>
                <td className="px-8 py-4 border">{order.receivePoint}</td>
                <td className="px-8 py-4 border">{order.sender}</td>
                <td className="px-8 py-4 border">{order.sendDate}</td>
                <td className="px-8 py-4 border">{order.sendPoint}</td>
                <td className="px-8 py-4 border">{order.currentLocation}</td>
                <td className="px-8 py-4 border">{order.price}</td>
                <td className="px-8 py-4 border">
                  <div className="flex flex-row gap-3 justify-center">
                    <BsPencilFill onClick={() => handleEditRow(order)} />
                    <BsTrashFill onClick={() => handleDeleteRow(order)} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableOne;
