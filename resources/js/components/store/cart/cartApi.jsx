import axiosInstance from "../../../api/api";

export const cancelSubscription = (subscriptionId) => {

    if (!_.isEmpty(subscriptionId)) {
        axiosInstance.post(`/api/user/marketplace/stripe/cancel-subscription`, {
            subscriptionId
        }).then(e => {
        }).catch(err => {
        });
    }

}

export const addSubscriptionItem = (subscriptionId, price) => {

    if (!_.isEmpty(subscriptionId)) {
        axiosInstance.post(`/api/user/marketplace/stripe/add-subscription-item`, {
            subscriptionId,
            price
        }).then(e => {
        }).catch(err => {
        });
    }

}