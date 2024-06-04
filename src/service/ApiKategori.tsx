"use server";

import axios from "axios";

const token = process.env.TOKEN;

export const APISemuaKategori = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/lecturer/courses/categories`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    return { error: true, message: "API Tidak Aktif" };
  }
};
