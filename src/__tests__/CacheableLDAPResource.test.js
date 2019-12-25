import OpenLDAPConfig from '../OpenLDAPConfig';
import LDAPClientConfig from '../LDAPClientConfig';
import LDAPClientFactory from '../LDAPClientFactory';
import CacheableLDAPResource from '../CacheableLDAPResource';
import LdapClient from 'ldapjs-client';
import * as path from 'path';

const fs = require('fs');
const ldapConfPath = path.resolve('src/__tests__/ldap.conf');

const ldapConfig = new OpenLDAPConfig(fs.readFileSync(ldapConfPath, 'utf8'));
const ldapClientFactory = new LDAPClientFactory();

const expected = 'mysql://localhost/testapp';

test('getInstance', async () => {
    const ldapClient = ldapClientFactory.getLDAPClient(new LDAPClientConfig(ldapConfig));
    let ldapResource = await CacheableLDAPResource.getInstance(ldapClient);

    let resourceUrl = await ldapResource.lookup('ru.bystrobank.apps.testapp.db','c=ru');

    expect(resourceUrl).toBe(expected);

    expect(ldapResource.ldapResource.lookupCount).toBe(1);

    resourceUrl = await ldapResource.lookup('ru.bystrobank.apps.testapp.db','c=ru');

    expect(resourceUrl).toBe(expected);

    // second call should be cached
    expect(ldapResource.ldapResource.lookupCount).toBe(1);

    resourceUrl = await ldapResource.lookup('ru.bystrobank.apps.bailverification.db','c=ru');

    expect(ldapResource.ldapResource.lookupCount).toBe(2);

    ldapClientFactory.close();
});
