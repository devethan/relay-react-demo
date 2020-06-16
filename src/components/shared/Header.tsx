import type {
  Header_Query,
  Header_QueryResponse,
} from './__generated__/Header_Query.graphql';
import React, { ReactElement } from 'react';

import {
  graphql,
  preloadQuery,
  usePreloadedQuery,
  useRelayEnvironment,
} from 'react-relay/hooks';
import { DrawerNavigationProps } from '../navigation/MainStackNavigator';
import HeaderRightWidget from '../shared/HeaderRightWidget';
import styled from 'styled-components/native';

interface Props {
  navigation: DrawerNavigationProps<'Home' | 'Temp'>;
}

const Container = styled.View`
  position: absolute;
  top: 0;
  width: 100%;
  height: 60px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: ${({ theme }): string => theme.background};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MenuContainer = styled.TouchableOpacity`
  padding-left: 20px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Menu = styled.Text`
  color: ${({ theme }): string => theme.fontColor};
  font-size: 18px;
  font-weight: 600;
`;

const HeaderQuery = graphql`
  query Header_Query {
    me {
      ...HeaderRightWidget_user
    }
  }
`;

const Header = (props: Props): ReactElement => {
  const environment = useRelayEnvironment();
  const queryResult = preloadQuery<Header_Query>(
    environment,
    HeaderQuery,
    {},
    { fetchPolicy: 'store-and-network' },
  );
  const { me }: Header_QueryResponse = usePreloadedQuery<Header_Query>(
    HeaderQuery,
    queryResult,
  );

  console.log('Header rendering', me);

  return (
    <Container>
      <React.Suspense fallback={'Header pending...'}>
        <MenuContainer onPress={(): void => props.navigation.toggleDrawer()}>
          <Menu>Menu</Menu>
        </MenuContainer>
        <HeaderRightWidget user={me} />
      </React.Suspense>
    </Container>
  );
};

export default Header;
