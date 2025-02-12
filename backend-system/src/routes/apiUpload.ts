import express, { Express, Request, Response } from 'express';
import fs from 'fs';
import httpStatus from 'http-status';
import multer from 'multer';
import path from 'path';
import { handleCheckTokenAdmin } from '~/middleware/jwtActions';
import { ResponseHandler } from '~/utils/Response';

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Sử dụng __dirname để tạo đường dẫn tương đối chính xác
        const uploadPath = path.join(__dirname, '../public/files');

        // Kiểm tra xem thư mục có tồn tại hay không
        fs.access(uploadPath, (err: any) => {
            if (err) {
                // Nếu thư mục không tồn tại, tạo thư mục (recursive:true cho phép tạo nhiều cấp nếu cần)
                fs.mkdir(uploadPath, { recursive: true }, (err) => {
                    if (err) return cb(err, uploadPath);
                    return cb(null, uploadPath);
                });
            } else {
                // Nếu đã tồn tại, chuyển ngay
                return cb(null, uploadPath);
            }
        });
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

const initApiUpload = (app: Express) => {
    router.post('/', handleCheckTokenAdmin, upload.single('file'), (req: Request, res: Response) => {
        return res.status(httpStatus.OK).json(
            ResponseHandler(
                httpStatus.OK,
                {
                    name_file: req.file?.filename,
                    url_public: `/v1/upload/public/${req.file?.filename}`,
                },
                'upload file successfuly',
            ),
        );
    });
    router.get('/public/:filename', (req: Request, res: Response) => {
        const { filename } = req.params;
        const filePath = path.join(__dirname, '../public/files', filename);
        res.sendFile(filePath, (err) => {
            if (err) {
                return res
                    .status(httpStatus.NOT_FOUND)
                    .json(ResponseHandler(httpStatus.NOT_FOUND, {}, 'File not found'));
            }
        });
    });
    return app.use('/v1/upload', router);
};

export default initApiUpload;
