'use client';

import { cloudinaryEnv } from "../env";


const { CldUploadButton } = require("next-cloudinary");

const CloudinaryUploader = () => {
    return ( 
        <div className="">
            <CldUploadButton
                options={{
                    multiple: false,
                    sources: ['local', 'url', 'camera', 'google_photos'],
                }}
                uploadPreset={cloudinaryEnv.PRESET_NAME}
                className="bg-green-400 py-2 px-3 rounded border mt-4 text-white
                            hover:bg-green-500 transition ease-in-out delay-200"
            >
                <span>Upload Image</span>
            </CldUploadButton>
        </div>
     );
}
 
export default CloudinaryUploader;