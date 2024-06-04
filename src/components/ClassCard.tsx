"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IoTimeOutline } from "react-icons/io5";
import { FaUserTie, FaBook } from "react-icons/fa";

interface Lecturer {
  id: number;
  full_name: string;
  image?: string;
  title?: string;
  center?: string;
}

interface ClassCardProps {
  id: number;
  name: string;
  description: string;
  price: string;
  duration: number;
  effort_taken: string;
  image_cover: string;
  lecturers: Lecturer[];
}

const ClassCard: React.FC<ClassCardProps> = ({
  id,
  name,
  description,
  price,
  duration,
  effort_taken,
  image_cover,
  lecturers,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <Link href={`/courses/${id}`} legacyBehavior>
        <a>
          <Image
            // src={`http://localhost:8000/${image_cover}`}
            src={"/images/class/class3.png"}
            alt="Class"
            width={400}
            height={240}
            className="w-full object-cover"
            layout="responsive"
          />
        </a>
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-blue-600">{name}</h3>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        {lecturers.length > 0 && (
          <div className="text-gray-800 text-sm mb-2 flex items-center">
            <FaUserTie className="mr-2" />
            {lecturers[0].full_name}
          </div>
        )}
        <div className="text-gray-800 text-sm mb-2 flex items-center">
          <FaBook className="mr-2" />
          Kelas satuan
        </div>
        <div className="text-gray-800 text-sm mb-2 flex items-center">
          <IoTimeOutline className="mr-2" />
          {duration} Minggu
        </div>
        <div className="flex justify-end items-center mb-2">
          <p className="text-gray-800 text-lg font-bold">Rp.{price}</p>
        </div>
        <Link href={`/payment/${id}`} passHref>
          <button className="bg-blue-600 text-white w-full px-4 py-2 rounded-lg">
            Daftar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ClassCard;
