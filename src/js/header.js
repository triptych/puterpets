export class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                /* Add your header styles here */
                header {
                    background-color: black;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    padding: 10px 0;
                    z-index: 100;
                }

                nav ul {
                    list-style-type: none;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                }

                nav ul li {
                    margin: 0 10px;
                    transition: transform 0.3s ease;
                }

                nav ul li a {
                    color: white;
                    text-decoration: none;
                    font-size: 18px;
                    display: inline-block;
                    padding: 5px;
                }


                nav ul li:hover {
                    transform: skew(-10deg) scale(1.1);
                }



            </style>
            <header>
                <nav>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="adopt.html">Adopt</a></li>
                        <li><a href="dungeon.html">Dungeon</a></li>
                        <li><a href="field.html">Field</a></li>

                        <li><a href="about.html">About</a></li>
                        <li><a href="login.html">Login</a></li>
                    </ul>
                </nav>
            </header>
        `;
    }
}

customElements.define('header-component', Header);