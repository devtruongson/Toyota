type Props = { title: string; desciption: string; subtitle?: string };

const BannerPage = ({ title, desciption, subtitle }: Props) => {
    return (
        <div
            className={`w-full min-h-[200px] bg-[url('https://vinfastnewway.com.vn/wp-content/uploads/2019/08/head-bg2.jpg')] bg-cover bg-center flex flex-col justify-center items-center text-[white]`}
        >
            <h1 className="text-[36px] uppercase tracking-widest">{title}</h1>
            <p className="text-[28px] tracking-widest ">{subtitle}</p>
            <p className="text-[20px] tracking-widest">Home - {desciption}</p>
        </div>
    );
};

export default BannerPage;
