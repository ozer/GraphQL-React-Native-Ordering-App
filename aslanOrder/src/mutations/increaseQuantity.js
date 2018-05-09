import gql from 'graphql-tag';

export default gql`
mutation increaseQuantityByOne($productId: String!){
    increaseQuantityByOne(productId: $productId){
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