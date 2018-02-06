import gql from 'graphql-tag';

export default gql`
mutation addItem($productId : String!,$quantity : Number!, $cartId : String){
    fillCart(productId : $productId, quantity : $quantity, cartId : $cartId){
        id
    }
}
`