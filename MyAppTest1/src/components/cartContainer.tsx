import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { StateProps, DispatchProps, ICartItem } from '../interfaces'
import * as CartActions from '../actions/add_to_cart'
import Shelf from './shelf';
type HomeProps = StateProps & DispatchProps;

function mapStateToProps(state: StateProps) {
  const newObject = state.cart.map((item:ICartItem, idx:number)=>{
      return {id: item.id, message: item.message };
  });
  return newObject;
}

function mapDispatchToProps(dispatch: any) {
  return {
    action: bindActionCreators(CartActions.AddToCart, dispatch)
  }
}

class Cart extends React.Component<HomeProps, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const cartItems = this.props.cart.map((item: any, idx: number) => {
      return <li key={idx}>{item}</li>
    });
    return (
      <div className="Cart">
        <Shelf addItem={this.props.AddToCart} />
        <h2>Items in Cart</h2>
        <ol>
          {cartItems}
        </ol>
      </div>
    );
  }
}

export default connect<StateProps, any, any>(mapStateToProps, mapDispatchToProps)(Cart);
