import React, { useState } from 'react'
import { ICargo, fakeItem } from '../Items.type'
import TableOne from './TableOne';

const AddDropdown = () => {
  const [cargoList,setCargoList]=useState([] as ICargo[]);
  return (
    <div>
        <TableOne list={cargoList}/>
    </div>
  )
}

export default AddDropdown

















