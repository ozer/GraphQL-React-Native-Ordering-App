import { Mutation, compose } from 'react-apollo';
import AddItemToCart from './AddItemToCart';

const FillCart = ({}) => (
  <Mutation
    mutation={AddItemToCart}
  />
);

export default compose(FillCart);
