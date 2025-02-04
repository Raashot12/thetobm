import React from 'react';
import { Box } from '@mantine/core';
import { appColors } from '../appColors';
import FooterSection from '../Footer/FooterSection';
import Navbar from '../Navigation/Navbar';
import HeaderTitle from '../shared/HeaderTitle';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

// interface MousePosition {
//   x?: number;
//   y?: number;
//   centerX?: number;
//   centerY?: number;
// }

// function getRelativeCoordinates(event: React.MouseEvent, referenceElement: HTMLElement | null) {
//   if (!referenceElement) return { x: 0, y: 0, centerX: 0, centerY: 0, width: 0, height: 0 };

//   const position = {
//     x: event.pageX,
//     y: event.pageY,
//   };

//   const offset = {
//     left: referenceElement.offsetLeft,
//     top: referenceElement.offsetTop,
//     width: referenceElement.clientWidth,
//     height: referenceElement.clientHeight,
//   };

//   let reference = referenceElement.offsetParent as HTMLElement;

//   while (reference) {
//     offset.left += reference.offsetLeft;
//     offset.top += reference.offsetTop;
//     reference = reference.offsetParent as HTMLElement;
//   }

//   return {
//     x: position.x - offset.left,
//     y: position.y - offset.top,
//     width: offset.width,
//     height: offset.height,
//     centerX: (position.x - offset.left - offset.width / 2) / (offset.width / 2),
//     centerY: (position.y - offset.top - offset.height / 2) / (offset.height / 2),
//   };
// }

export function Layout({ children, pageTitle }: LayoutProps) {
  // const [mousePosition, setMousePosition] = useState<MousePosition>({});
  // const boxRef = useRef<HTMLDivElement | null>(null);

  // const handleMouseMove = (e: React.MouseEvent) => {
  //   if (boxRef.current) {
  //     setMousePosition(getRelativeCoordinates(e, boxRef.current));
  //   }
  // };

  return (
    <>
      <HeaderTitle title={pageTitle} />
      <Navbar />
      <Box sx={{ background: appColors?.white }}>{children}</Box>
      <FooterSection />
    </>
  );
}
// <motion.div
//       style={{
//         position: 'absolute',
//         width: '20px',
//         height: '20px',
//         margin: '-10px',
//         borderRadius: 10,
//         backgroundColor: 'gold',
//         zIndex: 2,
//       }}
//       animate={{
//         x: mousePosition.x ?? 0,
//         y: mousePosition.y ?? 0,
//       }}
//       transition={{ type: 'spring' }}
//     />
//     <motion.div
//       style={{
//         position: 'absolute',
//         width: '20px',
//         height: '20px',
//         margin: '-10px',
//         borderRadius: 10,
//         backgroundColor: 'white',
//         zIndex: 2,
//       }}
//       animate={{
//         x: mousePosition.x ?? 0,
//         y: mousePosition.y ?? 0,
//       }}
//       transition={{ type: 'tween' }}
//     />
