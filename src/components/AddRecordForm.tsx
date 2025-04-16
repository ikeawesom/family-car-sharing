import React, { useEffect, useState } from "react";
import { addCarData } from "../handleData";
import { useRouter } from "next/navigation";
import { odoType } from "../constants";

export default function AddRecordForm({ user }: { user: string }) {
  const router = useRouter();
  const [newOdo, setNewOdo] = useState("");
  const [newOdoCfm, setNewOdoCfm] = useState("");
  const [newOdoReading, setNewOdoReadings] = useState<odoType[]>();

  useEffect(() => {
    if (newOdoReading !== undefined) {
      sessionStorage.setItem("odo-data", JSON.stringify(newOdoReading));
      router.refresh();
      router.replace("/login");
    }
  }, [newOdoReading]);
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (newOdo !== newOdoCfm) throw new Error("Readings do not match.");
      const { payload, errorMsg } = await addCarData(parseInt(newOdo), user);
      if (errorMsg) throw new Error(errorMsg);
      setNewOdoReadings(payload);
    } catch (err: any) {
      alert(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 w-full mb-4 p-2 rounded-md border-[1px] border-gray-100 shadow-md"
    >
      <input
        required
        type="number"
        placeholder="Update ODO Reading"
        value={newOdo}
        onChange={(e) => setNewOdo(e.target.value.toString())}
        className="w-full border-[1px] border-gray-100 shadow-sm rounded-md px-4 py-2 mb-2 bg-white"
      />
      <input
        required
        type="number"
        placeholder="Enter ODO Reading agan"
        value={newOdoCfm}
        onChange={(e) => setNewOdoCfm(e.target.value.toString())}
        className="w-full border-[1px] border-gray-100 shadow-sm rounded-md px-4 py-2 bg-white"
      />
      <button
        type="submit"
        className="w-full bg-blue-950 text-white rounded-md shadow-sm px-4 py-2 mt-3"
      >
        Update
      </button>
    </form>
  );
}
