"use client"
import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import 'qr-scanner/qr-scanner-worker.min';

import '@/app/globals.css';
import { toast } from 'react-toastify';

export default function Camera({ name }) {
  const videoRef = useRef(null);
  const [data, setData] = useState(null);
  const [cameraOn, setCameraOn] = useState(true)

  useEffect(() => {
    
    if (name == "Increment") {
      if (cameraOn) {

          const qrScanner = new QrScanner((videoRef.current), (result) => {
          const detailedResult = result && result.result ? result.result : result;

          const increment = "increment";
          const quantity = 1;
          console.log('Decoded QR code:', detailedResult);
          setData(detailedResult);

          let parsedData;

          if (data) {
            parsedData = JSON.parse(data?.data);
            console.log(parsedData)

          }

          const apiFetching = async () => {

            let response = await fetch("http://127.0.0.1:4020/stockapi/stocks", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                _id: parsedData?._id,
                stocks: quantity,
                product_type: parsedData?.product_type,
                type: increment,
                manufacturing_date: parsedData?.manufacturing_date,
                expdate: parsedData?.expiry_date
              }),
            });

            response = await response.json();

            if (response) {
              toast.success(response.Message)

            }

          };
          apiFetching();
        setCameraOn(false)


        }
          , [data]);

        qrScanner.start();
        return () => {
          qrScanner.stop();

        };

      }
      setTimeout(() => setCameraOn(true), 2000)


    }


    else {
      if (cameraOn) {
        
          const qrScanner = new QrScanner((videoRef.current), (result) => {
          const detailedResult = result && result.result ? result.result : result;
          const increment = "decrement";
          const quantity = -1;
          console.log('Decoded QR code:', detailedResult);
          setData(detailedResult);

          let parsedData;

          if (data) {
            parsedData = JSON.parse(data?.data);
            console.log(parsedData)

          }

          const apiFetching = async () => {

            let response = await fetch("http://127.0.0.1:4020/stockapi/stocks", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                _id: parsedData?._id,
                stocks: quantity,
                product_type: parsedData?.product_type,
                type: increment,
                manufacturing_date: parsedData?.manufacturing_date,
                expdate: parsedData?.expiry_date
              }),
            });

            response = await response.json();

            if (response) {
              toast.success(response.Message)


            }

          };
          apiFetching();
          setCameraOn(false)

        }
          , [data]);

        qrScanner.start();
        return () => {
          qrScanner.stop();

        };

      }
      setTimeout(() => setCameraOn(true), 2000)
    }
  }

    , [cameraOn]);

  return (
    <section className="inc-mainbox">
      <div className="inc-subbox">
        <p className="inc-heading">QR Scanner: {name}</p>
        <div className="inc-cambox">
        
          <video ref={videoRef} className="inc-camera"></video>
        </div>
      </div>
    </section>
  );
}
