import OpenLDAPConfig from './OpenLDAPConfig';
import URILDAPConfig from './URILDAPConfig';
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
        if (process.env.LDAP_URL) {
            //configure using LDAP_URL variable if set
            this.ldapConfig = new URILDAPConfig(process.env.LDAP_URL,process.env.NODE_EXTRA_CA_CERTS);
        } else if (fs.existsSync(ldapConfPath)) {
            //configure using openldap configuration file
            this.ldapConfig = new OpenLDAPConfig(fs.readFileSync(ldapConfPath, 'utf8'));
        } else {
            throw new Error("Ldap client auto-configuration failed: LDAP_URL environment variable OR file " + ldapConfPath + " required.")
        }
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
