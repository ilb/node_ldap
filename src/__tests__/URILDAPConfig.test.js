import URILDAPConfig from '../URILDAPConfig';

const ldapConfig = new URILDAPConfig('ldaps://devel.net.ilb.ru/c=ru','/etc/ssl/certs/ourCAbundle.crt');

const expectedUri = ['ldaps://devel.net.ilb.ru'];

test('getUri', () => {
    expect(ldapConfig.getUri()).toStrictEqual(expectedUri);
});


test('getBase', () => {
    expect(ldapConfig.getBase()).toBe('c=ru');
});

test('getCaCert', () => {
    expect(ldapConfig.getCaCert()).toBe('/etc/ssl/certs/ourCAbundle.crt');
});
