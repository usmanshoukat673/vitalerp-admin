import { NotificationManager } from 'react-notifications';
import { deleteStore } from '../store/localStorage';

const errorHandler = (e) => {
    switch (e.response.status) {
        case 401:
            NotificationManager.error('Session Expired.', 'Error');
            deleteStore();
            break;
        case 500:
            NotificationManager.error('Server Error, Please contact customer support.', 'Error');
            break;

        default:
            break;
    }
}

export default errorHandler;
