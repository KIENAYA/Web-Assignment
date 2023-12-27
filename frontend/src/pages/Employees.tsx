import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import ModalEditEmp from '../components/ModalEditEmp';
import TableOne from '../components/TableOne';
import TableThree from '../components/TableThree';
import TableTwo from '../components/TableTwo';
import { EmployeeLogIn } from '../Employee.type';



function handleSubmit(){}
const Employees = () => {
  const [testEmp,setTestEmp]=useState({}as EmployeeLogIn)
  const [openModalEmp, setModalEmpOpen] = useState(false);
  
  
  return (
    <>
      <Breadcrumb pageName="Employees" />

      <div className="flex flex-col gap-10">
        <ModalEditEmp data={testEmp}
        onSubmit={handleSubmit}
        closeModalEditEmp={()=>setModalEmpOpen(false)}/>
      </div>
    </>
  );
};

export default Employees;
