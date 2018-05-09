import gql from 'graphql-tag';

export default gql`
{
    categories{
        id
        name
        products{
            id
            name
            price
            quantity
            created_at
        }
    }
}`;
