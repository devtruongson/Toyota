type Props = {
    title: string;
};

const Installment = ({ title }: Props) => {
    return (
        <div className="w-full p-[8px] bg-white shadow rounded-[4px]">
            <p className="text-[20px] uppercase mb-[12px]">TRẢ GÓP {title}</p>

            <p className="px-[28px] mb-[20px]">
                Mua xe {title} trả góp là hình thức mua xe mà quý khách chỉ cần trả trước một phần tiền, phần còn lại sẽ
                vay ngân hàng và trả góp định kỳ cho ngân hàng.
            </p>
            <div className="flex justify-between items-center mb-[20px] px-[10px]">
                <div className="bg-[#f9f9f9] p-[8px] rounded-[4px] flex flex-col items-center w-[30%]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-[60px] text-[red]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    <p>LÃI SUẤT HẤP DẪN</p>
                </div>

                <div className="bg-[#f9f9f9] p-[8px] rounded-[4px] flex flex-col items-center w-[30%]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-[60px] text-[red]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    <p>VAY TỐI ĐA</p>
                </div>
                <div className="bg-[#f9f9f9] p-[8px] rounded-[4px] flex flex-col items-center w-[30%]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-[60px] text-[red]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                    <p>THỜI GIAN VAY LINH ĐỘNG</p>
                </div>
            </div>

            <p className="text-center">(Liên hệ ngay VinFastNewway để được tư vấn mua xe {title} trả góp)</p>
        </div>
    );
};

export default Installment;
