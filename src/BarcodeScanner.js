import React, {useEffect, useState} from 'react';
import Quagga from 'quagga';
import './BarcodeScanner.css';

const Test = () => {
  const [data, setData] = useState({})
  useEffect(() => {
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        constraints: {
          width: 350,
          height: 350,
          facingMode: "environment"
        },
        target: document.querySelector('#camStream')
      },
      decoder : {
        readers : ["ean_reader"]
      }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
    return () => {
      Quagga.stop()
    }
  }, [])

  useEffect(() => {
    Quagga.onDetected((result) => {
      setData(result)
    })
  }, [])

  return(
    <div className="scanner">
      <div id="camStream" className="camStream"></div>
      <p>Result</p>
      {data && data.codeResult && <div>{data.codeResult.code}</div>}
    </div>
  )
}

export default Test