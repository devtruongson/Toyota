import { useNavigate } from 'react-router-dom';
import { defaultImageCar } from '../../../../../constants';
import { ICar } from '../../../../../utils/interface';
import { formatLink } from '../../../../../helpers/formatLink';
import { routes } from '../../../../../constants/routes';
import { useAppDispatch } from '../../../../../app/hooks';
import { saveCurrentcar } from '../../../../../app/slices/appSlice';

type Props = {
    car: ICar;
};

const CardCar = ({ car }: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleChooseCar = () => {
        dispatch(saveCurrentcar(car.id));
        navigate(`${routes.products}/${formatLink(car.title)}`);
    };

    return (
        <div
            className="hover:text-[red] bg-[white] pb-[20px] cursor-pointer object-cover overflow-hidden shadow rounded-[4px]"
            onClick={() => handleChooseCar()}
        >
            <div className="overflow-hidden">
                <img
                    src={defaultImageCar}
                    alt="thumbnail"
                    className="transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
            </div>
            <p className="text-center text-[28px]">{car.title}</p>
        </div>
    );
};

export default CardCar;
