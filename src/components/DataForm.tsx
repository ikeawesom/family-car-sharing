import React from "react";
import { odoType } from "../constants";

export function convertDate(isoTimestamp: string): string {
  const date = new Date(isoTimestamp);

  const pad = (n: number): string => n.toString().padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default function DataForm({ data }: { data: odoType[] }) {
  console.log(data);
  const latestDriver = data[0].driver;
  const latestReading = data[0].odo_reading;

  return (
    <>
      <h1 className="italic">
        Latest ODO Reading: {latestReading} ({latestDriver})
      </h1>
      <table className="w-full overflow-hidden rounded-md mt-1">
        <thead className="bg-gray-400">
          <tr>
            <td className="p-2">ID</td>
            <td>Driver</td>
            <td>ODO Reading</td>
            <td>Timestamp</td>
          </tr>
        </thead>
        <tbody>
          {data.map((record: odoType, index: number) => {
            const { id, created_at, driver, odo_reading } = record;
            const convertedDate = convertDate(created_at);
            return (
              <tr key={index} className="bg-gray-200 hover:bg-gray-100">
                <td className="p-2">{id}</td>
                <td>{driver}</td>
                <td>{odo_reading}</td>
                <td>{convertedDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
