import React from "react";
import styles from "./styles.module.css";

export default function UserFooter() {
  return (
    <footer className={styles.root}>
      <div className={styles.container_01}>
        <div className={styles.line}>
          <h3>Explore</h3>
          <ul>
            <li className={styles.item}>
              <a href="/community?source=hashnode-footer">Community</a>
            </li>
            <li className={styles.item}>
              <a href="/explore/blogs?source=hashnode-footer">Trending Blogs</a>
            </li>
            <li className={styles.item}>
              <a href="/teams?source=hashnode-footer">Hashnode for Teams</a>
            </li>
            <li className={styles.item}>
              <a href="https://api.hashnode.com/?source=hashnode-footer">
                Hashnode APIs
              </a>
            </li>
            <li className={styles.item}>
              <a href="https://hackathons.hashnode.com">
                Host a virtual Hackathon
              </a>
            </li>
            <li className={styles.item}>
              <a href="https://hashnode.com/neptune?source=hashnode-footer">
                Hashnode Neptune
              </a>
            </li>
          </ul>
          <h3>Products</h3>
          <ul>
            <li className={styles.item}>
              <a href="/rix?source=hashnode-footer">
                Rix - AI search engine built for developers
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.line}>
          <h3>Premium</h3>
          <ul className="mb-5">
            <li className={styles.item}>
              <a href="/pro?source=hashnode-footer">Hashnode Pro</a>
            </li>
            <li className={styles.item}>
              <a href="/ai?source=hashnode-footer">Hashnode AI</a>
            </li>
          </ul>
          <h3>Company</h3>
          <ul>
            <li className={styles.item}>
              <a href="/about?source=hashnode-footer">About Hashnode</a>
            </li>
            <li className={styles.item}>
              <a href="https://hshno.de/careers">Careers</a>
            </li>
            <li className={styles.item}>
              <a href="/brand-resources?source=hashnode-footer">
                Logos &amp; Media
              </a>
            </li>
            <li className={styles.item}>
              <a href="/changelog?source=hashnode-footer">Changelog</a>
            </li>
            <li className={styles.item}>
              <a href="https://hshno.de/feature-requests-discord">
                Feature Requests
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.line}>
          <h3>Comparisons</h3>
          <ul>
            <li className={styles.item}>
              <a href="/vs/medium?source=hashnode-footer">Hashnode vs Medium</a>
            </li>
            <li className={styles.item}>
              <a href="/vs/ghost?source=hashnode-footer">Hashnode vs Ghost</a>
            </li>
            <li className={styles.item}>
              <a href="/vs/wordpress?source=hashnode-footer">
                Hashnode vs WordPress
              </a>
            </li>
            <li className={styles.item}>
              <a href="/vs/devto?source=hashnode-footer">Hashnode vs Dev.to</a>
            </li>
            <li className={styles.item}>
              <a href="/vs/substack?source=hashnode-footer">
                Hashnode vs Substack
              </a>
            </li>
            <li className={styles.item}>
              <a href="/vs/wordpress-substack?source=hashnode-footer">
                Wordpress vs Substack vs Hashnode
              </a>
            </li>
            <li className={styles.item}>
              <a href="/vs/medium-substack?source=hashnode-footer">
                Medium vs Substack vs Hashnode
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.line}>
          <h3>Support</h3>
          <ul>
            <li className={styles.item}>
              <a href="https://support.hashnode.com?source=hashnode-footer">
                Support Docs
              </a>
            </li>
            <li className={styles.item}>
              <a href="#support">Contact</a>
            </li>
            <li className={styles.item}>
              <a
                href="https://discord.gg/hashnode"
                target="_blank"
                rel="noopener"
              >
                Join Discord
              </a>
            </li>
            <li className={styles.item}>
              <a href="https://hshno.de/feature-requests-discord">
                Feature Requests
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.line}>
          <h3>Official Blogs</h3>
          <ul className="mb-5">
            <li className={styles.item}>
              <a href="https://townhall.hashnode.com?source=hashnode-footer">
                Official Blog
              </a>
            </li>
            <li>
              <a href="https://engineering.hashnode.com/?source=hashnode-footer">
                Engineering Blog
              </a>
            </li>
          </ul>
          <h3 className="css-mhdqfe">Partner with us</h3>
          <ul className="mb-5">
            <li className={styles.item}>
              <a
                href="https://hackathons.hashnode.com?source=hashnode-footer"
                target="_blank"
              >
                Host a Hackathon
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.container_02}>
        <p className={styles.copy}>© Hashnode 2023</p>
        <a href="/privacy" className={styles.term_item}>
          Privacy Policy
        </a>
        <a href="/terms" className={styles.term_item}>
          Terms
        </a>
        <a href="/code-of-conduct" className={styles.term_item}>
          Code of Conduct
        </a>
      </div>
      <div className={styles.container_03}>
        <a
          href="/"
          title="Hashnode"
          aria-label="Hashnode logo"
          className={styles.logo}
        >
          <svg className="css-1irbveh" fill="none" viewBox="0 0 334 56">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.39 18.71c-5.133 5.131-5.133 13.449 0 18.58l14.868 14.862c5.133 5.13 13.454 5.13 18.586 0L52.713 37.29c5.132-5.13 5.132-13.448 0-18.579L37.844 3.848c-5.132-5.13-13.453-5.13-18.586 0L4.39 18.71Zm30.666 15.793a9.193 9.193 0 0 0 0-13.006 9.2 9.2 0 0 0-13.01 0 9.193 9.193 0 0 0 0 13.006 9.202 9.202 0 0 0 13.01 0Z"
              fill="#2962FF"
            ></path>
            <path
              d="M68.452 50.037V5.935h8.603v18.289l-1.032-1.376c.727-1.873 1.893-3.249 3.499-4.128 1.644-.917 3.555-1.376 5.735-1.376 2.37 0 4.435.497 6.194 1.49a10.502 10.502 0 0 1 4.187 4.186c.994 1.758 1.49 3.822 1.49 6.192v20.814l-8.602-.007V31.046c0-1.223-.249-2.274-.746-3.153a4.97 4.97 0 0 0-2.007-2.064c-.841-.497-1.835-.745-2.982-.745-1.11 0-2.103.248-2.983.745a5.356 5.356 0 0 0-2.064 2.064c-.46.88-.689 1.93-.689 3.153v18.99h-8.603ZM111.331 50.023c-2.256 0-4.206-.363-5.85-1.09-1.644-.726-2.906-1.758-3.785-3.095-.879-1.376-1.319-3-1.319-4.873 0-1.759.401-3.307 1.204-4.644.803-1.376 2.027-2.523 3.671-3.44 1.682-.917 3.766-1.567 6.251-1.95l9.578-1.547v6.306l-8.029 1.433c-1.224.23-2.161.631-2.811 1.204-.65.535-.975 1.319-.975 2.35 0 .956.364 1.702 1.09 2.237.727.535 1.625.802 2.696.802 1.414 0 2.657-.305 3.728-.917 1.07-.611 1.892-1.433 2.466-2.465a6.923 6.923 0 0 0 .917-3.497v-8.141c0-1.185-.477-2.179-1.433-2.982-.918-.802-2.18-1.203-3.786-1.203-1.529 0-2.886.42-4.072 1.26-1.147.842-1.988 1.95-2.523 3.326l-6.882-3.268a11.17 11.17 0 0 1 2.924-4.529c1.339-1.261 2.945-2.236 4.818-2.924 1.874-.688 3.919-1.032 6.137-1.032 2.638 0 4.97.478 6.997 1.433 2.026.956 3.594 2.294 4.703 4.014 1.147 1.681 1.72 3.65 1.72 5.905v21.369l-8.029-.037V44.29l1.95-.344c-.918 1.376-1.931 2.522-3.04 3.44a11.218 11.218 0 0 1-3.728 1.949c-1.376.459-2.905.688-4.588.688ZM146.202 50.023c-3.441 0-6.443-.803-9.004-2.408-2.524-1.644-4.244-3.841-5.162-6.593l6.309-2.981c.803 1.681 1.892 3 3.269 3.956a7.864 7.864 0 0 0 4.588 1.433c1.224 0 2.16-.249 2.81-.745.65-.497.975-1.185.975-2.065 0-.458-.114-.84-.344-1.146-.229-.344-.573-.65-1.032-.917-.459-.268-1.033-.497-1.721-.688l-5.334-1.49c-2.561-.727-4.53-1.893-5.907-3.498-1.376-1.644-2.065-3.574-2.065-5.79 0-1.95.497-3.65 1.492-5.103.994-1.452 2.389-2.58 4.186-3.383 1.797-.84 3.862-1.26 6.194-1.26 3.059 0 5.736.725 8.03 2.178 2.332 1.414 3.976 3.42 4.932 6.02l-6.366 2.98c-.459-1.299-1.3-2.33-2.524-3.095-1.185-.803-2.542-1.204-4.072-1.204-1.108 0-1.988.23-2.638.688-.612.459-.917 1.09-.917 1.892 0 .42.114.802.344 1.146.229.344.592.65 1.089.918.536.267 1.186.516 1.95.745l4.99 1.49c2.6.765 4.588 1.93 5.965 3.498 1.376 1.529 2.064 3.42 2.064 5.676 0 1.949-.516 3.65-1.548 5.102-.994 1.452-2.39 2.599-4.187 3.44-1.797.802-3.919 1.204-6.366 1.204ZM162.298 49.964V6.004h8.603v18.83l-1.033-1.376c.727-1.873 1.893-3.25 3.499-4.128 1.644-.917 3.556-1.376 5.735-1.376 2.371 0 4.436.497 6.194 1.49a10.502 10.502 0 0 1 4.187 4.186c.994 1.758 1.491 3.822 1.491 6.191v20.186h-8.603V31.656c0-1.223-.248-2.274-.745-3.153a4.97 4.97 0 0 0-2.008-2.064c-.841-.497-1.835-.745-2.982-.745-1.109 0-2.103.248-2.982.745a5.353 5.353 0 0 0-2.065 2.064c-.459.879-.688 1.93-.688 3.153v18.298l-8.603.01ZM195.484 49.976V18.673h8.029v6.192l-.458-1.376c.726-1.873 1.892-3.249 3.498-4.128 1.644-.917 3.556-1.376 5.735-1.376 2.371 0 4.436.497 6.194 1.49a10.503 10.503 0 0 1 4.187 4.186c.994 1.758 1.491 3.822 1.491 6.192v20.123h-8.603V31.687c0-1.223-.248-2.274-.745-3.153a4.974 4.974 0 0 0-2.007-2.064c-.842-.497-1.836-.745-2.983-.745-1.109 0-2.103.248-2.982.745a5.353 5.353 0 0 0-2.065 2.064c-.459.88-.688 1.93-.688 3.153v18.289h-8.603ZM244.213 50.023c-3.097 0-5.927-.707-8.488-2.121a16.67 16.67 0 0 1-6.08-5.79c-1.491-2.485-2.237-5.294-2.237-8.428 0-3.173.746-5.982 2.237-8.428a16.67 16.67 0 0 1 6.08-5.79c2.561-1.415 5.391-2.122 8.488-2.122 3.097 0 5.907.707 8.431 2.121 2.523 1.415 4.53 3.345 6.022 5.79 1.529 2.447 2.294 5.256 2.294 8.429 0 3.134-.765 5.943-2.294 8.427-1.492 2.446-3.499 4.376-6.022 5.79-2.524 1.415-5.334 2.122-8.431 2.122Zm0-7.74c1.567 0 2.925-.363 4.072-1.09 1.185-.725 2.103-1.738 2.753-3.038.688-1.3 1.032-2.79 1.032-4.471 0-1.682-.344-3.154-1.032-4.415-.65-1.3-1.568-2.312-2.753-3.038-1.147-.765-2.505-1.147-4.072-1.147-1.568 0-2.944.382-4.13 1.146-1.185.727-2.122 1.74-2.81 3.039-.65 1.261-.975 2.733-.975 4.415 0 1.681.325 3.172.975 4.471.688 1.3 1.625 2.313 2.81 3.039 1.186.726 2.562 1.09 4.13 1.09ZM279.62 50.023c-3.058 0-5.792-.726-8.201-2.179-2.409-1.452-4.321-3.42-5.735-5.905-1.377-2.484-2.065-5.236-2.065-8.255 0-3.058.707-5.81 2.122-8.256 1.415-2.485 3.326-4.453 5.735-5.905 2.409-1.453 5.105-2.179 8.087-2.179 2.294 0 4.321.44 6.079 1.319 1.797.84 3.212 2.045 4.244 3.612l-1.319 1.72V5.935h8.603v44.077h-8.029v-6.41l.803 1.777c-1.071 1.529-2.524 2.695-4.359 3.497-1.835.765-3.824 1.147-5.965 1.147Zm1.033-7.74c1.567 0 2.944-.363 4.129-1.09 1.185-.725 2.103-1.738 2.753-3.038.688-1.3 1.032-2.79 1.032-4.471 0-1.682-.344-3.173-1.032-4.472-.65-1.3-1.568-2.313-2.753-3.039s-2.562-1.09-4.129-1.09c-1.568 0-2.983.383-4.244 1.148-1.224.726-2.18 1.738-2.868 3.038-.688 1.261-1.032 2.733-1.032 4.415 0 1.681.344 3.172 1.032 4.471.688 1.3 1.644 2.313 2.868 3.039 1.261.726 2.676 1.09 4.244 1.09ZM317.407 50.023c-3.326 0-6.213-.726-8.66-2.179-2.447-1.49-4.34-3.478-5.678-5.962-1.338-2.484-2.007-5.236-2.007-8.256 0-3.134.688-5.924 2.064-8.37 1.415-2.446 3.308-4.376 5.678-5.79 2.371-1.415 5.047-2.122 8.03-2.122 2.485 0 4.683.401 6.595 1.204 1.912.765 3.518 1.854 4.818 3.268a14.248 14.248 0 0 1 3.04 4.93c.688 1.835 1.032 3.842 1.032 6.02 0 .612-.038 1.223-.115 1.835-.038.573-.134 1.07-.287 1.49H308.46v-6.306h18.582l-4.072 2.981c.383-1.643.364-3.096-.057-4.357-.421-1.3-1.166-2.312-2.237-3.038-1.032-.765-2.313-1.147-3.842-1.147-1.491 0-2.772.363-3.843 1.09-1.071.725-1.873 1.796-2.409 3.21-.535 1.414-.745 3.134-.631 5.16-.153 1.758.058 3.306.631 4.643.574 1.338 1.453 2.39 2.638 3.154 1.186.726 2.62 1.089 4.302 1.089 1.529 0 2.829-.306 3.9-.917a6.554 6.554 0 0 0 2.581-2.523l6.882 3.268c-.612 1.529-1.587 2.866-2.925 4.013-1.3 1.147-2.848 2.045-4.645 2.694-1.797.612-3.767.918-5.908.918Z"
              fill="fill-current"
            ></path>
          </svg>
        </a>
      </div>
    </footer>
  );
}
