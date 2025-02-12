import { Modal } from 'antd';
import { useState } from 'react';
import TabCar from './TabCar';
import Hint from './components/Hint';

export default function Car() {
    const [isShowModal, setIsShowModal] = useState(false);

    return (
        <div>
            <TabCar />
            <div
                onClick={() => setIsShowModal(true)}
                className="fixed right-[20px] bottom-[30px] bg-[rgba(0,0,0,0.7)] p-2 rounded-[50%] cursor-pointer hover:opacity-[0.8]"
            >
                <img
                    className="w-[40px] h-[40px]"
                    src="https://png.pngtree.com/png-vector/20231201/ourmid/pngtree-hint-icon-electricity-png-image_10803584.png"
                    alt=""
                />
            </div>
            <Modal width="70vw" open={isShowModal} footer={null} onCancel={() => setIsShowModal(false)}>
                <Hint />
            </Modal>
        </div>
    );
}
