"use client"
import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import 'qr-scanner/qr-scanner-worker.min';

import '@/app/globals.css';
import { toast } from 'react-toastify';

export default function Camera({ name }) {
  // console.log(process.env.URL)
  const videoRef = useRef(null);
  const [data, setData] = useState(null);
  const [cameraOn, setCameraOn] = useState(true)
  useEffect(() => {
    if(name == "Increment"){
      if (cameraOn) {


        const qrScanner = new QrScanner((videoRef.current), (result) => {
          const detailedResult = result && result.result ? result.result : result;
  
        setCameraOn(false)
          const increment = "increment";
          const quantity = "1";
          console.log('Decoded QR code:', detailedResult);
          setData(detailedResult);
  
          let parsedData;
          try {
            if (data) {
              parsedData = JSON.parse(data?.data);
  
            }
          }
  
          catch (error) {
            toast.error(error.message);
            console.log("Hey" + error.message)
          }
          
          const apiFetching = async () => {
  
            let response = await fetch("http://127.0.0.1:4020/stockapi/stocks", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                type: increment,
                stocks: quantity,
                product_type: parsedData?.product,
              }),
            });
  
            response = await response.json();
  
            if (response && response.status == 201) {
              toast.success(response.Message)
  
            }
  
            else {
              toast.error(response.message)
            }
          };
          
          apiFetching();


        }

          , [data]);
  
        qrScanner.start();
        return () => {
          qrScanner.stop();

        };
  
      }

      setTimeout(() => setCameraOn(true), 3000)
  
    }

    if (cameraOn) {


      const qrScanner = new QrScanner((videoRef.current), (result) => {
        const detailedResult = result && result.result ? result.result : result;

      setCameraOn(false)
        const increment = "decrement";
        const quantity = "1";
        console.log('Decoded QR code:', detailedResult);
        setData(detailedResult);

        let parsedData;
        try {
          if (data) {
            parsedData = JSON.parse(data?.data);

          }
        }

        catch (error) {
          toast.error(error.message);
          console.log("Hey" + error.message)
        }
        
        const apiFetching = async () => {

          let response = await fetch("http://127.0.0.1:4020/stockapi/stocks", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              type: increment,
              stocks: quantity,
              product_type: parsedData?.product,
            }),
          });

          response = await response.json();

          if (response && response.status == 201) {
            toast.success(response.Message)

          }

          else {
            toast.error(response.message)
          }
        };
        
        apiFetching();


      }

        , [data]);

      qrScanner.start();
      return () => {
        qrScanner.stop();

      };

    }

    setTimeout(() => setCameraOn(true), 3000)

    }

    , [data, cameraOn]);

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
