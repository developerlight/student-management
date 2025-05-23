// const cloudinary = require('cloudinary').v2;
import {v2 as cloudinary} from 'cloudinary';

const {CLOUD_NAME, PRESET_NAME, API_KEY, API_SECRET} = require('../env/index.js').cloudinaryEnv;

cloudinary.config({
    cloud_name : CLOUD_NAME,
    api_key : API_KEY,
    api_secret : API_SECRET
})
export default cloudinary;