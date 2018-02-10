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
