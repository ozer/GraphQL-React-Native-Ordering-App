import gql from 'graphql-tag';

export default gql`
mutation ($quantity : String!,$productId : String!){
    fillCart(quantity : $quantity, productId : $productId){
        id
    }
}
`