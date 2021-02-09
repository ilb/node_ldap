import { readFileSync } from 'fs';

/**
 * This class builds params structure for ldapjs-client from LDAPConfig structure
 */
class LDAPClientConfig {

    constructor(ldapConfig) {
        this.url = ldapConfig.getUri()[0];
        if (ldapConfig.getCaCert()) {
            this.tlsOptions = [readFileSync(ldapConfig.getCaCert())];
        }
    }
}

export default LDAPClientConfig;
