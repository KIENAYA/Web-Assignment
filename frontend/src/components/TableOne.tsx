import React from 'react';
import { useState } from 'react';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import { faker } from '@faker-js/faker';
import ModalTwo from './ModalTwo';
import { ICargo, PageEnum} from '../Items.type';
import ModalOne from './ModalOne';
type TableProps = {
  list: ICargo[];
};
const TableOne = (prop: TableProps) => {
  const [deleteItem, onDeleteHand] = useState('');
  const [shownPage,setShownPage]=useState(PageEnum.list);
  const [modalTwoOpen, setModalTwoOpen] = useState(false);
  const [modalOneOpen, setModalOneOpen] = useState(false);
  const [editItem,setItemToEdit]=useState({} as ICargo);
  const { list } = prop;
  const [itemList, setItemList] = useState(list as ICargo[]);
  const handleDeleteRow = (data: ICargo) => {
    const indexToDel = itemList.indexOf(data);
    const tempList = [...itemList];
    tempList.splice(indexToDel, 1);
    setItemList(tempList);
  };
  const handleEditRow=(data:ICargo)=>{
  setShownPage(PageEnum.edit)
  setItemToEdit(data)
  }
  const updateEditRow=(data: ICargo)=>{
  
  }
  const UpdateItem=(data:ICargo)=>{
    const filteredData=itemList.filter(x=>x.id===data.id)[0];
    const indexOfEdit=itemList.indexOf(filteredData);
    const tempData=[...itemList]
    tempData[indexOfEdit]=data;
    setItemList(tempData)
  }
  const AddItem = (data: ICargo) => {
    setItemList([...itemList, data]);
    console.log('new 1');
    itemList.forEach((element) => {
      console.log(element);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center  w-full">
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
          {itemList.map((cargo) => {
            return (
              <tr
                key={cargo.id}
                className="justify-center text-center hover:bg-gray-2"
              >
                <td className="px-8 py-4 border">{cargo.description}</td>
                <td className="px-8 py-4 border">{cargo.quantity}</td>
                <td className="px-8 py-4 border">{cargo.weight}</td>
                <td className="px-8 py-4 border">
                  <div className="flex flex-row gap-3 justify-center">
                   <BsPencilFill onClick={()=>handleEditRow(cargo)} />
                    <BsTrashFill onClick={() => handleDeleteRow(cargo)} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className="mt-4 border-solid border-2 px-2 rounded-xl cursor-pointer shadow-[0_5px_5px_rgba(204,204,204,0.3)]"
        onClick={() => {
          setModalTwoOpen(true);
          setShownPage(PageEnum.add);
        }}
      >
        Add
      </button>
      {shownPage===PageEnum.add && (
        <ModalTwo
          closeModalTwo={() => {
            setModalTwoOpen(false);
            setShownPage(PageEnum.list)
          }}
          onSubmit={AddItem}
        />
      )}
      {
        shownPage===PageEnum.edit&&(
          <ModalOne
          data={editItem}
          onSubmit={UpdateItem}
          closeModalOne={()=>{
            setModalOneOpen(false);
            setShownPage(PageEnum.list)
          }}
          />
        )
      }
    </div>
  );
};

export default TableOne;
