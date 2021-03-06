import config from './config.js';

/**
 * @typedef RequestType
 * @property {'GET' | 'POST' | 'UPDATE' | 'DELETE'} type The request type.
 */

/**
 * @typedef PostData
 * @property {string} path The request path.
 * @property {RequestType} type The request type. 
 * @property {string} subtitle The subtitle.
 * @property {string} description The description.
 * @property {string | undefined} notes The notes.
 */

export default class Post {

    /**
     * Create new Post instance.
     * @param {PostData} data Post data
     */
    constructor(data) {
        this.data = data;
        this.fullpath = `${config.serverUrl}${data.path}`
    }

    
    GetMethodColor() {
        switch(this.data.type.type) {
            case 'GET': return '';
            case 'POST': return 'gold';
            case 'UPDATE': return 'blue';
            case 'DELETE': return 'red';
        }
    }

    async BuildHTML() {
        const ftch =
            this.data.type.type == "UPDATE" || this.data.type.type == "DELETE"
                ? fetch(this.fullpath, {
                      method: this.data.type.type,
                      body: {},
                  })
                : fetch(this.fullpath, { method: this.data.type.type });
        const data = await ftch //await fetch(this.fullpath, { method: this.data.type.type })
        .then( response => response.json() )
        .then( data => {
            if( Array.isArray(data) )
                data = [data[0], data[1]]
            
            return data;
        });
        
        const str = JSON.stringify(data, null, 2);

        return `
            <div class="title">
                <h1><span class="method" ${this.GetMethodColor()}>${this.data.type.type}</span>${this.data.path}</h1>
                <h3>${this.data.subtitle}</h3>
            </div>

            <br/>

            <h3>Description</h3>
            <p>${this.data.description}</p>

            <br />

            <h3>Note(s)</h3>
            <p>${(this.data.notes == null | this.data.notes == '') ? 'No notes...' : this.data.notes}</p>

            <br />

            <h3>Response sample</h3>
            <pre><code class="js">${hljs.highlight("js", str).value}</code></pre>

            <br />
        `;
    }
}