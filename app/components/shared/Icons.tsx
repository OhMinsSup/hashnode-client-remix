interface IconProps extends React.SVGProps<SVGSVGElement> {}

const MediaIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 24 24">
    <path
      d="M17.8828 11.0741L13.8013 16.0424L10.1085 12.0823L5.699 16.504M14.1999 8.08994C14.1999 8.31085 14.0208 8.48994 13.7999 8.48994C13.579 8.48994 13.3999 8.31085 13.3999 8.08994M14.1999 8.08994C14.1999 7.86902 14.0208 7.68994 13.7999 7.68994C13.579 7.68994 13.3999 7.86902 13.3999 8.08994M14.1999 8.08994H13.3999M6 21H18C19.6569 21 21 19.6569 21 18V6C21 4.34315 19.6569 3 18 3H6C4.34315 3 3 4.34315 3 6V18C3 19.6569 4.34315 21 6 21Z"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const SubTitleIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 18 18">
    <path
      d="M11.25 11.953h-9m1.2-2.906h11.1c.42 0 .63 0 .79-.082a.75.75 0 0 0 .328-.328c.082-.16.082-.37.082-.79v-.6c0-.42 0-.63-.082-.79a.75.75 0 0 0-.327-.328c-.16-.082-.371-.082-.791-.082H3.45c-.42 0-.63 0-.79.082a.75.75 0 0 0-.328.327c-.082.16-.082.37-.082.79v.6c0 .42 0 .63.082.791a.75.75 0 0 0 .328.328c.16.082.37.082.79.082Z"
      stroke="stroke-current"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const GithubIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 496 512">
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
  </svg>
);

const GoogleIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 128 128">
    <g clipRule="evenodd">
      <path fill="none" d="M0 0h128v128H0z"></path>
      <path
        d="M27.585 64c0-4.157.69-8.143 1.923-11.881L7.938 35.648C3.734 44.183 1.366 53.801 1.366 64c0 10.191 2.366 19.802 6.563 28.332l21.558-16.503A37.86 37.86 0 0127.585 64"
        fill="#FBBC05"
        fillRule="evenodd"
      ></path>
      <path
        d="M65.457 26.182c9.031 0 17.188 3.2 23.597 8.436L107.698 16C96.337 6.109 81.771 0 65.457 0 40.129 0 18.361 14.484 7.938 35.648l21.569 16.471a37.77 37.77 0 0135.95-25.937"
        fill="#EA4335"
        fillRule="evenodd"
      ></path>
      <path
        d="M65.457 101.818a37.77 37.77 0 01-35.949-25.937L7.938 92.349C18.361 113.516 40.129 128 65.457 128c15.632 0 30.557-5.551 41.758-15.951L86.741 96.221c-5.777 3.639-13.052 5.597-21.284 5.597"
        fill="#34A853"
        fillRule="evenodd"
      ></path>
      <path
        d="M126.634 64c0-3.782-.583-7.855-1.457-11.636h-59.72v24.727h34.376c-1.719 8.431-6.397 14.912-13.092 19.13l20.474 15.828c11.766-10.92 19.419-27.188 19.419-48.049"
        fill="#4285F4"
        fillRule="evenodd"
      ></path>
    </g>
  </svg>
);

const LogoIcon = (props: IconProps) => (
  <svg
    viewBox="0 0 659 165"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>{"Remix Logo"}</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M133.85 124.16c1.45 18.602 1.45 27.322 1.45 36.84H92.228c0-2.073.037-3.97.075-5.893.117-5.979.238-12.213-.731-24.803-1.282-18.432-9.225-22.528-23.83-22.528H0V74.24h69.792c18.449 0 27.673-5.608 27.673-20.456 0-13.056-9.224-20.968-27.673-20.968H0V0h77.479C119.245 0 140 19.712 140 51.2c0 23.552-14.605 38.912-34.335 41.472 16.655 3.328 26.392 12.8 28.185 31.488Z"
      fill="currentColor"
    />
    <path
      d="M0 161v-25h45.542c7.607 0 9.258 5.638 9.258 9v16H0Z"
      fill="currentColor"
    />
    <path
      d="M654.54 47.103h-42.752L592.332 74.24l-18.944-27.136h-45.824l41.216 56.064-44.8 58.112h42.752l22.784-30.976L612.3 161.28h45.824l-45.056-59.904 41.472-54.273Z"
      fill="url(#a)"
    />
    <path
      d="M654.54 47.103h-42.752L592.332 74.24l-18.944-27.136h-45.824l41.216 56.064-44.8 58.112h42.752l22.784-30.976L612.3 161.28h45.824l-45.056-59.904 41.472-54.273Z"
      fill="currentColor"
    />
    <path
      d="M229.43 120.576c-3.84 8.96-11.008 12.8-22.272 12.8-12.544 0-22.784-6.656-23.808-20.736h80.128v-11.52c0-30.976-20.224-57.088-58.368-57.088-35.584 0-62.208 25.856-62.208 61.952 0 36.352 26.112 58.368 62.72 58.368 30.208 0 51.2-14.592 57.088-40.704l-33.28-3.072Zm-45.568-27.904c1.536-10.752 7.424-18.944 20.736-18.944 12.288 0 18.944 8.704 19.456 18.944h-40.192Z"
      fill="url(#b)"
    />
    <path
      d="M229.43 120.576c-3.84 8.96-11.008 12.8-22.272 12.8-12.544 0-22.784-6.656-23.808-20.736h80.128v-11.52c0-30.976-20.224-57.088-58.368-57.088-35.584 0-62.208 25.856-62.208 61.952 0 36.352 26.112 58.368 62.72 58.368 30.208 0 51.2-14.592 57.088-40.704l-33.28-3.072Zm-45.568-27.904c1.536-10.752 7.424-18.944 20.736-18.944 12.288 0 18.944 8.704 19.456 18.944h-40.192Z"
      fill="currentColor"
    />
    <path
      d="M385.256 66.56c-4.864-13.312-15.36-22.528-35.584-22.528-17.152 0-29.44 7.68-35.584 20.224V47.104h-41.472V161.28h41.472v-56.064c0-17.152 4.864-28.416 18.432-28.416 12.544 0 15.616 8.192 15.616 23.808v60.672h41.472v-56.064c0-17.152 4.608-28.416 18.432-28.416 12.544 0 15.36 8.192 15.36 23.808v60.672h41.472V89.6c0-23.808-9.216-45.568-40.704-45.568-19.2 0-32.768 9.728-38.912 22.528Z"
      fill="url(#c)"
    />
    <path
      d="M385.256 66.56c-4.864-13.312-15.36-22.528-35.584-22.528-17.152 0-29.44 7.68-35.584 20.224V47.104h-41.472V161.28h41.472v-56.064c0-17.152 4.864-28.416 18.432-28.416 12.544 0 15.616 8.192 15.616 23.808v60.672h41.472v-56.064c0-17.152 4.608-28.416 18.432-28.416 12.544 0 15.36 8.192 15.36 23.808v60.672h41.472V89.6c0-23.808-9.216-45.568-40.704-45.568-19.2 0-32.768 9.728-38.912 22.528Z"
      fill="currentColor"
    />
    <path
      d="M478.436 47.104V161.28h41.472V47.104h-41.472Zm-.256-10.752h41.984V0H478.18v36.352Z"
      fill="url(#d)"
    />
    <path
      d="M478.436 47.104V161.28h41.472V47.104h-41.472Zm-.256-10.752h41.984V0H478.18v36.352Z"
      fill="currentColor"
    />
    <defs>
      <linearGradient
        id="a"
        x1={591.052}
        y1={47.103}
        x2={591.052}
        y2={161.28}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="b"
        x1={203.19}
        y1={44.032}
        x2={203.19}
        y2={164.352}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="c"
        x1={368.744}
        y1={44.032}
        x2={368.744}
        y2={161.28}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" stopOpacity={0} />
      </linearGradient>
      <linearGradient
        id="d"
        x1={499.172}
        y1={0}
        x2={499.172}
        y2={161.28}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="currentColor" />
        <stop offset={1} stopColor="currentColor" stopOpacity={0} />
      </linearGradient>
    </defs>
  </svg>
);

const MenuIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 448 512">
    <path d="M0 80c0-8.84 7.164-16 16-16h416c8.8 0 16 7.16 16 16s-7.2 16-16 16H16C7.164 96 0 88.84 0 80zm0 160c0-8.8 7.164-16 16-16h416c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.836 0-16-7.2-16-16zm432 176H16c-8.836 0-16-7.2-16-16s7.164-16 16-16h416c8.8 0 16 7.2 16 16s-7.2 16-16 16z"></path>
  </svg>
);

const SearchIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 512 512">
    <path
      fill="currentColor"
      d="M507.3 484.7 365.8 343.2c31.2-36.4 49.3-83.5 49.3-135.2 0-114.9-93.13-208-208-208S0 93.13 0 208s93.12 208 207.1 208c51.68 0 98.85-18.96 135.2-50.15l141.5 141.5c4 3.05 8.1 4.65 12.2 4.65s8.188-1.562 11.31-4.688c6.29-6.212 6.29-16.412-.01-22.612zM208 384c-97.9 0-176-79-176-176S110.1 32 208 32s176 78.1 176 176-79 176-176 176z"
    ></path>
  </svg>
);

const PenIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 24 24">
    <path
      d="M16.78 2.364a2.75 2.75 0 0 1 2.441 0c.407.202.764.559 1.224 1.02l.085.086.086.085c.461.46.818.817 1.02 1.224a2.75 2.75 0 0 1 0 2.442c-.202.407-.559.763-1.02 1.223L20.061 9 15 3.94l.555-.556c.46-.461.816-.818 1.223-1.02ZM13.94 5 19 10.06l-8.148 8.148c-.463.464-.762.762-1.107 1.003a4.74 4.74 0 0 1-.983.526c-.391.154-.806.237-1.448.365l-3.167.633a.75.75 0 0 1-.882-.882l.633-3.167c.128-.642.211-1.057.365-1.448a4.75 4.75 0 0 1 .526-.983c.24-.346.54-.644 1.003-1.107L13.94 5Z"
      fill="fill-current"
    ></path>
  </svg>
);

const MoonIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 24 24">
    <path
      d="M3 11.449C3 16.724 7.169 21 12.312 21c3.959 0 7.34-2.534 8.688-6.107a8.074 8.074 0 0 1-3.515.8c-4.571 0-8.277-3.8-8.277-8.489 0-1.961.648-3.767 1.737-5.204C6.45 2.678 3 6.65 3 11.449Z"
      stroke="stroke-current"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const SunIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 24 24">
    <path
      d="M12 20v2m0-20v2m8 8h2M2 12h2m14 6 1.5 1.5m-15-15L6 6m12 0 1.5-1.5m-15 15L6 18m11-6a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
      stroke="stroke-current"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const NotificationIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 24 24">
    <path
      d="M9.354 21c.705.622 1.632 1 2.646 1s1.94-.378 2.646-1M18 8A6 6 0 1 0 6 8c0 3.09-.78 5.206-1.65 6.605-.735 1.18-1.102 1.771-1.089 1.936.015.182.054.252.2.36.133.099.732.099 1.928.099H18.61c1.196 0 1.795 0 1.927-.098.147-.11.186-.179.2-.361.014-.165-.353-.755-1.088-1.936C18.78 13.206 18 11.09 18 8Z"
      stroke="stroke-current"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const NotificationPlusIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 448 512">
    <path d="M224 480a32 32 0 01-32-32h-32a64 64 0 10128 0h-32a32 32 0 01-32 32zm209.37-145.19c-28-26.62-49.34-54.48-49.34-148.9 0-79.6-63.37-144.5-144-152.36V16a16 16 0 00-32 0v17.56C127.35 41.41 64 106.31 64 185.91c0 94.4-21.41 122.28-49.35 148.9a46.47 46.47 0 00-11.27 51.24A47.68 47.68 0 0048 416h352a47.67 47.67 0 0044.62-30 46.47 46.47 0 00-11.25-51.19zM400 384H48c-14.22 0-21.35-16.47-11.32-26C71.54 324.8 96 287.66 96 185.91 96 118.53 153.22 64 224 64s128 54.52 128 121.91c0 101.34 24.22 138.68 59.28 172.07C421.37 367.56 414.16 384 400 384zM296 224h-56v-56a8 8 0 00-8-8h-16a8 8 0 00-8 8v56h-56a8 8 0 00-8 8v16a8 8 0 008 8h56v56a8 8 0 008 8h16a8 8 0 008-8v-56h56a8 8 0 008-8v-16a8 8 0 00-8-8z"></path>
  </svg>
);

const MenuDraftIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 18 18">
    <path
      d="M10.5 1.875V4.2c0 .63 0 .945.123 1.186.107.211.28.384.491.491C11.354 6 11.67 6 12.3 6h2.325M6.75 9h4.5m-4.5 3h3M15 6.244V12.9c0 1.26 0 1.89-.245 2.371-.216.424-.56.768-.984.984-.48.245-1.11.245-2.371.245H6.6c-1.26 0-1.89 0-2.371-.245a2.25 2.25 0 0 1-.984-.983C3 14.79 3 14.16 3 12.9V5.1c0-1.26 0-1.89.245-2.371a2.25 2.25 0 0 1 .984-.984C4.709 1.5 5.339 1.5 6.6 1.5h3.656c.367 0 .55 0 .723.041.153.037.3.098.433.18.152.093.281.223.54.482l2.345 2.344c.26.26.39.39.482.54.082.135.143.281.18.434.041.173.041.356.041.723Z"
      stroke="stroke-current"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const MenuBookmarkIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 24 24">
    <path
      d="m9.842 21.439-.44.607.44-.607Zm-.184 0 .44.607-.44-.607Zm-2.066 1.194h.75-.75Zm.249.127-.441-.606.44.606Zm3.818 0 .441-.606-.44.606Zm-4.067-3.507h-.75.75ZM20 2h.75a.75.75 0 0 0-.75-.75V2Zm0 20v.75a.75.75 0 0 0 .75-.75H20ZM4 19h.75H4Zm10 2.25a.75.75 0 0 0 0 1.5v-1.5ZM7 16v.75V16Zm-1.89 6.239a.75.75 0 1 0 .756-1.296L5.11 22.24Zm-.886-2.101-.694.284.694-.284Zm-.12-1.922.724.196-.724-.196Zm1.074-1.6-.456-.595.456.596Zm2.649 3.151h3.846v-1.5H7.827v1.5Zm3.331-.514v3.38h1.5v-3.38h-1.5Zm-2.816 3.38v-3.38h-1.5v3.38h1.5Zm3.758-.48-1.816-1.32-.883 1.213 1.817 1.32.882-1.212Zm-2.883-1.32L7.4 22.152l.882 1.214 1.817-1.322-.882-1.213Zm1.066 0a.907.907 0 0 0-1.066 0l.882 1.213a.593.593 0 0 1-.698 0l.883-1.214Zm-3.441 1.8a.907.907 0 0 0 1.44.734L7.4 22.154a.593.593 0 0 1 .942.48h-1.5Zm4.316 0c0-.484.55-.764.942-.48l-.882 1.214a.907.907 0 0 0 1.44-.734h-1.5Zm.515-2.866a.515.515 0 0 1-.515-.514h1.5a.985.985 0 0 0-.985-.986v1.5Zm-3.846-1.5a.985.985 0 0 0-.985.986h1.5c0 .284-.23.514-.515.514v-1.5ZM7 2.75h13v-1.5H7v1.5ZM19.25 2v14h1.5V2h-1.5Zm0 14v6h1.5v-6h-1.5Zm-14.5 3V5h-1.5v14h1.5ZM20 21.25h-6v1.5h6v-1.5Zm-14.134-.307a2.25 2.25 0 0 1-.948-1.09l-1.388.57a3.75 3.75 0 0 0 1.58 1.816l.756-1.296Zm-.948-1.09A2.249 2.249 0 0 1 4.75 19h-1.5c0 .485.094.968.28 1.422l1.388-.569ZM4.75 19c0-.197.026-.395.078-.588L3.38 18.02c-.087.321-.13.651-.13.98h1.5Zm.078-.588a2.25 2.25 0 0 1 .805-1.2l-.91-1.191A3.75 3.75 0 0 0 3.38 18.02l1.448.392Zm.805-1.2c.393-.3.873-.462 1.367-.462v-1.5c-.823 0-1.624.27-2.278.77l.911 1.192ZM7 1.25A3.75 3.75 0 0 0 3.25 5h1.5A2.25 2.25 0 0 1 7 2.75v-1.5Zm0 15.5h13v-1.5H7v1.5Z"
      fill="fill-current"
    ></path>
  </svg>
);

const MenuAccountIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 496 512">
    <path
      fill="fill-current"
      d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"
    ></path>
  </svg>
);

const MenuLogoutIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 512 512">
    <path d="M48 64h132c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H48c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h132c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48zm279 19.5l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l132 131.4H172c-6.6 0-12 5.4-12 12v10c0 6.6 5.4 12 12 12h279.9L320 404.4c-4.7 4.7-4.7 12.3 0 17l7.1 7.1c4.7 4.7 12.3 4.7 17 0l164.5-164c4.7-4.7 4.7-12.3 0-17L344 83.5c-4.7-4.7-12.3-4.7-17 0z"></path>
  </svg>
);

const MyFeedIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 512 512">
    <path d="M464 32H144c-26.5 0-48 21.53-48 48v336c0 17.66-14.36 32-32 32s-32-14.34-32-32V112c0-8.8-7.16-16-16-16s-16 7.2-16 16v304c0 35.28 28.7 64 64 64h368c44.11 0 80-35.88 80-80V80c0-26.47-21.5-48-48-48zm16 368c0 26.47-21.53 48-48 48H119.4c5.5-9.4 8.6-20.3 8.6-32V80c0-8.81 7.2-16 16-16h320c8.8 0 16 7.19 16 16v320zm-208-96h-96c-8.8 0-16 7.2-16 16s7.156 16 16 16h96c8.844 0 16-7.156 16-16s-7.2-16-16-16zm160 0h-96c-8.8 0-16 7.2-16 16s7.156 16 16 16h96c8.844 0 16-7.156 16-16s-7.2-16-16-16zm-160 64h-96c-8.8 0-16 7.2-16 16s7.156 16 16 16h96c8.844 0 16-7.156 16-16s-7.2-16-16-16zm160 0h-96c-8.844 0-16 7.156-16 16s7.156 16 16 16h96c8.844 0 16-7.156 16-16s-7.2-16-16-16zM416 96H192c-17.7 0-32 14.3-32 32v96c0 17.67 14.33 32 32 32h224c17.67 0 32-14.33 32-32v-96c0-17.7-14.3-32-32-32zm0 128H192v-96h224v96z"></path>
  </svg>
);

const MyDraftIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 576 512">
    <path d="M64 480h194.5l-1.1 4.2c-2.3 9.4-1.7 19 1.4 27.8H64c-35.35 0-64-28.7-64-64V64C0 28.65 28.65 0 64 0h156.1c12.7 0 25 5.057 34 14.06L369.9 129.9c9 9 14.1 21.3 14.1 34v135.7l-32 32V192H240c-26.5 0-48-21.5-48-48V32H64c-17.67 0-32 14.33-32 32v384c0 17.7 14.33 32 32 32zm283.3-327.4L231.4 36.69c-2-2.07-4.6-3.51-7.4-4.21V144c0 8.8 7.2 16 16 16h111.5c-.7-2.8-2.1-5.4-4.2-7.4zm126 88.8c18.8-18.8 49.1-18.8 67.9 0l17.3 17.3c18.7 18.7 18.7 49.1 0 67.8L404.1 480.1c-5.3 6.1-13 10.5-21.4 12.6l-74.8 18.7c-5.5 1.4-11.3-.2-15.2-4.2-4-4-5.6-9.8-4.2-16.1l18.7-73.9c2.1-8.4 6.4-16.2 12.6-22.3l153.5-153.5zm45.3 21.7c-6.3-5.4-16.4-5.4-22.7 0l-24.7 25.7 39.9 39.9 24.8-24.8c6.2-6.2 6.2-16.4 0-22.6l-17.3-18.2zm-180.4 161-13.1 49.8 49.8-12.3c2.8-.7 5.4-2.1 7.4-4.2l106.2-106.1-40-39.9-106.1 106.1c-2 2.1-3.5 4.6-4.2 6.6z"></path>
  </svg>
);

const MyBookmarkIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 448 512">
    <path d="M448 368V48c0-26.51-21.5-48-48-48H80C35.82 0 0 35.82 0 80v368c0 35.35 28.66 64 64 64h368c8.844 0 16-7.156 16-16s-7.2-16-16-16h-16v-66.95c18.6-6.65 32-24.25 32-45.05zM320 32v174.7l-54.9-43.2c-2-2.3-5.6-3.5-9.1-3.5s-7.062 1.172-10 3.5l-54 43.2V32h128zm64 448H64c-17.64 0-32-14.36-32-32s14.36-32 32-32h320v64zm16-96H64c-11.71 0-22.55 3.389-32 8.9V80c0-26.51 21.49-48 48-48h80v208c0 6.156 3.531 11.75 9.062 14.42 5.562 2.672 12.09 1.891 16.94-1.922L256 196.5l69.1 56.02c3.8 2.28 7.3 3.48 10.9 3.48 2.344 0 4.719-.516 6.938-1.578C348.5 251.8 352 246.2 352 240V32h48c8.8 0 16 7.16 16 16v320c0 8.8-7.2 16-16 16z"></path>
  </svg>
);

const TrendingIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 24 24">
    <path d="M20 15a1 1 0 002 0V7a1 1 0 00-1-1h-8a1 1 0 000 2h5.59L13 13.59l-3.3-3.3a1 1 0 00-1.4 0l-6 6a1 1 0 001.4 1.42L9 12.4l3.3 3.3a1 1 0 001.4 0L20 9.4V15z"></path>
  </svg>
);

const ArrowRightIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 256 512">
    <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
  </svg>
);

const LinkHandlerIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 512 512">
    <path d="M88 192H40c-22.06 0-40 17.9-40 40v208c0 22.1 17.94 40 40 40h48c22.1 0 40-17.9 40-40V232c0-22.1-17.9-40-40-40zm8 248c0 4.4-3.59 8-8 8H40c-4.41 0-8-3.6-8-8V232c0-4.4 3.59-8 8-8h48c4.41 0 8 3.6 8 8v208zm416-218.5c0-33.9-27.6-61.5-61.5-61.5H348c11.98-27.06 18.83-53.48 18.83-67.33C366.9 62.84 343.6 32 304.9 32c-41.22 0-50.7 29.11-59.12 54.81C218.1 171.1 160 184.8 160 208c0 9.1 7.5 16 16 16 4.1 0 8.2-1.6 11.3-4.7 52.68-53.04 67.02-56.11 88.81-122.5C285.3 68.95 288.2 64 304.9 64c20.66 0 29.94 16.77 29.94 28.67 0 10.09-8.891 43.95-26.62 75.48a15.976 15.976 0 0 0-2.046 7.83C306.2 185.5 314 192 322.2 192h128.3c16.3 0 29.5 13.2 29.5 29.5 0 15.33-12.08 28.16-27.48 29.2-8.462.581-14.91 7.649-14.91 15.96 0 12.19 12.06 12.86 12.06 30.63 0 14.14-10.11 26.3-24.03 28.89-5.778 1.082-13.06 6.417-13.06 15.75 0 8.886 6.765 10.72 6.765 23.56 0 31.02-31.51 22.12-31.51 43.05 0 3.526 1.185 5.13 1.185 10.01C389 434.8 375.8 448 359.5 448h-55.6c-82.01 0-108.3-64.02-127.9-64.02-8.873 0-16 7.193-16 15.96-.9 16.36 64.6 80.06 143.9 80.06h55.63c33.91 0 61.5-27.58 61.5-61.47 18.55-10.86 30.33-31 30.33-53.06 0-4.797-.594-9.594-1.734-14.27 19.31-10.52 32.06-30.97 32.06-53.94 0-7.219-1.281-14.31-3.75-20.98C498.2 266.2 512 245.3 512 221.5z"></path>
  </svg>
);

const CommentIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 640 512">
    <path d="M416 176C416 78.8 322.9 0 208 0S0 78.8 0 176c0 41.48 17.07 79.54 45.44 109.6-15.17 32.34-38.65 58.07-38.95 58.38-6.514 6.836-8.309 16.91-4.568 25.67C5.754 378.4 14.26 384 23.66 384c54.19 0 97.76-20.73 125.9-39.17C168.1 349.4 187.7 352 208 352c114.9 0 208-78.8 208-176zM208 320c-16.96 0-34.04-2.098-50.75-6.232L143.7 310.4l-11.7 7.7c-20.43 13.38-51.58 28.99-89.85 32.97 9.377-12.11 22.3-30.63 32.24-51.82l9.242-19.71L68.72 263.7C44.7 238.2 32 207.9 32 176c0-79.4 78.1-144 176-144s176 64.6 176 144-79 144-176 144zm398.4 115.4c21.2-28.3 33.6-62.5 33.6-99.4 0-97.2-86-176-192-176-.315 0-.62.041-.934.043C447.5 165.3 448 170.6 448 176c0 5.43-.467 10.76-.941 16.09.341.01.641-.09.941-.09 88.22 0 160 64.6 160 144 0 28.69-9.424 56.45-27.25 80.26l-13.08 17.47 11.49 18.55c6.568 10.61 13.18 19.74 18.61 26.74-18.26-1.91-36.45-6.625-54.3-14.09l-12.69-5.305-12.58 5.557C495.9 475 472.3 480 448 480c-75.05 0-137.7-46.91-154.9-109.7-10.1 3.336-20.5 6.132-31.2 8.271C282.7 455.1 357.1 512 448 512c29.82 0 57.94-6.414 83.12-17.54C555 504.5 583.7 512 616.3 512c9.398 0 17.91-5.57 21.73-14.32 3.74-8.758 1.945-18.84-4.568-25.67-.162-.21-13.862-15.21-27.062-36.61z"></path>
  </svg>
);

const FeaturedIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 576 512">
    <path d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM405.8 317.9l27.8 162L288 403.5 142.5 480l27.8-162L52.5 203.1l162.7-23.6L288 32l72.8 147.5 162.7 23.6-117.7 114.8z"></path>
  </svg>
);

const RecentIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 512 512">
    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216zm-148.9 88.3l-81.2-59c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h14c6.6 0 12 5.4 12 12v146.3l70.5 51.3c5.4 3.9 6.5 11.4 2.6 16.8l-8.2 11.3c-3.9 5.3-11.4 6.5-16.8 2.6z"></path>
  </svg>
);

const BookmarkIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 1000 1000">
    <path
      fill="inherit"
      fillRule="evenodd"
      d="M153.906 69.336c-19.14 0-34.57 15.43-34.57 34.57v766.602l277.148-184.766 277.149 184.766V519.531c0-19.14 15.429-34.57 34.57-34.57s34.57 15.43 34.57 34.57V1000L396.484 769.141 50 1000V103.906C50 46.484 96.68 0 153.906 0h277.149c19.14 0 34.57 15.43 34.57 34.57s-15.43 34.57-34.57 34.57H153.906v.196ZM777.539 0c19.141 0 34.57 15.43 34.57 34.57v138.477c0 19.14-15.429 34.57-34.57 34.57H639.062c-19.14 0-34.57-15.43-34.57-34.57 0-19.141 15.43-34.57 34.57-34.57h103.907V34.57c0-19.14 15.429-34.57 34.57-34.57Z"
      clipRule="evenodd"
    ></path>
    <path
      fill="inherit"
      fillRule="evenodd"
      d="M742.969 173.242c0-19.14 15.43-34.57 34.57-34.57h138.477c19.14 0 34.57 15.43 34.57 34.57 0 19.141-15.43 34.571-34.57 34.571H812.11v103.906c0 19.14-15.43 34.57-34.571 34.57-19.14 0-34.57-15.43-34.57-34.57V173.242Z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const LikeIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 24 24">
    <path
      d="M12 21c1 0 10-5 10-12 0-3.5-3-5.956-6-6-1.5-.021-3 .5-4 2-1-1.5-2.526-2-4-2-3 0-6 2.5-6 6 0 7 9 12 10 12Z"
      stroke="stroke-current"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const PostCommentIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 24 24" fill="none">
    <path
      d="M9 14H13M9 10.5H16M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.1971 3.23374 14.3397 3.65806 15.3845C3.73927 15.5845 3.77988 15.6845 3.798 15.7653C3.81572 15.8443 3.8222 15.9028 3.82221 15.9839C3.82222 16.0667 3.80718 16.1569 3.77711 16.3374L3.18413 19.8952C3.12203 20.2678 3.09098 20.4541 3.14876 20.5888C3.19933 20.7067 3.29328 20.8007 3.41118 20.8512C3.54589 20.909 3.73218 20.878 4.10476 20.8159L7.66265 20.2229C7.84309 20.1928 7.9333 20.1778 8.01613 20.1778C8.09715 20.1778 8.15566 20.1843 8.23472 20.202C8.31554 20.2201 8.41552 20.2607 8.61549 20.3419C9.6603 20.7663 10.8029 21 12 21Z"
      stroke="stroke-current"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const ArrowupIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 24 24">
    <path
      d="m6 15 6-6 6 6"
      stroke="stroke-current"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const ArrowDownIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 20 20">
    <path
      d="m5 7.5 5 5 5-5"
      stroke="stroke-current"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const TrashIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 18 18">
    <path
      d="m3 3.75.484 8.232c.094 1.59.14 2.385.48 2.989a3 3 0 0 0 1.3 1.226c.622.303 1.419.303 3.012.303h1.448c1.593 0 2.39 0 3.012-.303a3 3 0 0 0 1.3-1.226c.34-.604.386-1.399.48-2.99L15 3.75m-12 0H1.5m1.5 0h12m0 0h1.5m-4.5 0-.203-.609c-.197-.59-.295-.885-.478-1.103a1.5 1.5 0 0 0-.601-.434C10.453 1.5 10.142 1.5 9.52 1.5H8.48c-.622 0-.933 0-1.198.104a1.5 1.5 0 0 0-.602.434c-.182.218-.28.513-.477 1.103L6 3.75M7.5 7.5v5.25m3-5.25v5.25"
      stroke="stroke-current"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const EmptyFileIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 18 18">
    <path
      d="M10.5 1.875V4.2c0 .63 0 .945.123 1.186.107.211.28.384.491.491C11.354 6 11.67 6 12.3 6h2.325M6.75 9h4.5m-4.5 3h3M15 6.244V12.9c0 1.26 0 1.89-.245 2.371-.216.424-.56.768-.984.984-.48.245-1.11.245-2.371.245H6.6c-1.26 0-1.89 0-2.371-.245a2.25 2.25 0 0 1-.984-.983C3 14.79 3 14.16 3 12.9V5.1c0-1.26 0-1.89.245-2.371a2.25 2.25 0 0 1 .984-.984C4.709 1.5 5.339 1.5 6.6 1.5h3.656c.367 0 .55 0 .723.041.153.037.3.098.433.18.152.093.281.223.54.482l2.345 2.344c.26.26.39.39.482.54.082.135.143.281.18.434.041.173.041.356.041.723Z"
      stroke="stroke-current"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const ArrowLeftIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 8 12">
    <path
      d="m6.667 1-5 5 5 5"
      stroke="stroke-current"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

const EllipsisVerticalIcon = (props: IconProps) => {
  return (
    <svg {...props} fill="none" viewBox="0 0 4 16">
      <path
        d="M2 8.834a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667ZM2 14.667A.833.833 0 1 0 2 13a.833.833 0 0 0 0 1.667ZM2 3a.833.833 0 1 0 0-1.666A.833.833 0 0 0 2 3Z"
        stroke="stroke-outline"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

const AddFileIcon = (props: IconProps) => {
  return (
    <svg {...props} fill="none" viewBox="0 0 15 18">
      <path
        d="M13.5 9.375V5.1c0-1.26 0-1.89-.245-2.371a2.25 2.25 0 0 0-.984-.984C11.791 1.5 11.162 1.5 9.9 1.5H5.1c-1.26 0-1.89 0-2.371.245a2.25 2.25 0 0 0-.984.984C1.5 3.209 1.5 3.839 1.5 5.1v7.8c0 1.26 0 1.89.245 2.371.216.424.56.768.984.984.48.245 1.11.245 2.37.245h2.776m4.125 0v-2.25m0 0V12m0 2.25H9.75m2.25 0h2.25m-3.75-9h-6m4.5 3H4.5"
        stroke="stroke-current"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

const EditorSidebarIcon = (props: IconProps) => {
  return (
    <svg {...props} fill="none" viewBox="0 0 18 18">
      <path
        d="M5.25 8.167H3.583M5.25 11.5H3.583M5.25 4.833H3.583M7.333 1.5v15m-2.5 0h8.334c1.166 0 1.75 0 2.196-.227.392-.2.71-.518.91-.91.227-.446.227-1.03.227-2.196V4.833c0-1.166 0-1.75-.227-2.195-.2-.392-.518-.711-.91-.91-.446-.228-1.03-.228-2.196-.228H4.833c-1.166 0-1.75 0-2.195.227-.392.2-.711.519-.91.91-.228.446-.228 1.03-.228 2.196v8.334c0 1.166 0 1.75.227 2.196.2.392.519.71.91.91.446.227 1.03.227 2.196.227Z"
        stroke="stroke-current"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

const TimeIcon = (props: IconProps) => (
  <svg {...props} fill="none" viewBox="0 0 24 24">
    <path
      d="M12.45 8.4a.75.75 0 0 0-1.5 0h1.5ZM11.7 12h-.75c0 .25.125.485.334.624L11.7 12Zm2.284 2.424a.75.75 0 1 0 .832-1.248l-.832 1.248ZM5.47 17.409a.75.75 0 0 0-1.132.983l1.132-.983Zm4.14 3.345.175-.73-.174.73ZM3.633 6.526a.75.75 0 0 0 1.241.842l-1.241-.842ZM4.35 3.9a.75.75 0 0 0-1.5 0h1.5ZM3.6 7.5h-.75c0 .414.336.75.75.75V7.5Zm3.15.75a.75.75 0 0 0 0-1.5v1.5Zm4.2.15V12h1.5V8.4h-1.5Zm.334 4.224 2.7 1.8.832-1.248-2.7-1.8-.832 1.248Zm-6.946 5.768a9.75 9.75 0 0 0 5.098 3.092l.349-1.46A8.25 8.25 0 0 1 5.47 17.41l-1.132.983Zm5.098 3.092a9.75 9.75 0 0 0 5.946-.456l-.567-1.389a8.25 8.25 0 0 1-5.03.386l-.349 1.459Zm5.946-.456a9.75 9.75 0 0 0 4.568-3.832l-1.27-.8a8.25 8.25 0 0 1-3.865 3.243l.567 1.39Zm4.568-3.832a9.75 9.75 0 0 0 1.483-5.775l-1.497.089a8.25 8.25 0 0 1-1.255 4.887l1.269.8Zm1.483-5.775a9.75 9.75 0 0 0-2.157-5.559l-1.166.944a8.25 8.25 0 0 1 1.826 4.704l1.497-.09Zm-2.157-5.559a9.75 9.75 0 0 0-4.99-3.263l-.399 1.446a8.25 8.25 0 0 1 4.223 2.761l1.166-.944ZM14.286 2.6a9.75 9.75 0 0 0-5.958.253l.519 1.407a8.25 8.25 0 0 1 5.04-.214l.398-1.446Zm-5.958.253a9.75 9.75 0 0 0-4.696 3.674l1.241.842A8.25 8.25 0 0 1 8.847 4.26l-.52-1.407ZM2.85 3.9v3.6h1.5V3.9h-1.5Zm.75 4.35h3.15v-1.5H3.6v1.5Z"
      fill="fill-current"
    ></path>
  </svg>
);

const ExploreIcon = (props: IconProps) => (
  <svg {...props} viewBox="0 0 512 512">
    <path d="M232 256c0-13.3 10.7-24 24-24s24 10.7 24 24-10.7 24-24 24-24-10.7-24-24zm116.6-133.1c25-8.3 48.8 15.5 40.5 40.5l-48.9 146.5c-4.7 14.3-16 25.6-30.3 30.3l-146.5 48.9c-25 8.3-48.8-15.5-40.5-40.5l48.9-146.5c4.7-14.3 16-25.6 30.3-30.3l146.5-48.9zm10.1 30.4-146.5 48.8c-4.7 1.6-8.5 5.4-10.1 10.1l-48.8 146.5 146.5-48.8c4.7-1.6 8.5-5.4 10.1-10.1l48.8-146.5zM0 256C0 114.6 114.6 0 256 0s256 114.6 256 256-114.6 256-256 256S0 397.4 0 256zm256 224c123.7 0 224-100.3 224-224S379.7 32 256 32 32 132.3 32 256s100.3 224 224 224z"></path>
  </svg>
);

export const Icons = {
  Media: MediaIcon,
  SubTitle: SubTitleIcon,
  Github: GithubIcon,
  Google: GoogleIcon,
  Logo: LogoIcon,
  Menu: MenuIcon,
  Search: SearchIcon,
  Pen: PenIcon,
  Moon: MoonIcon,
  Sun: SunIcon,
  Notification: NotificationIcon,
  NotificationPlus: NotificationPlusIcon,
  MenuDraft: MenuDraftIcon,
  MenuBookmark: MenuBookmarkIcon,
  MenuAccount: MenuAccountIcon,
  MenuLogout: MenuLogoutIcon,
  MyFeed: MyFeedIcon,
  MyBookmark: MyBookmarkIcon,
  MyDraft: MyDraftIcon,
  Trending: TrendingIcon,
  ArrowRight: ArrowRightIcon,
  LinkHandler: LinkHandlerIcon,
  Comment: CommentIcon,
  Featured: FeaturedIcon,
  Recent: RecentIcon,
  Bookmark: BookmarkIcon,
  Like: LikeIcon,
  PostComment: PostCommentIcon,
  Arrowup: ArrowupIcon,
  ArrowDown: ArrowDownIcon,
  Trash: TrashIcon,
  EmptyFile: EmptyFileIcon,
  EllipsisVertical: EllipsisVerticalIcon,
  ArrowLeft: ArrowLeftIcon,
  AddFile: AddFileIcon,
  EditorSidebar: EditorSidebarIcon,
  Time: TimeIcon,
  Explore: ExploreIcon,
};
