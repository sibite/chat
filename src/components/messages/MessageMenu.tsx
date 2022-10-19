import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import { DotsVerticalIcon, TrashIcon } from '@heroicons/react/outline';
import useMessageSender from '../../hooks/useMessagesSender';
import HeroIcon from '../chakra-ui/HeroIcon';

interface Props {
  messageId: string;
  profileId: string;
}

const MessageMenu: React.FC<Props> = ({ profileId, messageId }) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { deleteMessage } = useMessageSender(profileId);

  const deleteHandler = () => {
    deleteMessage(messageId);
  };

  const style = {
    opacity: isOpen ? 1 : 0,
    transition: 'all 150ms',
  };

  return (
    <Box className="toolbar" alignSelf="center" sx={style}>
      <Menu onOpen={onOpen} onClose={onClose}>
        <MenuButton
          as={IconButton}
          aria-label="Message menu"
          icon={<HeroIcon as={DotsVerticalIcon} />}
          variant="ghost"
          size="sm"
        />
        <MenuList>
          <MenuItem
            aria-label="Delete message"
            icon={<HeroIcon as={TrashIcon} />}
            onClick={deleteHandler}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};
export default MessageMenu;