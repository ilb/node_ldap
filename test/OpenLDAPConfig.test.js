import { readFileSync } from 'fs';
import OpenLDAPConfig from '../src/OpenLDAPConfig';
import * as path from 'path';

const ldapConfPath = path.resolve('test/ldap.conf');

const ldapConfig = new OpenLDAPConfig(readFileSync(ldapConfPath, 'utf8'));

const ldapConfPathUnc = path.resolve('test/unconfiguredldap.conf');

const ldapConfigUnc = new OpenLDAPConfig(readFileSync(ldapConfPathUnc, 'utf8'));

const expectedConfig = {
  BASE: 'c=ru',
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

test('uri', () => {
  expect(ldapConfig.uri).toStrictEqual(expectedUri);
});

test('base', () => {
  expect(ldapConfig.base).toBe('c=ru');
});

test('caCert', () => {
  expect(ldapConfig.caCert).toBe('/etc/ssl/certs/ourCAbundle.crt');
});

test('isConfigured', () => {
  expect(ldapConfig.isConfigured()).toBe(true);
});

test('isUnConfigured', () => {
  expect(ldapConfigUnc.isConfigured()).toBe(false);
});
