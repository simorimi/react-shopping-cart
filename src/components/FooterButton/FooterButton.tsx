import * as Styled from './style';

import { useLocation, useNavigate } from 'react-router-dom';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  cartItemIdsSelector,
  cartItemsCountSelector,
  couponIdsSelector,
  isAllCartItemSelectedSelectorFamily,
  isAllCouponSelectedSelectorFamily,
  isSomeCartItemSelectedSelector,
  selectedCartItemIdsSelector,
} from '../../recoil/selectors';
import { cartItemsState } from '../../recoil/atoms';

import { fetchPostingOrders } from '../../api/orders';
import { fetchGettingCartItems } from '../../api/shoppingCart';
import {
  generateButtonLabel,
  generateNextPageNavigatorPath,
} from '../../utils/utils';

import CONDITION from '../../constants/Condition';

const FooterButton = () => {
  const setCartItems = useSetRecoilState(cartItemsState);
  const cartItemIds = useRecoilValue(cartItemIdsSelector);
  const cartItemsCount = useRecoilValue(cartItemsCountSelector);
  const isSomeCartItemSelected = useRecoilValue(isSomeCartItemSelectedSelector);
  const selectedCartItemIds = useRecoilValue(selectedCartItemIdsSelector);
  const setIsAllCatItemsSelected = useSetRecoilState(
    isAllCartItemSelectedSelectorFamily(cartItemIds),
  );
  const couponIds = useRecoilValue(couponIdsSelector);
  const setIsAllCouponSelected = useSetRecoilState(
    isAllCouponSelectedSelectorFamily(couponIds),
  );

  const hasSomeCartItem = !!cartItemsCount;
  const isOrderable = hasSomeCartItem && isSomeCartItemSelected;

  const page = useLocation().pathname;
  const navigator = useNavigate();

  const resetShoppingCartPage = async () => {
    setCartItems(await fetchGettingCartItems());
    setIsAllCatItemsSelected(true);
    setIsAllCouponSelected(false);
  };

  const handleOnClick = () => {
    if (page === CONDITION.orderConfirmationPage) {
      fetchPostingOrders(selectedCartItemIds);
    }

    if (page === CONDITION.paymentConfirmationPage) {
      resetShoppingCartPage();
    }

    navigator(generateNextPageNavigatorPath(page));
  };

  return (
    <Styled.FooterButton
      onClick={handleOnClick}
      $isOrderable={isOrderable}
      disabled={!isOrderable}
    >
      {generateButtonLabel(page)}
    </Styled.FooterButton>
  );
};

export default FooterButton;
