// icon:131-spinner9 | Icomoon https://icomoon.io/ | Keyamoon
import * as React from "react";

export default function Spinner(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="center">
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        height="1em"
        width="1em"
        {...props}
      >
        <path
          fill="currentColor"
          d="M8 0A8 8 0 00.002 7.812C.094 4.033 2.968 1 6.5 1 10.09 1 13 4.134 13 8a1.5 1.5 0 003 0 8 8 0 00-8-8zm0 16a8 8 0 007.998-7.812C15.906 11.967 13.032 15 9.5 15 5.91 15 3 11.866 3 8a1.5 1.5 0 00-3 0 8 8 0 008 8z"
        />
      </svg>
    </div>
  );
}
