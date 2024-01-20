"use client"
import { useEffect, useRef, useState } from 'react';
import QrScanner from 'qr-scanner';
import 'qr-scanner/qr-scanner-worker.min';

import '@/app/globals.css';

export default function Camera({name}) {
  console.log(name)
  const videoRef = useRef(null);
  const[data, setData] = useState(null)

  useEffect(() => {
    const qrScanner = new QrScanner(videoRef.current, (result) => {
      // Check if the detailed scan result is provided
      const detailedResult = result && result.result ? result.result : result;
      console.log('Decoded QR code:', detailedResult);
      setData(detailedResult)

    });


    // Start the QR scanner
    qrScanner.start();

    // Clean up: stop the QR scanner when the component unmounts
    return () => {
      qrScanner.stop();
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <section className="inc-mainbox">
      <div className="inc-subbox">
        <p className="inc-heading">QR Scanner: {name}</p>
        <div className="inc-cambox">
          {/* Reference the video element using useRef */}
          <video ref={videoRef} className="inc-camera"></video>
        </div>
        <p>{data}</p>
      </div>
    </section>
  );
}
