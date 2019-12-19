import OpenLDAPConfig from '../OpenLDAPConfig';
import LDAPClientConfig from '../LDAPClientConfig';
import LDAPClientFactory from '../LDAPClientFactory';
import CacheableLDAPResource from '../CacheableLDAPResource';
import LdapClient from 'ldapjs-client';
import * as path from 'path';

const fs = require('fs');
const ldapConfPath = path.resolve('src/__tests__/ldap.conf');

const ldapConfig = new OpenLDAPConfig(ldapConfPath);
const ldapClientFactory = new LDAPClientFactory();

const expected = 'mysql://localhost/testapp';

test('getInstance', async () => {
    const ldapClient = ldapClientFactory.getLDAPClient(new LDAPClientConfig(ldapConfig));
    let ldapResource = await CacheableLDAPResource.getInstance(ldapClient);

    const resourceUrl = await ldapResource.lookup('ru.bystrobank.apps.testapp.db','c=ru');

    expect(resourceUrl).toBe(expected);
    ldapClientFactory.close();
});
