import gql from 'graphql-tag';

export default gql`
mutation SignIn($email : String!,$password : String!){
    signIn(email : $email, password : $password){
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

`
