import React from "react";
import styles from "./styles.module.css";

interface CategoryBoxWithHashnodeListProps {
  title: React.ReactNode;
  description: React.ReactNode;
  children: React.ReactNode;
  isOutSideContent?: boolean;
}

export default function CategoryBoxWithHashnodeList({
  title,
  description,
  children,
  isOutSideContent,
}: CategoryBoxWithHashnodeListProps) {
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <div className={styles.title_text}>{title}</div>
        <div className={styles.desc}>{description}</div>
        <div className={styles.icon_container}>
          <CategoryBoxWithHashnodeList.GroupIcon />
        </div>
      </div>
      {isOutSideContent ? (
        <>{children}</>
      ) : (
        <div className={styles.container_list}>{children}</div>
      )}
    </div>
  );
}

CategoryBoxWithHashnodeList.GroupIcon = function GroupIcon() {
  return (
    <>
      <svg
        width="381"
        height="120"
        viewBox="0 0 381 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon_1}
      >
        <mask
          id="mask0_48_18"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="-219"
          width="558"
          height="557"
        >
          <rect
            x="0.943115"
            y="1.10583"
            width="402.136"
            height="402.136"
            rx="10.0534"
            transform="rotate(-33.1785 0.943115 1.10583)"
            fill="url(#paint0_radial_48_18)"
          ></rect>
        </mask>
        <g mask="url(#mask0_48_18)">
          <rect
            x="223.105"
            y="60.025"
            width="79.4272"
            height="79.4272"
            rx="23.5"
            transform="rotate(-45.6785 223.105 60.025)"
            stroke="#C7D2FE"
          ></rect>
          <rect
            x="185.195"
            y="60.4732"
            width="133.045"
            height="133.045"
            rx="23.5"
            transform="rotate(-45.6785 185.195 60.4732)"
            stroke="#C7D2FE"
          ></rect>
          <rect
            x="147.284"
            y="60.9224"
            width="186.663"
            height="186.663"
            rx="23.5"
            transform="rotate(-45.6785 147.284 60.9224)"
            stroke="#C7D2FE"
          ></rect>
          <rect
            x="109.373"
            y="61.3715"
            width="240.281"
            height="240.281"
            rx="23.5"
            transform="rotate(-45.6785 109.373 61.3715)"
            stroke="#C7D2FE"
          ></rect>
          <rect
            x="71.4607"
            y="61.8207"
            width="293.9"
            height="293.9"
            rx="23.5"
            transform="rotate(-45.6785 71.4607 61.8207)"
            stroke="#C7D2FE"
          ></rect>
          <rect
            x="33.5496"
            y="62.2698"
            width="347.518"
            height="347.518"
            rx="23.5"
            transform="rotate(-45.6785 33.5496 62.2698)"
            stroke="#C7D2FE"
          ></rect>
          <rect
            x="-4.36057"
            y="62.7181"
            width="401.136"
            height="401.136"
            rx="23.5"
            transform="rotate(-45.6785 -4.36057 62.7181)"
            stroke="#C7D2FE"
          ></rect>
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M272.75 53C272.75 50.9289 274.429 49.25 276.5 49.25H283.5C285.571 49.25 287.25 50.9289 287.25 53V68C287.25 68.2717 287.103 68.5222 286.866 68.6547C286.629 68.7873 286.338 68.7811 286.107 68.6387L280.131 64.9613C280.051 64.9118 279.949 64.9118 279.869 64.9613L273.893 68.6387C273.662 68.7811 273.371 68.7873 273.134 68.6547C272.897 68.5222 272.75 68.2717 272.75 68V53ZM283.53 56.0303C283.823 55.7374 283.823 55.2626 283.53 54.9697C283.237 54.6768 282.763 54.6768 282.47 54.9697L279 58.4393L277.53 56.9697C277.237 56.6768 276.763 56.6768 276.47 56.9697C276.177 57.2626 276.177 57.7374 276.47 58.0303L278.47 60.0303C278.763 60.3232 279.237 60.3232 279.53 60.0303L283.53 56.0303Z"
          fill="#818CF8"
        ></path>
        <defs>
          <radialGradient
            id="paint0_radial_48_18"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(202.011 202.174) rotate(90) scale(201.068 201.068)"
          >
            <stop></stop>
            <stop offset="1" stopOpacity="0"></stop>
          </radialGradient>
        </defs>
      </svg>
      <svg
        width="207"
        height="132"
        viewBox="0 0 207 132"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon_2}
      >
        <mask
          id="mask0_48_572"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="-90"
          width="313"
          height="313"
        >
          <rect
            x="58.6752"
            y="37.5043"
            width="145.589"
            height="144.473"
            rx="5.62832"
            transform="rotate(-33.1785 58.6752 37.5043)"
            fill="url(#paint0_radial_48_572)"
          ></rect>
        </mask>
        <g mask="url(#mask0_48_572)">
          <rect
            x="125.554"
            y="67.1423"
            width="44.0266"
            height="44.0266"
            rx="12.9362"
            transform="rotate(-45.6785 125.554 67.1423)"
            stroke="#C7D2FE"
          ></rect>
          <rect
            x="104.33"
            y="67.3932"
            width="74.0443"
            height="74.0443"
            rx="12.9362"
            transform="rotate(-45.6785 104.33 67.3932)"
            stroke="#C7D2FE"
          ></rect>
          <rect
            x="83.1057"
            y="67.6447"
            width="104.062"
            height="104.062"
            rx="12.9362"
            transform="rotate(-45.6785 83.1057 67.6447)"
            stroke="#C7D2FE"
          ></rect>
          <rect
            x="61.8813"
            y="67.896"
            width="134.08"
            height="134.08"
            rx="12.9362"
            transform="rotate(-45.6785 61.8813 67.896)"
            stroke="#C7D2FE"
          ></rect>
          <rect
            x="40.6569"
            y="68.1476"
            width="164.097"
            height="164.097"
            rx="12.9362"
            transform="rotate(-45.6785 40.6569 68.1476)"
            stroke="#C7D2FE"
          ></rect>
          <rect
            x="19.4325"
            y="68.3991"
            width="194.115"
            height="194.115"
            rx="12.9362"
            transform="rotate(-45.6785 19.4325 68.3991)"
            stroke="#C7D2FE"
          ></rect>
          <rect
            x="-1.79117"
            y="68.6501"
            width="224.133"
            height="224.133"
            rx="12.9362"
            transform="rotate(-45.6785 -1.79117 68.6501)"
            stroke="#C7D2FE"
          ></rect>
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M150.58 62.2023C150.58 60.6843 151.811 59.4537 153.329 59.4537H158.459C159.977 59.4537 161.208 60.6843 161.208 62.2023V73.1965C161.208 73.3957 161.1 73.5792 160.926 73.6764C160.753 73.7735 160.54 73.769 160.37 73.6647L155.99 70.9693C155.931 70.933 155.857 70.933 155.798 70.9693L151.418 73.6647C151.248 73.769 151.036 73.7735 150.862 73.6764C150.688 73.5792 150.58 73.3957 150.58 73.1965V62.2023ZM158.482 64.4234C158.696 64.2087 158.696 63.8606 158.482 63.646C158.267 63.4313 157.919 63.4313 157.704 63.646L155.161 66.189L154.084 65.1119C153.869 64.8972 153.521 64.8972 153.307 65.1119C153.092 65.3265 153.092 65.6746 153.307 65.8893L154.772 67.3552C154.987 67.5698 155.335 67.5698 155.55 67.3552L158.482 64.4234Z"
          fill="#818CF8"
        ></path>
        <defs>
          <radialGradient
            id="paint0_radial_48_572"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(131.47 109.741) rotate(90) scale(72.2363 72.7945)"
          >
            <stop></stop>
            <stop offset="1" stopOpacity="0"></stop>
          </radialGradient>
        </defs>
      </svg>
      <svg
        width="381"
        height="120"
        viewBox="0 0 381 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon_3}
      >
        <mask
          id="mask0_52_4664"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="-219"
          width="558"
          height="557"
        >
          <rect
            x="0.943115"
            y="1.10571"
            width="402.136"
            height="402.136"
            rx="10.0534"
            transform="rotate(-33.1785 0.943115 1.10571)"
            fill="url(#paint0_radial_52_4664)"
          ></rect>
        </mask>
        <g mask="url(#mask0_52_4664)">
          <rect
            x="223.105"
            y="60.0248"
            width="79.4272"
            height="79.4272"
            rx="23.5"
            transform="rotate(-45.6785 223.105 60.0248)"
            stroke="#334155"
            strokeOpacity="0.8"
          ></rect>
          <rect
            x="185.195"
            y="60.4731"
            width="133.045"
            height="133.045"
            rx="23.5"
            transform="rotate(-45.6785 185.195 60.4731)"
            stroke="#334155"
            strokeOpacity="0.8"
          ></rect>
          <rect
            x="147.284"
            y="60.9223"
            width="186.663"
            height="186.663"
            rx="23.5"
            transform="rotate(-45.6785 147.284 60.9223)"
            stroke="#334155"
            strokeOpacity="0.8"
          ></rect>
          <rect
            x="109.373"
            y="61.3715"
            width="240.281"
            height="240.281"
            rx="23.5"
            transform="rotate(-45.6785 109.373 61.3715)"
            stroke="#334155"
            strokeOpacity="0.8"
          ></rect>
          <rect
            x="71.4607"
            y="61.8205"
            width="293.9"
            height="293.9"
            rx="23.5"
            transform="rotate(-45.6785 71.4607 61.8205)"
            stroke="#334155"
            strokeOpacity="0.8"
          ></rect>
          <rect
            x="33.5496"
            y="62.2697"
            width="347.518"
            height="347.518"
            rx="23.5"
            transform="rotate(-45.6785 33.5496 62.2697)"
            stroke="#334155"
            strokeOpacity="0.8"
          ></rect>
          <rect
            x="-4.36057"
            y="62.7179"
            width="401.136"
            height="401.136"
            rx="23.5"
            transform="rotate(-45.6785 -4.36057 62.7179)"
            stroke="#334155"
            strokeOpacity="0.8"
          ></rect>
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M272.75 53C272.75 50.9289 274.429 49.25 276.5 49.25H283.5C285.571 49.25 287.25 50.9289 287.25 53V68C287.25 68.2717 287.103 68.5222 286.866 68.6547C286.629 68.7873 286.338 68.7811 286.107 68.6387L280.131 64.9613C280.051 64.9118 279.949 64.9118 279.869 64.9613L273.893 68.6387C273.662 68.7811 273.371 68.7873 273.134 68.6547C272.897 68.5222 272.75 68.2717 272.75 68V53ZM283.53 56.0303C283.823 55.7374 283.823 55.2626 283.53 54.9697C283.237 54.6768 282.763 54.6768 282.47 54.9697L279 58.4393L277.53 56.9697C277.237 56.6768 276.763 56.6768 276.47 56.9697C276.177 57.2626 276.177 57.7374 276.47 58.0303L278.47 60.0303C278.763 60.3232 279.237 60.3232 279.53 60.0303L283.53 56.0303Z"
          fill="#4338CA"
        ></path>
        <defs>
          <radialGradient
            id="paint0_radial_52_4664"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(202.011 202.174) rotate(90) scale(201.068 201.068)"
          >
            <stop></stop>
            <stop offset="1" stopOpacity="0"></stop>
          </radialGradient>
        </defs>
      </svg>
      <svg
        width="207"
        height="132"
        viewBox="0 0 207 132"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon_4}
      >
        <mask
          id="mask0_45_18740"
          style={{ maskType: "alpha" }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="-90"
          width="313"
          height="313"
        >
          <rect
            x="58.6768"
            y="37.5082"
            width="145.589"
            height="144.473"
            rx="5.62832"
            transform="rotate(-33.1785 58.6768 37.5082)"
            fill="url(#paint0_radial_45_18740)"
          ></rect>
        </mask>
        <g mask="url(#mask0_45_18740)">
          <rect
            x="125.555"
            y="67.1462"
            width="44.0266"
            height="44.0266"
            rx="12.9362"
            transform="rotate(-45.6785 125.555 67.1462)"
            stroke="#334155"
            stopOpacity="0.8"
          ></rect>
          <rect
            x="104.332"
            y="67.3972"
            width="74.0443"
            height="74.0443"
            rx="12.9362"
            transform="rotate(-45.6785 104.332 67.3972)"
            stroke="#334155"
            stopOpacity="0.8"
          ></rect>
          <rect
            x="83.1074"
            y="67.6487"
            width="104.062"
            height="104.062"
            rx="12.9362"
            transform="rotate(-45.6785 83.1074 67.6487)"
            stroke="#334155"
            stopOpacity="0.8"
          ></rect>
          <rect
            x="61.8828"
            y="67.9001"
            width="134.08"
            height="134.08"
            rx="12.9362"
            transform="rotate(-45.6785 61.8828 67.9001)"
            stroke="#334155"
            stopOpacity="0.8"
          ></rect>
          <rect
            x="40.6587"
            y="68.1517"
            width="164.097"
            height="164.097"
            rx="12.9362"
            transform="rotate(-45.6785 40.6587 68.1517)"
            stroke="#334155"
            stopOpacity="0.8"
          ></rect>
          <rect
            x="19.4341"
            y="68.403"
            width="194.115"
            height="194.115"
            rx="12.9362"
            transform="rotate(-45.6785 19.4341 68.403)"
            stroke="#334155"
            stopOpacity="0.8"
          ></rect>
          <rect
            x="-1.78952"
            y="68.654"
            width="224.133"
            height="224.133"
            rx="12.9362"
            transform="rotate(-45.6785 -1.78952 68.654)"
            stroke="#334155"
            stopOpacity="0.8"
          ></rect>
        </g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M150.582 62.2061C150.582 60.6882 151.812 59.4576 153.33 59.4576H158.461C159.979 59.4576 161.209 60.6882 161.209 62.2061V73.2004C161.209 73.3995 161.102 73.5831 160.928 73.6802C160.754 73.7774 160.541 73.7729 160.371 73.6685L155.991 70.9731C155.933 70.9369 155.858 70.9369 155.799 70.9731L151.419 73.6685C151.25 73.7729 151.037 73.7774 150.863 73.6802C150.689 73.5831 150.582 73.3995 150.582 73.2004V62.2061ZM158.483 64.4272C158.698 64.2125 158.698 63.8645 158.483 63.6498C158.268 63.4351 157.92 63.4351 157.706 63.6498L155.162 66.1929L154.085 65.1157C153.871 64.901 153.523 64.901 153.308 65.1157C153.093 65.3304 153.093 65.6784 153.308 65.8931L154.774 67.359C154.988 67.5737 155.336 67.5737 155.551 67.359L158.483 64.4272Z"
          fill="#4338CA"
        ></path>
        <defs>
          <radialGradient
            id="paint0_radial_45_18740"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(131.471 109.745) rotate(90) scale(72.2363 72.7945)"
          >
            <stop></stop>
            <stop offset="1" stopOpacity="0"></stop>
          </radialGradient>
        </defs>
      </svg>
    </>
  );
};
