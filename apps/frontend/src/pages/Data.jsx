import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useStream } from "react-fetch-streams";

export default function () {
  const [countries, setCountries] = useState([]);

  // useEffect(() => {
  //   let isUnmounted = false;
  //   fetch("http://localhost:8000/data").then(function (response) {
  //     const reader = response.body.getReader();
  //     let readFirstLine = false;
  //
  //     // helper function
  //     function go() {
  //       if (isUnmounted) {
  //         reader.cancel();
  //         return;
  //       }
  //       reader.read().then(function (result) {
  //         if (!result.done) {
  //           let whatIJustRead = JSON.parse(
  //             new TextDecoder("utf-8").decode(result.value)
  //           );
  //           console.log(whatIJustRead);
  //
  //           // ignore the first line of the csf
  //           if (!readFirstLine) {
  //             readFirstLine = true;
  //           } else {
  //             setCountries((c) => {
  //               return [...c, parseCSVLine(whatIJustRead.data)];
  //             });
  //           }
  //
  //           go();
  //         }
  //       });
  //     }
  //
  //     // call the above function
  //     go();
  //   });
  //
  //   return () => {
  //     isUnmounted = true;
  //   };
  // }, []);

  const onNext = useCallback(
    (res) => {
      res.json().then((data) => {
        setCountries((c) => {
          return [...c, parseCSVLine(data.data)];
        });
      })
    },
    [setCountries]
  );
  const stream = useStream("http://localhost:8000/data", { onNext });

  useEffect(() => {
    return () => {
      stream.close();
    };
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
                Country
              </th>
              <th className="font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                Country Name
              </th>
              <th className="font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                Lat
              </th>
              <th className="font-medium p-4 text-slate-400 dark:text-slate-200 text-left">
                Lng
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {countries.length == 0 ? (
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
                <td className="border border-slate-100 p-4 text-slate-500">
                  &nbsp;
                </td>
              </tr>
            ) : (
              countries.map((elem) => {
                return (
                  <tr key={elem.country}>
                    <td className="border border-slate-100 p-4 text-slate-500">
                      {elem.country}
                    </td>
                    <td className="border border-slate-100 p-4 text-slate-500">
                      {elem.name}
                    </td>
                    <td className="border border-slate-100 p-4 text-slate-500">
                      {elem.lat}
                    </td>
                    <td className="border border-slate-100 p-4 text-slate-500">
                      {elem.lng}
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
