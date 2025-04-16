"use client";
import AddRecordForm from "@/src/components/AddRecordForm";
import DataForm from "@/src/components/DataForm";
import { odoType } from "@/src/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [odoData, setOdoData] = useState<odoType[]>([]);

  useEffect(() => {
    const user = sessionStorage.getItem("car-sharing");
    const odo_data = sessionStorage.getItem("odo-data");
    if (!user || !odo_data) {
      router.replace("/login");
    } else {
      setUser(user);
      setOdoData(JSON.parse(odo_data));
    }
  }, []);

  return (
    <div className="flex-col flex items-center justify-start w-full gap-y-8 ">
      <h1 className="font-bold text-4xl text-white">Lim CarSharing</h1>
      {user ? (
        <div className="bg-white rounded-lg w-full max-w-[800px] p-4">
          <h1 className="mb-4">
            Logged in as{" "}
            <span className="font-bold text-blue-800">{user}.</span>
          </h1>
          <AddRecordForm user={user} />
          <DataForm data={odoData} />
        </div>
      ) : (
        <p className="text-white font-bold">Loading...</p>
      )}
    </div>
  );
}
