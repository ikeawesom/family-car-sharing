"use client";
import React, { useEffect, useState } from "react";
import { handleAuth } from "../handleAuth";
import { useRouter } from "next/navigation";
import { fetchData } from "../handleData";
import { odoType } from "../constants";

export default function LoginForm() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [logged, setLogged] = useState("");
  const [odo_data, setOdoDetails] = useState<odoType[]>();

  useEffect(() => {
    if (logged && odo_data) {
      sessionStorage.setItem("car-sharing", logged);
      sessionStorage.setItem("odo-data", JSON.stringify(odo_data));
      router.push("/");
    }
  }, [logged, odo_data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { payload, errorCode } = await handleAuth(code);
      if (errorCode) throw new Error("Invalid code.");
      //   const {} = payload
      const user = payload as any;

      if (user === undefined || user.length < 1)
        throw new Error("Invalid code.");

      const userData = user[0] as { name: string; code: number };

      const { payload: car_data, errorCode: errCode } = await fetchData();
      if (errCode) throw new Error("Cannot fetch car details.");
      console.log(car_data);
      setOdoDetails(car_data);
      setLogged(userData.name);
    } catch (err: any) {
      alert(err);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg w-full max-w-[800px] p-4"
    >
      <input
        type="text"
        placeholder="Enter keycode"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full border-[1px] border-gray-100 shadow-sm rounded-md px-4 py-2"
      />
      <button
        type="submit"
        className="w-full bg-blue-950 text-white rounded-md shadow-sm px-4 py-2 mt-3"
      >
        Log In
      </button>
    </form>
  );
}
