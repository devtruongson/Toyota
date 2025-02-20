import { useEffect, useState } from 'react';
import { getDetailBlogService } from '../../../../services/blogService';
import { useAppSelector } from '../../../../app/hooks';
import { HttpStatusCode } from 'axios';
import { IBlog } from '../../../../utils/interface';
import processENV from '../../../../configs/process';
import ReactMarkdown from 'react-markdown';

const BlogDetail = () => {
    const [post, setPost] = useState<IBlog>();
    const { currentBlog } = useAppSelector((state) => state);

    useEffect(() => {
        if (currentBlog) {
            const fetch = async () => {
                const res = await getDetailBlogService(currentBlog);
                if (res.code === HttpStatusCode.Ok) {
                    setPost(res.data);
                }
            };
            fetch();
        }
    }, [currentBlog]);
    console.log(post?.thumbnail);
    return (
        <div className="p-4 container mx-auto">
            <div className="mb-4">
                <p className="text-gray-600">SEO Meta: {post?.meta_description}</p>
            </div>
            <div className="mb-4">
                <img
                    src={`${processENV.VITE_URL_BACKEND}${post?.thumbnail}`}
                    alt={post?.title}
                    className="w-full rounded h-[600px] object-cover"
                />
            </div>

            <div className="mb-4">
                <strong>Nội dung bài viết</strong>
                <p className="render_blog">
                    <ReactMarkdown>{post?.content}</ReactMarkdown>
                </p>
            </div>
            <div className="flex justify-between items-center">
                <span className="font-semibold">Danh mục: {post?.cate_date?.title}</span>
                <span
                    className={`px-2 py-1 rounded ${
                        post?.is_active ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                >
                    Trạng thái: {post?.is_active ? 'Kích hoạt' : 'Không kích hoạt'}
                </span>
            </div>
        </div>
    );
};

export default BlogDetail;
