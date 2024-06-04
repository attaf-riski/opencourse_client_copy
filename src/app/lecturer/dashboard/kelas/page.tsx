import { Button } from "@/src/components/ui/button";
import ItemsKelas from "./ItemsKelas";
import Link from "next/link";
import { APISemuaKelas } from "@/src/service/ApiKelas";

const PageKelas = async () => {
  const DataListKelas = await APISemuaKelas();
  console.log(DataListKelas);

  return (
    <>
      <div className="p-4 flex flex-col gap-9">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-extrabold">Kelas</h1>
          <Link href="/lecturer/dashboard/kelas/tambah">
            <Button className="bg-blue-400" variant="outline">
              Tambah Kelas
            </Button>
          </Link>
        </div>

        <ItemsKelas kelas={DataListKelas.data} />
      </div>
    </>
  );
};

export default PageKelas;
