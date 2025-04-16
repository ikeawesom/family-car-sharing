"use server";

import { responseType } from "./constants";
import { supabase } from "./supabase/supabaseClient";

export const fetchData = async () => {
  try {
    let { data, error } = await supabase
      .from("car_details")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return { status: 1, payload: data } as responseType;
  } catch (err: any) {
    const res = {
      status: err.status,
      errorCode: err.errorCode,
      errorMsg: err.msg,
      payload: err,
    } as responseType;
    return res;
  }
};

export const addCarData = async (reading: number, user: string) => {
  try {
    const { error } = await supabase
      .from("car_details")
      .insert([{ odo_reading: reading, driver: user }]);

    if (error) throw error;

    const { payload: data } = await fetchData();

    return { status: 1, payload: data } as responseType;
  } catch (err: any) {
    const res = {
      status: err.status,
      errorCode: err.errorCode,
      errorMsg: err.msg,
      payload: err,
    } as responseType;
    return res;
  }
};
