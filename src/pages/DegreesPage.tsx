import { DegreeTable } from "../components/DegreeTable";
import { DegreeTools } from "../components/DegreeTools";
import { DegreeEditModal } from "../components/DegreeEditModal";
import { DegreeAddModal } from "../components/DegreeAddModal";

interface DegreesPageProps {};

export const DegreesPage = ({}: DegreesPageProps) => {
  return(
    <>
      <DegreeTools />
      <DegreeTable />
      <DegreeEditModal/>
      <DegreeAddModal/>
    </>
  )
};