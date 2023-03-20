import React from "react";

const AddFile: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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

export default AddFile;
