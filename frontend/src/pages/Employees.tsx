import Breadcrumb from '../components/Breadcrumb';
import TableOne from '../components/TableOne';
import TableThree from '../components/TableThree';
import TableTwo from '../components/TableTwo';

const Employees = () => {
  return (
    <>
      <Breadcrumb pageName="Employees" />

      <div className="flex flex-col gap-10">
        <TableTwo />
        <TableThree />
      </div>
    </>
  );
};

export default Employees;
