import LDAPFactory from '../LDAPFactory';
const expected = 'mysql://localhost/testapp';

const ldapFactory = new LDAPFactory();

test('getInstance', async () => {
    const ldapResource = await ldapFactory.getLDAPResource();
    const resourceUrl = await ldapResource.lookup('ru.bystrobank.apps.testapp.db');

    expect(resourceUrl).toBe(expected);


    ldapFactory.close();
});
