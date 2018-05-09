import gql from 'graphql-tag';

export default gql`
mutation addItemToCart($productId: String!,$quantity: String!){
    addItemToCart(productId: $productId, quantity: $quantity){
            id
            email
            name
            jwt
            cart{
                id
                created_at
                cartitems{
                    id
                    created_at
                    quantity
                    product{
                        id
                        name
                        price
                    }
                }
            } 
    }
}
`;
