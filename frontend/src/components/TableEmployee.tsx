import { useEffect, useState } from 'react';
import { API_URL } from '../constant';
// import EmployeeLogin from '../O'
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback } from "react";
import { Account } from '../models/Account';

// function DeleteAccountButton({ username }: { username: string }) {
  // const auth = useAuth()
  // const onClick = useCallback(
      // function () {
          // deleteAccount(auth.session.token, username)
      // },
      // [auth.session.token, username]
  // )
// 
  // return <button onClick={onClick}>Delete</button>
// }
// 
// const columnHelper = createColumnHelper<Account>()
// 
// const columns = [
  // columnHelper.accessor((row) => row.username, {
      // id: "username",
  // }),
  // columnHelper.accessor((row) => row.email, {
      // id: "email",
  // }),
  // columnHelper.accessor((row) => row.name, {
      // id: "name",
  // }),
  // columnHelper.accessor((row) => row.role, {
      // id: "role",
  // }),
  // columnHelper.display({
      // header: () => null,
      // id: "actions",
      // cell: (info) => {
          // return (
              // <DeleteAccountButton
                  // username={info.row.getValue("username") as string}
              // />
          // )
      // },
  // }),
// ]
// function AccountsTable() {
  // const auth = useAuth()
  // const [accounts, setAccounts] = useState<Account[]>([])
// 
  // useEffect(() => {
      // getUsers(auth.session.token)
          // .then((data) => {
              // setAccounts(data)
          // })
          // .catch((err) => {
              // console.log(err)
          // })
  // }, [auth.session.token])
// 
  // const table = useReactTable({
      // data: accounts,
      // columns,
      // getCoreRowModel: getCoreRowModel(),
      // getFilteredRowModel: getFilteredRowModel(),
      // getPaginationRowModel: getPaginationRowModel(),
      // debugTable: true,
  // })
// 
  // return (
      // <div>
          {/* <table> */}
              {/* <TableHead table={table} /> */}
              {/* <TableBody table={table} /> */}
          {/* </table> */}
      {/* </div> */}
  // )
// }
// 
type Props = {
  list: Account[];
};

async function fetchEmployeeData(token: string, id: string): Promise<string[]> {
  const response = await fetch(`${API_URL}/${id}/employees`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log(data)
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
  console.log(data)
  return data;
}

async function fetchEmployeeProfile(token: string, id: string): Promise<string> {
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

const TableEmployee = (props: Props) => {
  const token = localStorage.getItem('user');
  const [empProfile,setEmpProfile]=useState<Account[]>([])
  let tokenObject = JSON.parse(token ? token : '');
  useEffect(() => {
    fetchPointData(tokenObject.token, tokenObject.id).then(pointId=> {
      fetchEmployeeData(tokenObject.token, pointId).then(employees=> {
        employees.forEach(element => {
          fetchEmployeeProfile(tokenObject.token,element).then(data=>{
        
          })
        });
      })
  })
    // const profile=fetchEmployeeProfile(tokenObject.token, tokenObject.id).then(
      // (data) => {
        // 
      // },
    // );
  }, []);
  return <div>
    {/* <AccountsTable/> */}
  </div>;
  // const [editEmployee, setEmployeeToEdit] = useState({} as EmployeeLogIn);
  // const [openModalEmp, setModalEmpOpen] = useState(false);
  // const { list } = props;
  // const [employeeList, setEmployeeList] = useState(list as EmployeeLogIn[]);
  // const handleDeleteRow = (data: EmployeeLogIn) => {
  // const indexToDel = employeeList.indexOf(data);
  // const tempList = [...employeeList];
  // tempList.splice(indexToDel, 1);
  // setEmployeeList(tempList);
  // };
  // const handleEditRow = (data: EmployeeLogIn) => {
  // setEmployeeToEdit(data);
  // };
  //
  // const UpdateEmployee = (data: EmployeeLogIn) => {
  // const filteredData = employeeList.filter((x) => x.id === data.id)[0];
  // const indexOfEdit = employeeList.indexOf(filteredData);
  // const tempData = [...employeeList];
  // tempData[indexOfEdit] = data;
  // setEmployeeList(tempData);
  // };
  // return (
  // <div className="flex flex-col items-center justify-center  w-full">
  {
    /* <table className="block overflow-hidden table-fixed border-separate shadow-[0_10_10_rgba(204,204,204,0.3)] rounded-sm w-full overflow-x-auto m-auto"> */
  }
  {
    /* <thead className="bg-primary text-white  "> */
  }
  {
    /* <tr> */
  }
  {
    /* <th className="p-3 border-solid border-black overflow-ellipsis  w-full"> */
  }
  {
    /* Username */
  }
  {
    /* </th> */
  }
  {
    /* <th className="p-3 border-solid border-black overflow-ellipsis"> */
  }
  {
    /* Password */
  }
  {
    /* </th> */
  }
  {
    /* <th className="p-3 border-solid border-black overflow-ellipsis "> */
  }
  {
    /* Role */
  }
  {
    /* </th> */
  }
  {
    /* <th className="flex justify-around p-3 border-solid border-black overflow-ellipsis "> */
  }
  {
    /* Actions */
  }
  {
    /* </th> */
  }
  {
    /* </tr> */
  }
  {
    /* </thead> */
  }
  {
    /* <tbody> */
  }
  {
    /* {employeeList.map((employee) => { */
  }
  // return (
  // <tr
  // key={employee.id}
  // className="justify-center text-center hover:bg-gray-2"
  // >
  {
    /* <td className="px-8 py-4 border">{employee.username}</td> */
  }
  {
    /* <td className="px-8 py-4 border">{employee.password}</td> */
  }
  {
    /* <td className="px-8 py-4 border">{employee.role}</td> */
  }
  {
    /* <td className="px-8 py-4 border"> */
  }
  {
    /* <div className="flex flex-row gap-3 justify-center"> */
  }
  {
    /* <BsPencilFill onClick={() => handleEditRow(employee)} /> */
  }
  {
    /* <BsTrashFill onClick={() => handleDeleteRow(employee)} /> */
  }
  {
    /* </div> */
  }
  {
    /* </td> */
  }
  {
    /* </tr> */
  }
  // );
  // })}
  {
    /* </tbody> */
  }
  {
    /* </table> */
  }
  {
    /* <button */
  }
  // className="mt-4 border-solid border-2 px-2 rounded-xl cursor-pointer shadow-[0_5px_5px_rgba(204,204,204,0.3)]"
  // onClick={() => {
  // setModalEmpOpen(true);
  // }}
  // >
  {
    /* Add */
  }
  {
    /* </button> */
  }
  {
    /*  */
  }
  {
    /* {openModalEmp && ( */
  }
  // <ModalEditEmp
  // data={editEmployee}
  // onSubmit={UpdateEmployee}
  // closeModalEditEmp={() => {
  // setModalEmpOpen(false);
  // }}
  // />
  // )}
  {
    /* </div> */
  }
  //   );
};

export default TableEmployee;
