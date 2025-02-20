import { Route, Routes } from 'react-router-dom';
import Car from '../Components/Car/Car';
import Charging from '../Components/Charging/Charging';
import Form from '../Components/Form/Form';
import User from '../Components/User/User';

export default function RouterDashBoard() {
    return (
        <>
            <Routes>
                <Route path="user" element={<User />} />
                <Route path="car" element={<Car />} />
                <Route path="form" element={<Form />} />
                <Route path="charging" element={<Charging />} />
            </Routes>
        </>
    );
}
