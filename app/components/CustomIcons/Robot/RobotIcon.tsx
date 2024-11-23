import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const RobotIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill="#4894FE"
      d="M12 1.44c-1.06 0-1.92.86-1.92 1.92a1.92 1.92 0 0 0 1.44 1.853V6.72H7.215a3.859 3.859 0 0 0-3.855 3.855v1.905H.96v5.76h2.4v4.32h17.28v-4.32h2.4v-5.76h-2.4v-1.905a3.859 3.859 0 0 0-3.855-3.855H12.48V5.213a1.918 1.918 0 0 0 1.44-1.853c0-1.06-.86-1.92-1.92-1.92Zm0 .96c.529 0 .96.431.96.96 0 .529-.431.96-.96.96a.962.962 0 0 1-.96-.96c0-.529.431-.96.96-.96ZM7.215 7.68h9.57a2.9 2.9 0 0 1 2.895 2.895V21.6H16.8v-3.84H7.2v3.84H4.32V10.575A2.9 2.9 0 0 1 7.215 7.68Zm1.665 2.88c-1.19 0-2.16.97-2.16 2.16 0 1.19.97 2.16 2.16 2.16 1.19 0 2.16-.97 2.16-2.16 0-1.19-.97-2.16-2.16-2.16Zm6.24 0c-1.19 0-2.16.97-2.16 2.16 0 1.19.97 2.16 2.16 2.16 1.19 0 2.16-.97 2.16-2.16 0-1.19-.97-2.16-2.16-2.16Zm-6.24.96a1.201 1.201 0 0 1 0 2.4 1.201 1.201 0 0 1 0-2.4Zm6.24 0a1.201 1.201 0 0 1 0 2.4 1.201 1.201 0 0 1 0-2.4Zm-13.2 1.92h1.44v3.84H1.92v-3.84Zm18.72 0h1.44v3.84h-1.44v-3.84ZM8.16 18.72h1.92v2.88H8.16v-2.88Zm2.88 0h1.92v2.88h-1.92v-2.88Zm2.88 0h1.92v2.88h-1.92v-2.88Z"
    />
  </Svg>
);
export default RobotIcon;
