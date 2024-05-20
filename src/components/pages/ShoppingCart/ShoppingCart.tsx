import * as Styled from './style';

import Header from '../../Header/Header';
import ItemList from '../../ItemList/ItemList';
import OrderButton from '../../OrderButton/OrderButton';
import Title from '../../Title/Title';
import TotalPaymentInfo from '../../TotalPaymentInfo/TotalPaymentInfo';

import { useRecoilValue } from 'recoil';
import { fetchedCartItemsState } from '../../../recoil/cartItems';
import { selectedSomeCartItemState } from '../../../recoil/selectedCardItems';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const navigator = useNavigate();

  const cartItems = useRecoilValue(fetchedCartItemsState);

  const hasSomeCartItem = !!cartItems.length;
  const isSomeCartItemSelected = useRecoilValue(selectedSomeCartItemState);

  const isOrderable = hasSomeCartItem && isSomeCartItemSelected;

  return (
    <Styled.ShoppingCart>
      <Header children="SHOP" />

      <Styled.Container>
        {hasSomeCartItem && (
          <>
            <Title
              title="장바구니"
              caption={`현재 ${cartItems.length}종류의 상품이 담겨있습니다.`}
            />
            <ItemList />
            <TotalPaymentInfo />
          </>
        )}

        {!hasSomeCartItem && (
          <>
            <Title title="장바구니" />
            <Styled.Content>
              <Styled.EmptyCartMessage>
                장바구니에 담은 상품이 없습니다.
              </Styled.EmptyCartMessage>
            </Styled.Content>
          </>
        )}
      </Styled.Container>

      <OrderButton
        onClick={() => navigator('/orderConfirmation')}
        children="주문 확인"
        isOrderable={isOrderable}
      />
    </Styled.ShoppingCart>
  );
};

export default ShoppingCart;
