import React, { useState } from 'react';
import BarcodeScannerComponent from 'react-webcam-barcode-scanner';
import './BarcodeScanner.css';

const BarcodeScanner = () => {
    const [data, setData] = useState('Not Found');
    return (
        <div className="barcodescanner">
            <div>
                <BarcodeScannerComponent
                    width={360}
                    height={360}
                    onUpdate={(err, result) => {
                        if (result) setData(result.text)
                        else setData('Not Found')
                    }}
                />
            </div>
            <p>{data}</p>
        </div>
    )
}

export default BarcodeScanner