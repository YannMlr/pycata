import React from 'react';
import { shallow } from 'enzyme';

import { getLoginUrl } from 'app/shared/util/url-utils';
import { NavDropdown } from 'app/shared/layout/menus/menu-components';
import { AccountMenu } from 'app/shared/layout/menus';
export SPRING_SECURITY_OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER_URI="https://dev-491348.okta.com/oauth2/default"
export SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_ID="0oan1gi9gaPygwl2h4x5"
export SPRING_SECURITY_OAUTH2_CLIENT_REGISTRATION_OIDC_CLIENT_SECRET="5vgl5PJLI_sK23I3On5zSgi-1bpwa03bmlN1tYIG"

describe('AccountMenu', () => {
  let mountedWrapper;

  const authenticatedWrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(<AccountMenu isAuthenticated />);
    }
    return mountedWrapper;
  };
  const guestWrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(<AccountMenu />);
    }
    return mountedWrapper;
  };

  beforeEach(() => {
    mountedWrapper = undefined;
  });

  // All tests will go here

  it('Renders a authenticated AccountMenu component', () => {
    const dropdown = authenticatedWrapper().find(NavDropdown);
    expect(dropdown).toHaveLength(1);
    expect(dropdown.find({ to: '/login' })).toHaveLength(0);
    expect(dropdown.find({ to: '/logout' })).toHaveLength(1);
  });

  it('Renders a guest AccountMenu component', () => {
    const dropdown = guestWrapper().find(NavDropdown);
    expect(dropdown).toHaveLength(1);
    expect(dropdown.find({ href: getLoginUrl() })).toHaveLength(1);
    expect(dropdown.find({ to: '/logout' })).toHaveLength(0);
  });
});
