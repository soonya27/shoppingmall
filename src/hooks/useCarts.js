import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateToCart, getCartProduct, removeCartAll, removeFromCart } from '../api/firebase';

export default function useCarts(uid) {
    const queryClient = useQueryClient();

    const cartQuery = useQuery({
        queryKey: ['carts', uid || ''],
        queryFn: async () => getCartProduct(uid),
        enabled: !!uid
    });

    const addOrUpdateToItem = useMutation({
        mutationFn: ({ id, size, itemNum, user, product }) => addOrUpdateToCart({ id, size, itemNum, user, product }),
        onSuccess: () => queryClient.invalidateQueries(['carts', uid])
    });

    const removeItem = useMutation({
        mutationFn: ({ uid, id }) => removeFromCart(uid, id),
        onSuccess: () => queryClient.invalidateQueries(['carts', uid])
    });

    const removeAllItem = useMutation({
        mutationFn: () => removeCartAll(uid),
        onSuccess: () => queryClient.invalidateQueries(['carts', uid])
    });


    return { cartQuery, addOrUpdateToItem, removeItem, removeAllItem }
}