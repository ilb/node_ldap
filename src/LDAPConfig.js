/**
 * LDAP configuration
 */
export default class LDAPConfig {
  constructor() {
    this.uri = [];
    this.base = null;
    this.caCert = null;
  }

  /**
   * check if this instance if configured
   */
  isConfigured() {
    return this.uri && this.uri.length > 0;
  }
}
