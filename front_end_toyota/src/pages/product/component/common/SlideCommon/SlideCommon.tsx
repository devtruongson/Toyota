import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Props = {
    listImage: string[];
};

const SlideCommon = ({ listImage }: Props) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        adaptiveHeight: true,
    };

    return (
        <div className="w-full">
            <Slider {...settings}>
                {listImage.map((item, index) => (
                    <div key={index} className="w-full">
                        <img src={item} alt={`Slide ${index}`} className="w-full h-auto object-cover" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SlideCommon;
