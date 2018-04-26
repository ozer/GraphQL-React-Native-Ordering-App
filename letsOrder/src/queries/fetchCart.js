import gql from 'graphql-tag';

export default gql`
{                 
    user{
        id
        email
        jwt
        __typename
        cart{
            id
            created_at
            cartitems{
                id
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
