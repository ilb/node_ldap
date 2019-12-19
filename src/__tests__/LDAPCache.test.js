import OpenLDAPConfig from '../OpenLDAPConfig';
import LDAPClientConfig from '../LDAPClientConfig';
import LDAPClientFactory from '../LDAPClientFactory';
import LDAPCache from '../LDAPCache';
import LdapClient from 'ldapjs-client';
import * as path from 'path';

const fs = require('fs');
const ldapConfPath = path.resolve('src/__tests__/ldap.conf');

const ldapConfig = new OpenLDAPConfig(ldapConfPath);
const ldapClientFactory = new LDAPClientFactory();

test('getInstance', async () => {
    const ldapClient = ldapClientFactory.getLDAPClient(new LDAPClientConfig(ldapConfig));
    let ldapCache = await LDAPCache.getInstance(ldapClient);
    ldapCache.set("key","value1");
    ldapCache = await LDAPCache.getInstance(ldapClient);
    expect(ldapCache.get("key")).toBe("value1");
    ldapClientFactory.close();
});
