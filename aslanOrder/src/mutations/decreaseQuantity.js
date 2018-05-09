import gql from 'graphql-tag';

export default gql`
mutation decreaseQuantityByOne($productId: String!){
    decreaseQuantityByOne(productId: $productId){
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