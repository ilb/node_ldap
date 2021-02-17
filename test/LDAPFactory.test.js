import LDAPFactory from '../src/LDAPFactory';
const expected = 'mysql://localhost/testapp';

const ldapFactory = new LDAPFactory('test/ldap.conf');

test('getInstance', async () => {
  const ldapResource = await ldapFactory.getLDAPResource();
  const resourceUrl = await ldapResource.lookup('ru.bystrobank.apps.testapp.db');

  expect(resourceUrl).toBe(expected);

  ldapFactory.close();
});

process.env.LDAP_URL = 'ldaps://devel.net.ilb.ru/cc=ru';
const ldapFactory2 = new LDAPFactory();

test('getInstance2', async () => {
  const ldapResource = await ldapFactory2.getLDAPResource();
  const resourceUrl = await ldapResource.lookup('ru.bystrobank.apps.testapp.db');

  expect(resourceUrl).toBe(expected);

  expect(ldapFactory2.ldapConfig.base).toBe('cc=ru');

  ldapFactory2.close();
});
