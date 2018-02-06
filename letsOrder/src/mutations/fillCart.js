import gql from 'graphql-tag';

export default gql`
mutation FillCart($quantity : Number!){
    fillCart(quantity : $quantity){
        name
    }
}
`