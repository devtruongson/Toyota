type Props = {
    label: string;
};

const LabelCustom = ({ label }: Props) => {
    return <div className="bg-gradient-to-r from-blue-600 to-white text-white font-bold p-3 uppercase">{label}</div>;
};

export default LabelCustom;
