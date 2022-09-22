import { Center, DarkMode, Grid, IconButton, Portal } from '@chakra-ui/react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useContext } from 'react';
import PortalRefContext from '../../store/ref-context';
import HeroIcon from '../chakra-ui/HeroIcon';
import Overlay from '../misc/Overlay';

interface Props {
  children: React.ReactNode;
  onSlideLeft?: Function;
  onSlideRight?: Function;
  onClose?: Function;
}

const PhotoViewer: React.FC<Props> = ({
  children,
  onSlideLeft,
  onSlideRight,
  onClose,
}) => {
  const portalRef = useContext(PortalRefContext);

  const arrowLeftHandler = (_event: React.MouseEvent) => {
    if (onSlideLeft) onSlideLeft();
  };

  const arrowRightHandler = (_event: React.MouseEvent) => {
    if (onSlideRight) onSlideRight();
  };

  const closeHandler = (_event: React.MouseEvent) => {
    if (onClose) onClose();
  };

  const style = {
    gridTemplate: '100% / auto auto',
    bgColor: 'gray.900',
    maxHeight: 'calc(100% - 40px)',
    mx: 14,
    pointerEvents: 'auto',
  };

  const buttonMargin = 2;

  return (
    <Portal containerRef={portalRef}>
      <Overlay onClick={closeHandler}>
        <Center width="100%" height="100%" pointerEvents="none">
          <Grid sx={style}>{children}</Grid>
        </Center>
        <DarkMode>
          <Center position="absolute" top="0" left="0" height="100%">
            <IconButton
              icon={<HeroIcon as={ChevronLeftIcon} />}
              aria-label="Previous photo"
              ml={buttonMargin}
              size="md"
              variant="ghost"
              onClick={arrowLeftHandler}
            />
          </Center>
          <Center position="absolute" top="0" right="0" height="100%">
            <IconButton
              icon={<HeroIcon as={ChevronRightIcon} />}
              aria-label="Next photo"
              mr={buttonMargin}
              size="md"
              variant="ghost"
              onClick={arrowRightHandler}
            />
          </Center>
          <IconButton
            position="absolute"
            top="0"
            right="0"
            icon={<HeroIcon as={XIcon} />}
            aria-label="Close photo viewer"
            mt={buttonMargin}
            mr={buttonMargin}
            size="md"
            variant="ghost"
            onClick={closeHandler}
          />
        </DarkMode>
      </Overlay>
    </Portal>
  );
};
export default PhotoViewer;