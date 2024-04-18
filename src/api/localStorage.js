const CART_LOCAL_NAME = 'cartsList'

export function addOrUpdateToCartNotUser(obj) {
    const list = JSON.parse(localStorage.getItem(CART_LOCAL_NAME)) || [];
    const addedList = list.find(item => item.id === obj.id) ?
        list.map(item => {
            if (item.id === obj.id) {
                return obj
            }
            return item
        })
        : [...list, obj];
    localStorage.setItem(CART_LOCAL_NAME, JSON.stringify(addedList));
}

export function removeCartNotUser(productId) {
    const list = JSON.parse(localStorage.getItem(CART_LOCAL_NAME)) || [];
    const addedList = list.filter(item => item.id != productId);
    localStorage.setItem(CART_LOCAL_NAME, JSON.stringify(addedList));
}

export function removeCartAllNotUser() {
    localStorage.removeItem(CART_LOCAL_NAME);
}