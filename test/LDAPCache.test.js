import { readFileSync } from 'fs';
import OpenLDAPConfig from '../src/OpenLDAPConfig';
import LDAPClientConfig from '../src/LDAPClientConfig';
import LDAPClientFactory from '../src/LDAPClientFactory';
import LDAPCache from '../src/LDAPCache';
import * as path from 'path';

const ldapConfPath = path.resolve('test/ldap.conf');

const ldapConfig = new OpenLDAPConfig(readFileSync(ldapConfPath, 'utf8'));
const ldapClientFactory = new LDAPClientFactory();

test('getInstance', async () => {
  const ldapClient = ldapClientFactory.getLDAPClient(new LDAPClientConfig(ldapConfig));
  let ldapCache = await LDAPCache.getInstance(ldapClient);
  ldapCache.set('key', 'value1');
  ldapCache = await LDAPCache.getInstance(ldapClient);
  expect(ldapCache.get('key')).toBe('value1');
  ldapClientFactory.close();
});
