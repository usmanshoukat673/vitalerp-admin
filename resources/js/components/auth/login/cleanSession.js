import { connect } from 'react-redux';
import { clearUser, clearToken, clearPWDRotation } from '../../../actions';
import { deleteStore } from '../../../store/localStorage';

const cleanSession = ({ clearUser, clearToken, clearPWDRotation }) => {
    clearUser();
    clearToken();
    clearPWDRotation();
    deleteStore();
}

export default connect(null, { clearUser, clearToken, clearPWDRotation })(cleanSession);
