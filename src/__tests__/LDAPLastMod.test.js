import { readFileSync } from 'fs';
import OpenLDAPConfig from '../OpenLDAPConfig';
import LDAPClientConfig from '../LDAPClientConfig';
import LDAPClientFactory from '../LDAPClientFactory';
import LDAPLastMod from '../LDAPLastMod';
import LdapClient from 'ldapjs-client';
import * as path from 'path';

const ldapConfPath = path.resolve('src/__tests__/ldap.conf');

const ldapConfig = new OpenLDAPConfig(readFileSync(ldapConfPath, 'utf8'));
const ldapClientFactory = new LDAPClientFactory();

const expected = '123';

test('getLastMod', async () => {
  const ldapClient = ldapClientFactory.getLDAPClient(new LDAPClientConfig(ldapConfig));
  const ldapLastMod = new LDAPLastMod(ldapClient);
  const lmdt = await ldapLastMod.getLastMod();
  expect(isNaN(lmdt.getTime())).toBe(false);
  ldapClientFactory.close();
});
