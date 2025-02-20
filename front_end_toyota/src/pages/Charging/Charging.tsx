import { List } from 'antd';
import { HttpStatusCode } from 'axios';
import React, { useEffect, useState } from 'react';
import { getAllChargingService } from '../../services/chargingService';
import { ICharging } from '../../utils/interface';

const ChargingStationsPage: React.FC = () => {
    const [selectedStation, setSelectedStation] = useState<ICharging | null>(null);
    const [selectedStationArr, setSelectedStationArr] = useState<ICharging[]>([]);

    const handleStationClick = (station: ICharging) => {
        setSelectedStation(station);
    };

    useEffect(() => {
        const fetch = async () => {
            const res = await getAllChargingService();
            if (res.code === HttpStatusCode.Ok) {
                setSelectedStationArr(res.data);
            }
        };
        fetch();
    }, []);

    useEffect(() => {
        setSelectedStation(selectedStationArr[0]);
    }, [selectedStationArr]);

    return (
        <div className="container mx-auto py-10">
            <div className="flex h-screen">
                <div className="w-1/3 overflow-y-auto p-4">
                    <h2 className="text-xl font-bold mb-4">Danh sách trạm sạc</h2>
                    <List
                        itemLayout="horizontal"
                        dataSource={selectedStationArr}
                        renderItem={(station) => (
                            <List.Item
                                key={station.id}
                                onClick={() => handleStationClick(station)}
                                className={
                                    station.id === selectedStation?.id
                                        ? 'cursor-pointer hover:bg-gray-100 p-2 rounded px-4 bg-[#eee] my-2'
                                        : 'cursor-pointer hover:bg-gray-100 p-2 rounded px-4 my-2'
                                }
                            >
                                <List.Item.Meta title={station.name} className="px-4" description={station.power_kw} />
                            </List.Item>
                        )}
                    />
                </div>
                <div className="w-2/3">
                    {selectedStation ? (
                        <iframe
                            title="Charging Station Location"
                            className="w-[100%] h-[600px] rounded-2xl overflow-hidden"
                            src={selectedStation.location}
                            height="450"
                            loading="lazy"
                        ></iframe>
                    ) : (
                        <div className="flex items-center justify-center h-full">Vui lòng chọn trạm sạc</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChargingStationsPage;
