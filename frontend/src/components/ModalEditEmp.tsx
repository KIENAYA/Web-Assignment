import React from 'react';
import { EmployeeLogIn,EmployeeProfile } from '../Employee.type';
import { useState } from 'react';
type ModalEditEmpProps = {
  data: EmployeeLogIn;
  onSubmit: (data: EmployeeLogIn) => void;
  closeModalEditEmp: () => void;
};



const ModalEditEmp = (props: ModalEditEmpProps) => {
    const { data, onSubmit, closeModalEditEmp } = props;
    const [profile,setProfile]=useState({} as EmployeeProfile)
    const [password, setPassword] = useState(data.password);
    const [username, setUsername] = useState(data.username);
    const [role, setRole] = useState(data.role);
    const onChangeDescHand = (e: any) => {
      setPassword(e.target.value);
    };
    const onChangeUsernameHand = (e: any) => {
      setUsername(e.target.value);
    };
    const onChangeRoleHand = (e: any) => {
      setRole(e.target.value);
    };
    function onSubmitHand(e: any) {
      e.preventDefault();
      const updateData: EmployeeLogIn = {
        id: data.id,
       profile:profile, 
        password: password,
        username: username,
        role: role,
      };
      onSubmit(updateData);
      closeModalEditEmp();
    }
    return (
      <div className=" left-0 top-0 z-1 w-full h-full flex items-center justify-center modal-container">
        <div className='flex flex-col'>
          <h3 className="align-top ">Add Cargo</h3>
        </div>
    
          <div className='flex flex-row'>
        <form className="rounded-md p-8 w-100">
    
          <div className="flex flex-row mb-4 space-x-5">
            <label className="mb-1" htmlFor="password">
              Password
            </label>
            <textarea
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              name="password"
              value={password}
              onChange={onChangeDescHand}
            ></textarea>
          </div>
          <div className="flex flex-row mb-4 space-x-5">
            <label className="mb-1" htmlFor="username">
              Username
            </label>
            <input
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              name="username"
              type="number"
              pattern="[0-9]*"
              value={username}
              onChange={onChangeUsernameHand}
            ></input>
          </div>
          <div className="flex flex-row mb-4 space-x-5">
            <label className="mb-1" htmlFor="role">
              Role
            </label>
            <input
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              onChange={onChangeRoleHand}
              name="role"
              value={role}
              type="number"
              pattern="[0-9]*"
            ></input>
          </div>
          <button className="block m-auto" type="submit" onClick={onSubmitHand}>
            Submit
          </button>
        </form>
    
          </div>
      </div>
    );
  };
  
  export default ModalEditEmp;
  
























































