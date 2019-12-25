import OpenLDAPConfig from './OpenLDAPConfig';
import LDAPClientConfig from './LDAPClientConfig';
import LDAPClientFactory from './LDAPClientFactory';
import CacheableLDAPResource from './CacheableLDAPResource';

/**
 * LDAP facade with auto-configuration
 */
export default class LDAPFactory {

    constructor() {
        const fs = require('fs');
        const ldapConfPath = '/etc/openldap/ldap.conf';
        if (!fs.existsSync(ldapConfPath)) {
            throw new Error("Ldap client auto-configuration failed: file " + ldapConfPath + " missing.")
        }
        this.ldapConfig = new OpenLDAPConfig(fs.readFileSync(ldapConfPath, 'utf8'));
        this.ldapClientConfig = new LDAPClientConfig(this.ldapConfig);
        this.ldapClientFactory = new LDAPClientFactory();
        this.ldapClient = null;
    }

    /**
     * lazy-initalization method to get ldapClient
     */
    getLDAPClient() {
        if (this.ldapClient === null) {
            this.ldapClient = this.ldapClientFactory.getLDAPClient(this.ldapClientConfig);
        }
        return this.ldapClient;
    }

    /**
     * get autoconfigured ldap resource
     */
    async getLDAPResource() {
        const ldapResource = await CacheableLDAPResource.getInstance(this.getLDAPClient(), this.ldapConfig.getBase());
        return ldapResource;
    }

    /**
     * closes open connections
     */
    close() {
        this.ldapClientFactory.close();
    }

}
