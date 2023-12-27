import { IOrder } from '../Order.type';

import { useState } from 'react';
type TableProps = {
  listOfOrders: IOrder[];
};

const UnchangedTable = (props:TableProps) => {
  const {listOfOrders}=props
  return (
    <div>UnchangedTable</div>
  )
}

export default UnchangedTable