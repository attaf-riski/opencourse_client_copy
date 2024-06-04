"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import FormKelas from "@/src/components/form/FormKelas";
import { ListKelas } from "@/src/types";
import {
  APIDetailKelas,
  APIEditKelas,
  APIHapusKelas,
} from "@/src/service/ApiKelas";
import { FileCheck, Link2Off, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDialogHandlers } from "@/src/hooks/UseProgressDialog";
import CustomAlertDialog from "@/src/components/CustomAlertDialog";
import { useBabUploader } from "@/src/hooks/UseBabUploader";
import { useApiErrorHandler } from "@/src/hooks/UseApiErrorHandler";

type PageEditKelasProps = {
  params: { slug: string };
};

const PageEdit = ({ params }: PageEditKelasProps) => {
  const id = params.slug;
  const [typeButtonForm, setTypeButtonForm] = useState("");
  const [data_OldForm, set_DataOldForm] = useState<ListKelas>();
  const [responForm, setResponForm] = useState();
  const [dataAllBab, setDataAllBab] = useState([]); // ambil data bab yang tersedia selama pengisian form
  const router = useRouter();
  const {
    munculDialog,
    pesanDialog,
    progressTimer,
    setProgressTimer,
    showDialog,
  } = useDialogHandlers();
  const { uploadBab } = useBabUploader();
  const { handleApiError } = useApiErrorHandler();

  // ambil data lama buat nampilin di versi edit
  const dataLamaKelas = async () => {
    const respon = await APIDetailKelas(id);
    set_DataOldForm(respon);
  };

  // trigger ambil data lama saat pertama kali reload / id berubah
  useEffect(() => {
    dataLamaKelas();
  }, [id]);

  // handle data_OldForm
  useEffect(() => {
    if (data_OldForm?.error) {
      showDialog(
        <Link2Off />,
        "Gagal memuat data kelas Anda. Silahkan hubungi Admin"
      );
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    }

    if (
      data_OldForm?.status === "Token is Expired" ||
      data_OldForm?.status === "Token is Invalid"
    ) {
      showDialog(<Link2Off />, "Anda sudah logout, silahkan Login kembali");
      setTimeout(() => {
        router.push("/");
      }, 4000);
    }
  }, [data_OldForm]);

  const handleBtnSubmit = async (e: string, event: React.FormEvent) => {
    event.preventDefault();
    setTypeButtonForm(e);
    setProgressTimer(0);

    if (e === "drafted" || e === "published") {
      showDialog(<Upload />, "Sedang mengupload data...", true);

      const respon = await APIEditKelas(responForm, e, id);

      const course_id = data_OldForm?.data?.id;

      const isSuccesAll = await uploadBab(dataAllBab, course_id);

      if (isSuccesAll || respon) {
        showDialog(
          <FileCheck />,
          `Data kelas berhasil ${e === "drafted" ? "update" : "publish"}.`
        );
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }

      handleApiError(respon);
    } else if (e === "hapus") {
      const respon = await APIHapusKelas(id);
      if (respon?.succes) {
        showDialog(<Link2Off />, `Data kelas terhapus`);
        setTimeout(() => {
          router.push("/dashboard/kelas");
        }, 4000);
      }
      handleApiError(respon);
    }
  };

  return (
    <>
      <CustomAlertDialog
        open={munculDialog}
        pesanDialog={pesanDialog}
        progressTimer={progressTimer}
      />

      <div className="p-3">
        <div className="flex justify-between mb-10 items-center">
          <h1 className="text-xl font-bold">Edit Kelas</h1>

          <div className="flex gap-2">
            <Button
              onClick={(event) => handleBtnSubmit("hapus", event)}
              variant="link"
            >
              Hapus Kelas
            </Button>
            <Button
              form={typeButtonForm}
              onClick={(event) => handleBtnSubmit("drafted", event)}
              variant="outline"
            >
              Simpan Draf
            </Button>
            <Button
              form={typeButtonForm}
              onClick={(event) => handleBtnSubmit("published", event)}
              variant="secondary"
            >
              Publikasikan
            </Button>
          </div>
        </div>

        <div className="w-full">
          <FormKelas
            typeBtn={typeButtonForm}
            oldData={data_OldForm?.data}
            respon={(e: any) => setResponForm(e)}
            dataBab={(e: any) => setDataAllBab(e)}
          />
        </div>
      </div>
    </>
  );
};

export default PageEdit;
