import {
  Popover,
  PopoverTrigger,
  Avatar,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  Flex,
  Heading,
  PopoverCloseButton,
  PopoverBody,
  Button,
} from '@chakra-ui/react';
import { CogIcon, LogoutIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { accountApi } from '../../store/account-api';
import { authActions } from '../../store/auth';
import { contactsActions } from '../../store/contacts';
import { feedApi } from '../../store/feed-api';
import { useAppDispatch } from '../../store/hooks';
import { messagesActions } from '../../store/messages';
import { profileApi } from '../../store/profile-api';
import HeroIcon from '../chakra-ui/HeroIcon';

interface Props {
  user: { avatarSrc?: string; fullName?: string };
}

const NavBarAccountPopover: React.FC<Props> = ({ user }) => {
  const { avatarSrc, fullName } = user;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    dispatch(feedApi.util.resetApiState());
    dispatch(profileApi.util.resetApiState());
    dispatch(accountApi.util.resetApiState());
    dispatch(messagesActions.clearAll());
    dispatch(contactsActions.clearAll());
    dispatch(authActions.logOut());
    navigate('/login');
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar
          as="button"
          name={avatarSrc ? undefined : fullName}
          src={avatarSrc}
        />
      </PopoverTrigger>
      <PopoverContent mt={3} mr={3}>
        <PopoverArrow />
        <PopoverHeader>
          <Flex alignItems="center" gap={3}>
            <Avatar name={fullName} src={avatarSrc} />
            <Heading as="span" size="md">
              {fullName}
            </Heading>
          </Flex>
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Flex direction="column">
            <Button
              leftIcon={<HeroIcon as={CogIcon} />}
              variant="ghost"
              justifyContent="flex-start"
            >
              Settings
            </Button>

            <Button
              leftIcon={<HeroIcon as={LogoutIcon} />}
              variant="ghost"
              justifyContent="flex-start"
              onClick={logOutHandler}
            >
              Log out
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default NavBarAccountPopover;