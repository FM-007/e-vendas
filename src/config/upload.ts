import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadeFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
  director: uploadeFolder,
  storage: multer.diskStorage({
    destination: uploadeFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;

      callback(null, filename);
    },
  }),
};
