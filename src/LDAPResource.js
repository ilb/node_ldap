export default class LDAPResource {

    constructor(ldapClient) {
        this.ldapClient = ldapClient;
        this.lookupCount = 0;
    }

    async lookup(name, scope) {
        const options = {
            filter: `(&(objectClass=applicationProcess)(cn=${name}))`,
            scope: 'sub',
            attributes: ['labeledURI']
        };
        const entries = await this.ldapClient.search(scope, options);
        //console.log('entries',entries);
        let result = null;
        if (entries.length > 0 && entries[0].labeledURI) {
            result = entries[0].labeledURI;
        }
        this.lookupCount++;
        return result;
    }
}
