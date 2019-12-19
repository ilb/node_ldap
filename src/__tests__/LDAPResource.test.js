import OpenLDAPConfig from '../OpenLDAPConfig';
import LDAPClientConfig from '../LDAPClientConfig';
import LDAPClientFactory from '../LDAPClientFactory';
import LDAPResource from '../LDAPResource';
import LdapClient from 'ldapjs-client';
import * as path from 'path';

const fs = require('fs');
const ldapConfPath = path.resolve('src/__tests__/ldap.conf');

const ldapConfig = new OpenLDAPConfig(ldapConfPath);
const ldapClientFactory = new LDAPClientFactory();


const expected = 'mysql://localhost/testapp';

test('search', async () => {
    const ldapClient = ldapClientFactory.getLDAPClient(new LDAPClientConfig(ldapConfig));
    const ldapResource = new LDAPResource(ldapClient);
    const resourceUrl = await ldapResource.lookup('ru.bystrobank.apps.testapp.db','c=ru');
    expect(resourceUrl).toBe(expected);

    ldapClientFactory.close();
});

