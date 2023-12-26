import { IOrder } from '../Order.type';

import { useState } from 'react';
type TableProps = {
  listOfOrder: IOrder[];
};

const UnchangedTable = (props:TableProps) => {
  const {listOfOrders}=props
  return (
    <div>UnchangedTable</div>
  )
}

export default UnchangedTable