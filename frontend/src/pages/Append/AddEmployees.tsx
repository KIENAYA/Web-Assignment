import { FormEvent, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import { Account } from '../../models/Account';
import { Person } from '../../models/person/Person';
import { register } from '../../services/authServices';
import { useNavigate } from 'react-router-dom';
const AddEmployees = () => {
  let navigate=useNavigate()
  const [user, setUser] = useState({} as Person);
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: FormEvent) => {
e.preventDefault()
register(username,role,password,user).then(
  ()=>{
    navigate("/")
    window.location.reload
  },
  (error)=>{
    console.log(error)
  },
)
  };
  return (
    <>
      <Breadcrumb pageName="Add Employee" />

      <div className=" gap-9">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Personal Information
              </h3>
            </div>
            <form
              className="flex flex-col gap-5.5 p-6.5"
              onSubmit={handleSubmit}
            >
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    First name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) =>
                      setUser({
                        firstname: e.target.value,
                        lastname: user.lastname,
                        sex: user.sex,
                        birthDate: user.birthDate,
                        birthPlace: user.birthPlace,
                        ssn: user.ssn,
                      })
                    }
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) =>
                      setUser({
                        firstname: user.firstname,
                        lastname: e.target.value,
                        sex: user.sex,
                        birthDate: user.birthDate,
                        birthPlace: user.birthPlace,
                        ssn: user.ssn,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Social Security Number
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                  onChange={(e) =>
                    setUser({
                      firstname: user.firstname,
                      lastname: user.lastname,
                      sex: user.sex,
                      birthDate: user.birthDate,
                      birthPlace: user.birthPlace,
                      ssn: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Date of birth
                </label>
                <input
                  type="date"
                  placeholder="Enter your birthplace"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                  onChange={(e) =>
                    setUser({
                      firstname: user.firstname,
                      lastname: user.lastname,
                      sex: user.sex,
                      birthDate: e.target.value,
                      birthPlace: user.birthPlace,
                      ssn: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Sex
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <select
                    className="  appearance-none w-full rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    onChange={(e) =>
                      setUser({
                        firstname: user.firstname,
                        lastname: user.lastname,
                        sex: e.target.value,
                        birthDate: user.birthDate,
                        birthPlace: user.birthPlace,
                        ssn: user.ssn,
                      })
                    }
                  >
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Birthplace
                </label>
                <input
                  type="text"
                  placeholder="1964-01-01"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary dark:disabled:bg-black"
                  onChange={(e) =>
                    setUser({
                      firstname: user.firstname,
                      lastname: user.lastname,
                      sex: user.sex,
                      birthDate: user.birthDate,
                      birthPlace: e.target.value,
                      ssn: user.ssn,
                    })
                  }
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Roles
                </label>
                <div className="relative z-20 bg-white dark:bg-form-input">
                  <select
                    className="  appearance-none w-full rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="Assembly Point Employee">
                      Assembly Point Employee
                    </option>
                    <option value="Transfer Point Employee">
                      Transfer Point Employee
                    </option>
                    <option value="Assembly Point Admin">
                      Assembly Point Admin
                    </option>
                    <option value="Transfer Point Admin">
                      Transfer Point Admin
                    </option>
                    <option value="Admin">Admin</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
            </form>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Account authentication information
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-9">
   <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
   type='submit'
   >
    Add Employee
   </button>
          </div>
            </form>
         
         
         
         
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployees;
