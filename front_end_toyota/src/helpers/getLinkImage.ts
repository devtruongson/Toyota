import processENV from '../configs/process';

export const getLinkImage = (url: string) => processENV.VITE_URL_BACKEND + url;
