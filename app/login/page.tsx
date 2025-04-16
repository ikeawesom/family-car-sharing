"use client";
import LoginForm from "@/src/components/LoginForm";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const user = sessionStorage.getItem("car-sharing");
    const odoData = sessionStorage.getItem("odo-data");
    if (user && odoData) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, []);
  if (!loading)
    return (
      <div className="flex-col flex items-center justify-start w-full gap-y-8">
        <h1 className="font-bold text-4xl text-white">Lim CarSharing</h1>
        <LoginForm />
      </div>
    );
  else {
    return <p className="text-white font-bold">Loading...</p>;
  }
}
