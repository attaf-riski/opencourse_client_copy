import { ListKelas } from "@/src/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/src/components/ui/breadcrumb";
import Link from "next/link";

interface NamaKelasProps {
  isikelas: ListKelas;
}

const NamaKelas = ({ isikelas }: NamaKelasProps) => {
  return (
    <>
      <div className="md:flex justify-between w-full">
        <h1 className="text-lg font-semibold">
          {isikelas?.name} - {isikelas?.status}
        </h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href={"/dashboard/kelas"}>Kelas</Link>
            </BreadcrumbItem>
            <p>/</p>
            <BreadcrumbItem>
              <BreadcrumbPage>{isikelas?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
};

export default NamaKelas;
