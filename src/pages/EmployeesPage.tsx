import { EmployeeTable } from "../components/EmployeeTable";
import { EmployeeTools } from "../components/EmployeeTools";
import { EmployeeEditModal } from "../components/EmployeeEditModal";
import { EmployeeAddModal } from "../components/EmployeeAddModal";

interface EmployeesPageProps {};

export const EmployeesPage = ({}: EmployeesPageProps) => {
  return(
    <>
      <EmployeeTools />
      <EmployeeTable />
      <EmployeeAddModal/>
      <EmployeeEditModal/>
    </>
  )
};