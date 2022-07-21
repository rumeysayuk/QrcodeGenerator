import React, {useState, useEffect} from 'react';
import {Button, Upload, Spin} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import * as xlxs from "xlsx";

// eslint-disable-next-line import/no-anonymous-default-export
export default (props) => {
    let {setExcelData} = props;
    let [files, setFiles] = useState([]);
    let [, setLastFile] = useState(null)
    let [loading, setLoading] = useState(false)
    useEffect(() => {
        if (files.length === 0) return;
        setFiles([]);
        setLoading(true)
        let reader = new FileReader();

        reader.onload = async function (e) {
            let wb = xlxs.read(e.target.result, {type: 'array'});
            let ws = wb.Sheets[wb.SheetNames[0]];
            let json = xlxs.utils.sheet_to_json(ws);
            setLastFile(e.target.result);
            setExcelData(json);
            setLoading(false)
        };

        reader.readAsArrayBuffer(files[0]);
    }, [files]);

    return <Upload beforeUpload={(file) => {
        setFiles([...files, file]);
        return false;
    }}
                   fileList={files} multiple={false}>
        <Button type='success' size="large" style={{
            marginRight: "5px", color: "white", fontSize: 15, backgroundColor: "#4242b5",
            border: "none", borderRadius: "5px", height: 50, width: 150, padding: ".25rem"
        }} disabled={loading} loading={loading} icon={<UploadOutlined/>}>
            Import Excel
        </Button>
        {files.length > 10 && <Spin/>}
    </Upload>;
};