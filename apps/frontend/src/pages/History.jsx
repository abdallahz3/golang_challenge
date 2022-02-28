import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useStream } from "react-fetch-streams";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/history").then(function(response){
      response.json().then(function(data) {
        setHistory(data.data)
      })
    })
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto">
      <br />
      <div className="mx-10">
        <Link
          to="/"
          className="px-5 py-2 bg-white text-black rounded hover:bg-black hover:text-white transition"
        >
          Go back
        </Link>
      </div>
      <div className="mt-10 mx-10">
        <table className="border-collapse table-fixed w-full">
          <thead>
            <tr>
              <th className="font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                ID
              </th>
              <th className="font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                Time
              </th>
              <th className="font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                User Agent
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {history.length == 0 ? (
              <tr>
                <td className="border border-slate-100 p-4 text-slate-500">
                  &nbsp;
                </td>
                <td className="border border-slate-100 p-4 text-slate-500">
                  &nbsp;
                </td>
                <td className="border border-slate-100 p-4 text-slate-500">
                  &nbsp;
                </td>
              </tr>
            ) : (
              history.map((elem) => {
                return (
                  <tr key={elem.id}>
                    <td className="border border-slate-100 p-4 text-slate-500">
                      {elem.id}
                    </td>
                    <td className="border border-slate-100 p-4 text-slate-500">
                      {elem.created_at}
                    </td>
                    <td className="border border-slate-100 p-4 text-slate-500">
                      {elem.user_agent}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="h-24"></div>
    </div>
  );
}

// simple csv parser
function parseCSVLine(line) {
  const parts = line.split(",");

  return {
    country: parts[0],
    name: parts[3],
    lat: parts[1],
    lng: parts[2],
  };
}
