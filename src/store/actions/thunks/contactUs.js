import { Axios } from '../../../core/utils/axios';
import api from '../../../core/utils/api';

export const postContactForm = (form) => async () => {
    try {
        const { data } = await Axios.post(`${api.baseUrl}${api.contactUs}`, form);

        return Promise.resolve(data);
    } catch (err) {
        return Promise.reject(err);
    }
};