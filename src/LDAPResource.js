export default class LDAPResource {

    constructor(ldapClient) {
        this.ldapClient = ldapClient;
    }

    async lookup(name) {
        const options = {
            filter: `(&(objectClass=applicationProcess)(cn=${name}))`,
            attributes: ['labeledURI']
        };

        console.log('filter',`(&(objectClass=applicationProcess)(cn=${name}))`);

        const entries = await this.ldapClient.search('c=ru', options);
        console.log('entries',entries);
        let result = null;
        if (entries.length > 0 && entries[0].labeledURI) {
            result = entries[0].labeledURI;
        }
        return result;
    }
}
