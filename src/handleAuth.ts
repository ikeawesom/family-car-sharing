"use server";

import { responseType } from "./constants";
import { supabase } from "./supabase/supabaseClient";

export const handleAuth = async (code: string) => {
  try {
    let { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("code", code);

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
