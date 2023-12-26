import React, { useState } from 'react';
import { Faker, faker } from '@faker-js/faker';
import { ICargo } from '../Items.type';
function generateFakeID() {
  return faker.string.nanoid();
}

type FormProps = {
  closeModalTwo: () => void;
  onSubmit: (data: ICargo) => void;
};

const ModalTwo = (props: FormProps) => {
  const [description, setDescription] = useState('');
  const [id, setID] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [weight, setWeight] = useState(0);
  const onChangeDescHand = (e: any) => {
    setDescription(e.target.value);
  };
  const onChangeQuantityHand = (e: any) => {
    setQuantity(e.target.value);
  };
  const onChangeWeightHand = (e: any) => {
    setWeight(e.target.value);
  };
  const { closeModalTwo, onSubmit } = props;
  function onSubmitHand(e: any) {
    e.preventDefault();
    const data: ICargo = {
      id: generateFakeID(),
      description: description,
      quantity: quantity,
      weight: weight,
    };
    onSubmit(data);

    closeModalTwo();
  }
  return (
    <div className=" left-0 top-0 z-1 w-full h-full flex items-center justify-center modal-container flex-col space-y-8">
      <div className='flex flex-col space-y-4'>
        <form className="rounded-md p-8 w-100">
      <div className='flex flex-row border-solid border-black-2 text-center justify-center gap-8 bg-primary text-white space-y-8'>
        Add Cargo
        </div>
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
          <button className=" border-2 border-solid  block m-auto" type="submit" onClick={onSubmitHand}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalTwo;
