import { useState } from 'react';
import React from 'react';
import { ICargo } from '../Items.type';
type ModalOneProps = {
  data: ICargo;
  onSubmit: (data: ICargo) => void;
  closeModalOne: () => void;
};
const ModalOne = (props: ModalOneProps) => {
  const { data, onSubmit, closeModalOne } = props;

  const [description, setDescription] = useState(data.description);
  const [quantity, setQuantity] = useState(data.quantity);
  const [weight, setWeight] = useState(data.weight);
  const onChangeDescHand = (e: any) => {
    setDescription(e.target.value);
  };
  const onChangeQuantityHand = (e: any) => {
    setQuantity(e.target.value);
  };
  const onChangeWeightHand = (e: any) => {
    setWeight(e.target.value);
  };
  function onSubmitHand(e: any) {
    e.preventDefault();
    const updateData: ICargo = {
      id: data.id,
      description: description,
      quantity: quantity,
      weight: weight,
    };
    onSubmit(updateData);
    closeModalOne();
  }
  return (
    <div className=" left-0 top-0 z-1 w-full h-full flex items-center justify-center modal-container">
      <div className='flex flex-col'>
        <h3 className="align-top ">Add Cargo</h3>
      </div>

        <div className='flex flex-row'>
      <form className="rounded-md p-8 w-100">

        <div className="flex flex-row mb-4 space-x-5">
          <label className="mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            name="description"
            value={description}
            onChange={onChangeDescHand}
          ></textarea>
        </div>
        <div className="flex flex-row mb-4 space-x-5">
          <label className="mb-1" htmlFor="quantity">
            Quantity
          </label>
          <input
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            name="quantity"
            type="number"
            pattern="[0-9]*"
            value={quantity}
            onChange={onChangeQuantityHand}
          ></input>
        </div>
        <div className="flex flex-row mb-4 space-x-5">
          <label className="mb-1" htmlFor="weight">
            Weight
          </label>
          <input
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            onChange={onChangeWeightHand}
            name="weight"
            value={weight}
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

export default ModalOne;
