import { Button, Input, Modal, Select, Switch } from 'antd';
import { HttpStatusCode } from 'axios';
import MarkdownIt from 'markdown-it';
import React, { useEffect, useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Swal from 'sweetalert2';
import processENV from '../../../../../configs/process';
import { updateBlog } from '../../../../../services/blogService';
import { getAllCateActive } from '../../../../../services/cateService';
import { uploadFileService } from '../../../../../services/uploadService';
import { ICate } from '../../../../../utils/interface';
import { IBlog } from './../../../../../utils/interface';

const mdParser = new MarkdownIt(/* Markdown-it options */);

const { TextArea } = Input;

interface PostDetailModalProps {
    visible: boolean;
    onCancel: () => void;
    post: IBlog;
    _fetch: () => void;
}

const ModalUpdateBlog = ({ visible, onCancel, post, _fetch }: PostDetailModalProps) => {
    return (
        <Modal title={post.title} open={visible} onCancel={onCancel} footer={null} width={1200}>
            <UpdateBlog data={post} _fetch={_fetch} onCancel={onCancel} />
        </Modal>
    );
};

export default ModalUpdateBlog;

const UpdateBlog = ({ data, _fetch, onCancel }: { data: IBlog; _fetch: () => void; onCancel: () => void }) => {
    const [blogData, setBlogData] = useState<{
        thumbnail: string;
        title: string;
        meta_description: string;
        content: string;
        is_active: boolean;
        cate_id: null | number;
    }>({
        thumbnail: data.thumbnail,
        title: data.title,
        meta_description: data.meta_description,
        content: data.content,
        is_active: data.is_active,
        cate_id: data?.cate_id ? data.cate_id : 0,
    });

    console.log(data);
    const [allCate, setAllCate] = useState<ICate[]>([]);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    const fetchDataCate = async () => {
        try {
            const res = await getAllCateActive();
            if (res.code === HttpStatusCode.Ok) {
                setAllCate(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDataCate();
    }, []);

    useEffect(() => {
        if (!thumbnailFile) return;

        const _fetch = async () => {
            try {
                const res = await uploadFileService({
                    file: thumbnailFile,
                });

                if (res.code === HttpStatusCode.Ok) {
                    setBlogData((prev) => {
                        return {
                            ...prev,
                            thumbnail: res.data.url_public,
                        };
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, [thumbnailFile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBlogData({ ...blogData, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (value: number) => {
        setBlogData({ ...blogData, cate_id: value });
    };

    const handleSwitchChange = (checked: boolean) => {
        setBlogData({ ...blogData, is_active: checked });
    };

    const handleSubmit = async () => {
        if (!blogData.title || !blogData.meta_description || !blogData.content || !blogData.cate_id) {
            Swal.fire({
                icon: 'error',
                text: 'Vui lòng nhập đầy đủ thông tin!',
            });
            return;
        }
        try {
            const res = await updateBlog({
                thumbnail: blogData.thumbnail,
                title: blogData.title,
                meta_description: blogData.meta_description,
                content: blogData.content,
                is_active: blogData.is_active,
                cate_id: blogData?.cate_id,
                id: data.id,
            });
            if (res.code === HttpStatusCode.Ok) {
                Swal.fire({
                    icon: 'success',
                    text: 'Cập nhật thành công bài viết!',
                });
                onCancel();
                _fetch();
            }
        } catch (error) {
            console.log(error);
        }
    };

    function handleEditorChange({ text }: { text: string }) {
        setBlogData((prev) => {
            return {
                ...prev,
                content: text,
            };
        });
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

    return (
        <div className="mx-auto p-6 bg-white rounded-lg px-10 mt-10">
            <h2 className="text-2xl font-semibold mb-6">📝 Tạo Bài Viết Mới</h2>
            {/* Ảnh Thumbnail */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Ảnh Thumbnail:</label>
                <Input
                    type="file"
                    placeholder="Nhập URL ảnh..."
                    name="thumbnail"
                    onChange={(e) => {
                        if (e.target.files) {
                            setThumbnailFile(e.target.files[0]);
                        }
                    }}
                    className="mb-4"
                />
                {blogData.thumbnail && (
                    <a target="_blank" className="mt-2 block" href={processENV.VITE_URL_BACKEND + blogData.thumbnail}>
                        Xem ảnh đã upload
                    </a>
                )}
            </div>
            {/* Tiêu đề */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Tiêu đề:</label>
                <Input
                    placeholder="Nhập tiêu đề bài viết..."
                    name="title"
                    value={blogData.title}
                    onChange={handleChange}
                    className="mb-4"
                />
            </div>
            {/* Mô tả */}{' '}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Mô tả ngắn:</label>
                <TextArea
                    placeholder="Nhập mô tả ngắn..."
                    name="meta_description"
                    value={blogData.meta_description}
                    onChange={handleChange}
                    rows={3}
                    className="mb-4"
                />
            </div>
            {/* Nội dung bài viết */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Nội dung bài viết:</label>
                <MdEditor
                    value={blogData.content}
                    onImageUpload={handleUploadImage}
                    style={{ height: '500px' }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange}
                />
            </div>
            {/* Chọn danh mục */}{' '}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Danh mục:</label>
                <Select
                    value={blogData.cate_id}
                    placeholder="Chọn danh mục"
                    onChange={handleCategoryChange}
                    options={allCate.map((item) => {
                        return {
                            value: item.id,
                            label: item.title,
                        };
                    })}
                    className="w-full mb-4"
                />
            </div>
            {/* Trạng thái kích hoạt */}{' '}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-gray-700 font-medium">Trạng thái kích hoạt:</span>
                    <Switch checked={blogData.is_active} onChange={handleSwitchChange} />
                </div>
            </div>
            {/* Nút tạo bài viết */}
            <Button type="primary" block onClick={handleSubmit}>
                Sửa bài viết
            </Button>
        </div>
    );
};
