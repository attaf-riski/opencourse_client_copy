"use server";

import axios from "axios";
import Http from "../helpers/Fetch";
import { GetAuth } from "@/src/helpers/AuthUser";
import { cookies } from "next/headers";

const token = process.env.TOKEN;

export const APIBuatKelas = async (
  formData: any,
  status: string
): Promise<any> => {
  const dataCreateKelas = {
    name: formData?.name,
    description: formData?.description,
    about: formData?.description,
    duration: formData?.duration,
    effort_taken: formData?.effort_taken,
    status: status,
    price: formData?.price,
    language: formData?.language,
    image_cover: "default_image_cover",
    created_by: 40,
    updated_by: 9,
    course_category_id: 1,
    is_superior: true,
  };

  try {
    const response = await axios.post(
      "http://localhost:8000/api/lecturer/courses",
      dataCreateKelas,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    return { error: true, message: "API Tidak Aktif" };
  }
};

export const APIEditKelas = async (
  formData: any,
  status: string,
  id: string
) => {
  const dataUpdateKelas = {
    name: formData?.name,
    description: formData?.description,
    about: formData?.description,
    duration: formData?.duration,
    effort_taken: formData?.effort_taken,
    status: status,
    price: formData?.price,
    language: formData?.language,
    image_cover: "default_image_cover",
  };

  try {
    const response = await axios.put(
      `http://localhost:8000/api/lecturer/courses/${id}`,
      dataUpdateKelas,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    return { error: true, message: "API Tidak Aktif" };
  }
};

export const APIDetailKelas = async (id: any) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/lecturer/courses/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    return { error: true, message: "API Tidak Aktif" };
  }
};

export const APIHapusKelas = async (id: any) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/lecturer/courses/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    return { error: true, message: "API Tidak Aktif" };
  }
};

export const APISemuaKelas = async () => {
  try {
    const user = GetAuth();

    const mycok = cookies()
    const mytok = mycok.get("userData_Apps")?.value ?? ""
    const tok = JSON.parse(mytok)
    console.log(tok)

    const response = await Http.get(
      `api/lecturer/courses/status/check?status=semua`,
      {
        headers: { Authorization: `Bearer ${tok?.token}` },
      }
    );

    return response.data;
  } catch (error) {
    return { error: true, message: "API Tidak Aktif"+error };
  }
};
