import { Button, Modal } from 'antd';
import { HttpStatusCode } from 'axios';
import MarkdownIt from 'markdown-it';
import { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Swal from 'sweetalert2';
import processENV from '../../../../configs/process';
import { sendEmailAllService, sendEmailService } from '../../../../services/emailService';
import { uploadFileService } from '../../../../services/uploadService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

interface PostDetailModalProps {
    visible: boolean;
    onCancel: () => void;
}

const ModalEmailMarketing = ({ visible, onCancel }: PostDetailModalProps) => {
    const [email, setEmail] = useState<string>('');
    const [html, setHtml] = useState<string>('');
    const [isAll, setIsAll] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function handleEditorChange({ html }: { html: string }) {
        setHtml(html);
    }

    const handleUploadImage = async (file: File) => {
        if (!file) return;
        try {
            const res = await uploadFileService({
                file: file,
            });
            if (res.code === HttpStatusCode.Ok) {
                const url = processENV.VITE_URL_BACKEND + res.data.url_public;
                return url;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        if (!isAll && !email) {
            Swal.fire({
                icon: 'info',
                text: 'Bạn hãy nhập đầy đủ email',
            });
            return;
        }

        if (!isAll && email) {
            try {
                setIsLoading(true);
                const res = await sendEmailService({
                    email: email,
                    html: html,
                });
                if (res.code === HttpStatusCode.Ok) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Bạn đã gửi mail thành công!',
                    });
                }
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
            return;
        }

        if (isAll) {
            try {
                setIsLoading(true);
                const res = await sendEmailAllService({
                    html: html,
                });
                if (res.code === HttpStatusCode.Ok) {
                    Swal.fire({
                        icon: 'success',
                        text: 'Bạn đã gửi mail thành công!',
                    });
                }
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
            return;
        }
    };

    return (
        <Modal title="Chiến lược gửi mail marketing" open={visible} onCancel={onCancel} footer={null} width={1200}>
            <div className="p-4">
                <div className="mb-4">
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-1">
                            <input type="radio" name="is_all" checked={isAll} onChange={() => setIsAll(true)} />
                            <span className="font-[600]">Gửi tất cả</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <input type="radio" name="is_all" checked={!isAll} onChange={() => setIsAll(false)} />
                            <span className="font-[600]">Gửi riêng</span>
                        </div>
                    </div>
                    {!isAll && (
                        <input
                            className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Nhập email..."
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Nội dung:</label>
                    <MdEditor
                        onImageUpload={handleUploadImage}
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={handleEditorChange}
                    />
                </div>
                {isLoading ? (
                    <Button type="primary" block>
                        Đang gửi dữ liệu....
                    </Button>
                ) : (
                    <Button type="primary" block onClick={handleSubmit}>
                        Gửi mail
                    </Button>
                )}
            </div>
        </Modal>
    );
};

export default ModalEmailMarketing;
