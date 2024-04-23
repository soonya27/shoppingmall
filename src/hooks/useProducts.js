import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addBookmarkByUser, addNewProduct, getProduct, removeFromBookmark } from '../api/firebase';


export default function useProducts(uid) {
    const queryClient = useQueryClient();

    const productQuery = useQuery({
        queryKey: ['products', uid || ''],
        queryFn: async () => getProduct(uid),
    });

    const addProduct = useMutation(
        {
            mutationFn: ({ form, url }) => addNewProduct(form, { defaultImageUrl: url.defaultImageUrl, hoverImageUrl: url.hoverImageUrl }),
            onSuccess: () => queryClient.invalidateQueries(['products', uid])
        }
    );

    const addBookmark = useMutation(
        {
            mutationFn: ({ isBookmark, product }) => {
                return isBookmark ? removeFromBookmark(uid, product.id)
                    : addBookmarkByUser({ user: uid, product });
            },
            onSuccess: () => queryClient.invalidateQueries(['products', uid])
        }
    );


    return { productQuery, addProduct, addBookmark }
}