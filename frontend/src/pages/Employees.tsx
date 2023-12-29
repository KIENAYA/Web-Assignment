import { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ModalEditEmp from '../components/ModalEditEmp';
import TableEmployee from '../components/TableEmployee';
import { Account } from '../models/Account';
import { API_URL } from '../constant';
async function fetchEmployeeData(
  token: string,
  id: string,
): Promise<Account[]> {
  const response = await fetch(`${API_URL}/${id}/employees`, {
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


function handleSubmit(){}
const Employees = () => {
  // const [testEmp,setTestEmp]=useState({}as EmployeeLogIn)
  
  const [empProfile, setEmpProfile] = useState<Account[]>([]);
  useEffect(() => {
  const token = localStorage.getItem('user');
  const tokenObject = JSON.parse(token ? token : '');
      fetchEmployeeData(tokenObject.token, tokenObject.id).then((employees) => {
        setEmpProfile(employees);
    });
  }, []);
 
  return (
    <>
      <Breadcrumb pageName="Employees" />

      <div className="flex flex-col gap-10">
        <TableEmployee
        list={empProfile}
        />
        {/* <ModalEditEmp data={testEmp} */}
        {/* // onSubmit={handleSubmit} */}
        {/* // closeModalEditEmp={()=>setModalEmpOpen(false)}/> */}
      </div>
    </>
  );
};

export default Employees;
