import { readFileSync } from 'fs';
import OpenLDAPConfig from '../src/OpenLDAPConfig';
import * as path from 'path';

const ldapConfPath = path.resolve('test/ldap.conf');

const ldapConfig = new OpenLDAPConfig(readFileSync(ldapConfPath, 'utf8'));

const expectedConfig = {
  BASE: 'dc=example,dc=com',
  TLS_CACERT: '/etc/ssl/certs/ourCAbundle.crt',
  URI: 'ldapi:/// ldaps://devel.net.ilb.ru ldaps://ldap.net.ilb.ru ldaps://ldap2.net.ilb.ru'
};

test('parseConfig', () => {
  expect(OpenLDAPConfig.parseConfig(readFileSync(ldapConfPath, 'utf8'))).toStrictEqual(
    expectedConfig
  );
});

const expectedUri = [
  'ldaps://devel.net.ilb.ru',
  'ldaps://ldap.net.ilb.ru',
  'ldaps://ldap2.net.ilb.ru'
];

test('getUri', () => {
  expect(ldapConfig.getUri()).toStrictEqual(expectedUri);
});

test('getBase', () => {
  expect(ldapConfig.getBase()).toBe('dc=example,dc=com');
});

test('getCaCert', () => {
  expect(ldapConfig.getCaCert()).toBe('/etc/ssl/certs/ourCAbundle.crt');
});
