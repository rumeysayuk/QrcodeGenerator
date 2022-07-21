import React, {useState} from 'react';
import QRCode from 'qrcode.react'
import ImportExcel from "./ImportExcel";
import {DownloadOutlined} from '@ant-design/icons';
import {Button} from "antd";

const QrGenerator = () => {
    const [qrValue, setQrValue] = useState("rumesya");
    let [excelData, setExcelData] = useState([]);
    let setQrSize = () => {
        let width = window.innerWidth;
        return width / 8;
    };
    const handleOnChange = event => {
        const { value } = event.target;
        setQrValue(value);
    };
    const downloadQRCode = () => {
        const canvas = document.getElementById("qr-gen");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${qrValue}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    return (
        <div style={{marginTop: 100}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <ImportExcel setExcelData={setExcelData}/>
                <Button size="large" onClick={downloadQRCode} icon={<DownloadOutlined/>}
                        style={{
                            marginRight: "5px", color: "white", backgroundColor: "cadetblue", fontSize: 15,
                            border: "none", borderRadius: "5px", height: 50, width: 150, padding: ".25rem"
                        }}>Qr kodları toplu olarak indir</Button>
            </div>
            <br/>
            {excelData.map((item, i) => (
                <QRCode renderAs="canvas" className="canvas" key={i} style={{margin: 20, padding: 40}}
                        value={JSON.stringify({
                            id: item.id, name: item.name, user_room_type: item.user_room_type,
                            company: (item.company ? item.company : "")
                        })} size={setQrSize()}/>
            ))}
            <br/>
        </div>
    );
};

export default QrGenerator;