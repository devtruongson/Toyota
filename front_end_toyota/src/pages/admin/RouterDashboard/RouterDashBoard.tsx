import { Route, Routes } from 'react-router-dom';
import Car from '../Components/Car/Car';
import User from '../Components/User/User';

export default function RouterDashBoard() {
    return (
        <>
            <Routes>
                <Route path="user" element={<User />} />
                <Route path="car" element={<Car />} />
                <Route path="order" element={<>asdas 3</>} />
            </Routes>
        </>
    );
}
