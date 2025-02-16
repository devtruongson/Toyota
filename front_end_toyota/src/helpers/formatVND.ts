export const formatVND = (value: string) => {
    if (!Number(value)) return '0 VNĐ';
    value = value.split('').reverse().join('');
    value = value.replace(/(\d{3})/g, '$1.');
    if (value.endsWith('.')) {
        value = value.slice(0, -1);
    }
    value = value.split('').reverse().join('');
    return `${value} VNĐ`;
};
