import React, { useState } from 'react';
import ModalEditEmp from './ModalEditEmp';
import { EmployeeLogIn } from '../Employee.type';
import { BsPencilFill } from 'react-icons/bs';
import { BsTrashFill } from 'react-icons/bs';
type Props = {
  list: EmployeeLogIn[];
};

const TableEmployee = (props: Props) => {
  const [editEmployee, setEmployeeToEdit] = useState({} as EmployeeLogIn);
  const [openModalEmp, setModalEmpOpen] = useState(false);
  const { list } = props;
  const [employeeList, setEmployeeList] = useState(list as EmployeeLogIn[]);
  const handleDeleteRow = (data: EmployeeLogIn) => {
    const indexToDel = employeeList.indexOf(data);
    const tempList = [...employeeList];
    tempList.splice(indexToDel, 1);
    setEmployeeList(tempList);
  };
  const handleEditRow = (data: EmployeeLogIn) => {
    setEmployeeToEdit(data);
  };

  const UpdateEmployee = (data: EmployeeLogIn) => {
    const filteredData = employeeList.filter((x) => x.id === data.id)[0];
    const indexOfEdit = employeeList.indexOf(filteredData);
    const tempData = [...employeeList];
    tempData[indexOfEdit] = data;
    setEmployeeList(tempData);
  };
  return (
    <div className="flex flex-col items-center justify-center  w-full">
      <table className="block overflow-hidden table-fixed border-separate shadow-[0_10_10_rgba(204,204,204,0.3)] rounded-sm w-full overflow-x-auto m-auto">
        <thead className="bg-primary text-white  ">
          <tr>
            <th className="p-3 border-solid border-black overflow-ellipsis  w-full">
              Username
            </th>
            <th className="p-3 border-solid border-black overflow-ellipsis">
              Password
            </th>
            <th className="p-3 border-solid border-black overflow-ellipsis ">
              Role
            </th>
            <th className="flex justify-around p-3 border-solid border-black overflow-ellipsis ">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee) => {
            return (
              <tr
                key={employee.id}
                className="justify-center text-center hover:bg-gray-2"
              >
                <td className="px-8 py-4 border">{employee.username}</td>
                <td className="px-8 py-4 border">{employee.password}</td>
                <td className="px-8 py-4 border">{employee.role}</td>
                <td className="px-8 py-4 border">
                  <div className="flex flex-row gap-3 justify-center">
                    <BsPencilFill onClick={() => handleEditRow(employee)} />
                    <BsTrashFill onClick={() => handleDeleteRow(employee)} />
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
          setModalEmpOpen(true);
        }}
      >
        Add
      </button>

      {openModalEmp && (
        <ModalEditEmp
          data={editEmployee}
          onSubmit={UpdateEmployee}
          closeModalEditEmp={() => {
            setModalEmpOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default TableEmployee;
