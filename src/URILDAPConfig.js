import LDAPConfig from './LDAPConfig';

/**
 * Configure LDAP from URI
 * example: ldaps://devel.net.ilb.ru/c=ru
 */
export default class URILDAPConfig extends LDAPConfig {

    constructor(uri, caCert) {
        super();
        const urlapi = require('url');
        const urlobj = urlapi.parse(uri);
        this.base = urlobj.pathname.substring(1);
        urlobj.pathname = null;
        this.uri = [urlapi.format(urlobj)];
        this.caCert = caCert;
    }

}
