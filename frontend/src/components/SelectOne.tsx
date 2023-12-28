import React from 'react'


type Props ={
    setValue:()=>any
}


const SelectOne = (props:Props) => {
    const {setValue}=props
  return (
    <div>SelectOne
         <div className="relative z-20 bg-white dark:bg-form-input">
   <select className="  appearance-none w-full rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
     <option value="complete">Complete</option>
     <option value="fail">Fail</option>
     <option value="receive_ucf">Receive(Unconfirmed)</option>
     <option value="receive_cf">Receive(Confimed)</option>
     <option value="return">Return</option>
   </select>
   setValue(value)
    </div>
    </div>
  )
}

export default SelectOne