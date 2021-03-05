import Post from './post.js'

/**
 * @type {Post[]}
 * Contain all ou post.
 */
const posts = [

    new Post({
        path: '/api/Artists',
        type: { type: 'GET' },
        subtitle: 'Retreive all artists.',
        description: 'Return an array that contain all artists in the database.',
        notes: 'The date format is in ISO8601 <code inline>Y-m-d\TH:i:sO</code>'
    }),

    new Post({
        path: '/api/Artists',
        type: { type: 'POST' },
        subtitle: 'Retreive all artists.',
        description: 'Return an array that contain all artists in the database.',
        notes: 'The date format is in ISO8601 <code inline>Y-m-d\TH:i:sO</code>'
    }),
]

/**
 * Build the left menu
 */
function BuildMenu() {
    const container = document.createElement("div");
    container.className = 'menu';

    const ul = document.createElement("ul");
    container.appendChild(ul);

    for(const post of posts) {
        const menuItem = document.createElement("li");
        
        const span = document.createElement("span");
        span.className = 'method';
        span.innerText = post.data.type.type

        const color = post.GetMethodColor()

        if( color !== '' )
            span.setAttribute(color, '');

        const text = document.createTextNode(post.data.path);

        menuItem.appendChild(span);
        menuItem.appendChild(text);

        ul.appendChild(menuItem);

        menuItem.addEventListener("click", () => {
            post.BuildHTML()
                .then( html => document.querySelector(".content").innerHTML = html )
        });
    }

    document.body.insertBefore(container, document.querySelector(".content"));
}

BuildMenu();