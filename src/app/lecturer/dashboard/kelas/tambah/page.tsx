"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/src/components/ui/button";
import FormKelas from "@/src/components/form/FormKelas";
import { APIBuatKelas } from "@/src/service/ApiKelas";
import { FileCheck, Link2Off, Upload } from "lucide-react";
import { setTimeout } from "timers";
import { useRouter } from "next/navigation";
import CustomAlertDialog from "@/src/components/CustomAlertDialog";
import { useDialogHandlers } from "@/src/hooks/UseProgressDialog";
import { useBabUploader } from "@/src/hooks/UseBabUploader";
import { Section } from "@/src/types";
import { useApiErrorHandler } from "@/src/hooks/UseApiErrorHandler";

const TambahPage = () => {
  const [typeButtonForm, setTypeButtonForm] = useState("");
  const [responForm, setResponForm] = useState();
  const [isAddForm, setIsAddForm] = useState(false);
  const [dataAllBab, setDataAllBab] = useState<Section[]>();
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

  const handleBtnSubmit = async (e: string, event: React.FormEvent) => {
    event.preventDefault();
    setTypeButtonForm(e);

    setProgressTimer(0);
    showDialog(<Upload />, "Sedang mengupload data...", true);
    console.log(responForm);
    // const respon = await APIBuatKelas(responForm, e);
    //
    // if (respon?.course?.id) {
    //   const course_id = respon.course.id;
    //
    //   const isSuccesAll = await uploadBab(dataAllBab, course_id);
    //
    //   if (isSuccesAll || respon.course.id) {
    //     showDialog(
    //       <FileCheck />,
    //       `Data kelas ${respon.course.name} berhasil diupload.`
    //     );
    //     setTimeout(() => {
    //       router.push("/dashboard/kelas");
    //     }, 4000);
    //   }
    // }
    //
    // handleApiError(respon);
  };

  // jika saat user tambah dan ingin nambah materi, data akan diupload dan diarahkan ke page edit
  useEffect(() => {
    const handleTambahKelas = async () => {
      if (isAddForm) {
        const respon = await APIBuatKelas(responForm, "draft");

        if (respon?.course?.id) {
          const course_id = respon.course.id;

          const isSuccesAll = await uploadBab(dataAllBab, course_id);

          if (isSuccesAll || respon.course.id) {
            showDialog(
              <FileCheck />,
              `Jika anda ingin menambah materi bab, anda akan diarahkan ke halaman edit data kelas ${respon.course.name} Anda tersimpan. Silahkan pilih bab yang akan ditambah materi`
            );
            setTimeout(() => {
              router.push(`/dashboard/kelas/${course_id}/edit`);
            }, 4000);
          }
        }

        handleApiError(respon);
      }
    };

    handleTambahKelas();
  }, [isAddForm]);

  return (
    <>
      <CustomAlertDialog
        open={munculDialog}
        pesanDialog={pesanDialog}
        progressTimer={progressTimer}
      />

      <div className="p-3">
        <div className="flex justify-between mb-10 items-center">
          <h1 className="text-xl font-bold">Tambah Kelas</h1>

          <div className="flex gap-2">
            <Button
              form={typeButtonForm}
              onClick={(event) => handleBtnSubmit("draft", event)}
              variant="outline"
            >
              Simpan Draf
            </Button>
            <Button
              form={typeButtonForm}
              onClick={(event) => handleBtnSubmit("published-lecturer", event)}
              variant="secondary"
            >
              Publikasikan
            </Button>
          </div>
        </div>

        <div className="w-full">
          <FormKelas
            typeBtn={typeButtonForm}
            respon={(e: any) => setResponForm(e)}
            dataBab={(e: any) => setDataAllBab(e)}
            addForm={(e: any) => setIsAddForm(e)} // mengambil nilai baolean
          />
        </div>
      </div>
    </>
  );
};

export default TambahPage;
