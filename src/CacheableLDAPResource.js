import LDAPResource from './LDAPResource';
import LDAPCache from './LDAPCache';

/**
 * lookup LDAP resources with cache
 */
export default class CacheableLDAPResource {

    static async getInstance(ldapClient) {
        const ldapCache = await LDAPCache.getInstance(ldapClient);
        return new CacheableLDAPResource(new LDAPResource(ldapClient), ldapCache);
    }

    constructor(ldapResource, ldapCache) {
        this.ldapResource = ldapResource;
        this.ldapCache = ldapCache;
    }

    async lookup(name, scope) {
        const cacheKey = name + "|" + scope;
        let value = this.ldapCache.get(cacheKey);
        if (!value) {
            value = await this.ldapResource.lookup(name, scope)
            this.ldapCache.set(cacheKey, value);
        }
        return value;
    }

}
