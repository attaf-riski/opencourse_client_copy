"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { ListKelas } from "../../../../types";
import Link from "next/link";
import { useState } from "react";

interface DaftarKelasProps {
  kelas: ListKelas[];
}

const ItemsKelas = ({ kelas }: DaftarKelasProps) => {
  const [statusKelas, setStatusKelas] = useState("semua");

  const FilterKelas = kelas?.filter((item) => {
    if (statusKelas == "semua") return kelas;
    else return item.status == statusKelas;
  });

  return (
    <>
      <div>
        <Tabs defaultValue="semua" className="">
          <TabsList>
            <TabsTrigger value="semua" onClick={() => setStatusKelas("semua")}>Semua</TabsTrigger>
            <TabsTrigger value="published-admin" onClick={() => setStatusKelas("published-admin")}>Publik</TabsTrigger>
            <TabsTrigger value="draft" onClick={() => setStatusKelas("draft")}>Draf</TabsTrigger>
            <TabsTrigger value="published-lecturer" onClick={() => setStatusKelas("published-lecturer")}>Perlu diulas</TabsTrigger>
            <TabsTrigger value="revision" onClick={() => setStatusKelas("revision")}>Pending</TabsTrigger>
          </TabsList>

          <TabsContent
            value={statusKelas}
            className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-10"
          >
            {FilterKelas?.map((kelas) => (
              <Card>
                <Link href={`/lecturer/dashboard/kelas/${kelas.id}`}>
                  <CardContent className="h-40 bg-red-200 rounded-t-lg w-full">
                    <p className="bg-white w-fit p-1 relative top-3">
                      {kelas.status}
                    </p>
                  </CardContent>
                  <CardHeader>
                    <CardTitle className="text-md">{kelas.name}</CardTitle>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ItemsKelas;
