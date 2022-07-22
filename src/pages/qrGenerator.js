import React, {useState} from 'react';
import QRCode from 'qrcode.react'
import ImportExcel from "./ImportExcel";
import {DownloadOutlined} from '@ant-design/icons';
import {Button} from "antd";
import JSZip from "jszip";
import {saveAs} from 'file-saver';

const QrGenerator = () => {
    let [excelData, setExcelData] = useState([]);

    let setQrSize = () => {
        let width = window.innerWidth;
        return width / 8;
    };

    const downloadQRCode = () => {
        let zip = new JSZip();
        for (const item of excelData) {
            const canvas = document.getElementById(item.id)
            canvas.toBlob(function (blob) {
                zip.file(item.id + '.png', blob);
            })
        }
        setTimeout(() => {
            zip.generateAsync({type: 'blob'}).then(function (content) {
                saveAs(content, "qrcodes.zip");
            });
        }, 500)
    };
    return (
        <div style={{marginTop: 100}}>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <ImportExcel setExcelData={setExcelData}/>
                <Button size="large" onClick={downloadQRCode} icon={<DownloadOutlined/>}
                        style={{
                            marginRight: "5px", color: "white", backgroundColor: "cadetblue", fontSize: 15,
                            border: "none", borderRadius: "5px", height: 50, width: 150, padding: ".25rem"
                        }}>Qr kodları zip olarak indir</Button>
            </div>
            <br/>
            {excelData.map((item, i) => (
                <QRCode renderAs="canvas" className="canvas" id={item.id} key={i} style={{margin: 20, padding: 40}}
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