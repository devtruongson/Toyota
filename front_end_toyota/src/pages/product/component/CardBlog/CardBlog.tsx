type Props = {
    badge?: string;
    isVertical?: boolean;
    img: string;
    title: string;
    description: string;
};

const CardBlog = ({ badge, isVertical = false, title, description, img }: Props) => {
    return (
        <div
            className={`w-[${isVertical ? '400px' : '800px'}] flex ${
                isVertical ? 'flex-col' : ''
            } justify-start shadow items-stretch relative`}
        >
            {badge ? (
                <div className="py-[8px] px-[28px] absolute top-[20px] left-[20px] bg-[#818a91] rounded-[100px] hover:bg-[red]">
                    <p className="uppercase text-white ">{badge}</p>
                </div>
            ) : null}
            <img src={img} alt="image" className={`${isVertical ? 'w-full' : 'w-[50%]'} object-cover`} />
            <div className="py-[10px] px-[20px] ">
                <p className="text-[20px] mb-[10px]">{title}</p>
                <p className="line-clamp-2 overflow-hidden text-ellipsis text-[20px] opacity-[0.4]">{description}</p>
            </div>
        </div>
    );
};

export default CardBlog;
