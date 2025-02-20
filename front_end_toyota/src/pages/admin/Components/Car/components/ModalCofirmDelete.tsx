import { Modal } from 'antd';
import { useState } from 'react';

type Props = {
    onDelete: () => void;
    title: string;
};

const ModalCofirmDelete = ({ onDelete, title }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        onDelete();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button
                className="text-red-500 border-[1px] border-solid border-red-500 rounded-[8px] px-[8px] py-[4px] hover:opacity-[0.7]"
                onClick={showModal}
            >
                Xóa
            </button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc muốn xóa {title} ?</p>
            </Modal>
        </>
    );
};

export default ModalCofirmDelete;
