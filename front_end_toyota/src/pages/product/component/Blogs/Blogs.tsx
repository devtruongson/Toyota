import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { IBlog } from '../../../../utils/interface';
import { Link, useLocation } from 'react-router-dom';
import { getAllBlogs } from '../../../../services/blogService';
import { HttpStatusCode } from 'axios';
import BannerPage from '../common/BannerPage/BannerPage';
import CardBlog from '../CardBlog/CardBlog';
import { routes } from '../../../../constants/routes';
import { formatLink } from '../../../../helpers/formatLink';

const Blogs = () => {
    const cates = useAppSelector((state) => state.cates);
    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const pathname = useLocation().pathname;

    const currentCate = useMemo(() => cates.find((item) => pathname.includes(item.path)), [pathname, cates]);

    useEffect(() => {
        const fetch = async () => {
            if (currentCate?.id) {
                const res = await getAllBlogs(1, 10, currentCate.id);
                if (res.code === HttpStatusCode.Ok) {
                    setBlogs(res.data.items);
                }
            }
        };

        if (currentCate) {
            fetch();
        }
    }, [currentCate]);

    return (
        <div className="w-full bg-[#f4f8fa] min-h-[100vh]">
            <BannerPage title={currentCate?.title || ''} desciption={currentCate?.title || ''} />

            <div className={`py-[100px] flex justify-center`}>
                <div className="w-[70%] grid grid-cols-3 gap-[20px] items-stretch">
                    {blogs &&
                        blogs.map((blog) => {
                            return (
                                <Link
                                    to={`${routes.blogDetail}/${formatLink(blog.title)}`}
                                    key={blog.id}
                                    className="h-full flex"
                                >
                                    <CardBlog
                                        id={blog.id}
                                        img={blog.thumbnail}
                                        title={blog.title}
                                        description={blog.meta_description}
                                        isVertical
                                        badge={currentCate?.title}
                                        // className="h-full flex flex-col"
                                    />
                                </Link>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default Blogs;
