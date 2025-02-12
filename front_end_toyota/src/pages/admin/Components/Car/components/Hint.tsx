import { Button, message, Steps, theme } from 'antd';
import React, { useState } from 'react';

const steps = [
    {
        title: 'Meta Sub Title',
        content: (
            <StepHinCar
                des="Là phần chữ nhỏ bên dưới tiêu đề Vinfast Fadil"
                img="https://fstack.io.vn/wp-content/uploads/2025/02/Screenshot-from-2025-02-12-22-23-40.png"
            />
        ),
    },
    {
        title: 'Is Show Form',
        content: (
            <StepHinCar
                des="Hiện form để người dùng đăng ký nhận tin về chiếc xe"
                img="https://fstack.io.vn/wp-content/uploads/2025/02/Screenshot-from-2025-02-12-22-29-10.png"
            />
        ),
    },
    {
        title: 'Một Số Thông Số Còn Lại',
        content: (
            <StepHinCar
                des="Một Số Thông Số Còn Lại"
                img="https://fstack.io.vn/wp-content/uploads/2025/02/Screenshot-from-2025-02-12-22-31-41.png"
            />
        ),
    },
];

function StepHinCar({ des, img }: { des: string; img: string }) {
    return (
        <div>
            <p className="font-bold text-[#ee4d2d] pb-3">{des}</p>
            <img className="w-full" src={img} alt="" />
        </div>
    );
}

const Hint: React.FC = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const contentStyle: React.CSSProperties = {
        marginBottom: 10,
        padding: '10px 0',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    return (
        <div className="px-4 py-6">
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Hint;
