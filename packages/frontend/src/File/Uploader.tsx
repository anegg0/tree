import React from 'react';
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
const Uploader = (): JSX.Element => {
    // add type defs to function props to get TS support inside function bodies,
    // and not just where functions are passed as props into Dropzone
    const getUploadParams: IDropzoneProps['getUploadParams'] = () => ({
        url: 'https://localhost:3002',
    });

    const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
        console.log(files.map((f) => f.meta));
        allFiles.forEach((f) => f.remove());
    };

    return (
        <Dropzone
            getUploadParams={getUploadParams}
            onSubmit={handleSubmit}
            inputContent="Drop Your Picture Here"
        />
    );
};
export default Uploader;
