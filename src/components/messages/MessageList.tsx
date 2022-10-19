import { Center, Circle, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { ServerToClientMessage } from '../../../server/chat-socket/socket-types';
import { useAppSelector } from '../../store/hooks';
import MessagesGroup from './MessagesGroup';
import toFancyMessages from './toFancyMessages';

interface Props {
  messages: ServerToClientMessage[];
  isLoading?: boolean;
  isComplete?: boolean;
  fetchMoreMessages: () => any;
}

const getScrollDiff = (el: Element) =>
  el.scrollHeight - (el.clientHeight - el.scrollTop);

const MessageList: React.FC<Props> = ({
  messages,
  isLoading,
  isComplete,
  fetchMoreMessages,
}) => {
  const userId = useAppSelector((state) => state.auth.userId);
  const fancyMessages = toFancyMessages(messages);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollHandler = (event: React.UIEvent) => {
    const target = event.currentTarget;
    const diff = getScrollDiff(target);
    if (diff < 10) {
      fetchMoreMessages();
    }
  };

  useEffect(() => {
    if (getScrollDiff(listRef.current!) < 10) {
      fetchMoreMessages();
    }
  }, [messages.length, fetchMoreMessages]);

  const style = {
    flexDirection: 'column-reverse',
    position: 'absolute',
    bottom: '0',
    paddingTop: 4,
    width: 'full',
    maxHeight: 'full',
    overflowY: 'auto',
    overscrollBehavior: 'none',
  };

  if (!userId) return <span>Unexpected error</span>;

  return (
    <Flex sx={style} onScroll={scrollHandler} ref={listRef}>
      {fancyMessages.map((group) => (
        <MessagesGroup
          key={group.messages[0]._id}
          group={group}
          userId={userId}
        />
      ))}
      <Center boxSize="100%" pt={5} pb={8}>
        {!isComplete && (
          <Spinner visibility={isLoading ? 'visible' : 'hidden'} />
        )}
        {isComplete && (
          <Text opacity="0.7" fontSize="xs">
            Beginning of conversation
          </Text>
        )}
      </Center>
    </Flex>
  );
};

export default MessageList;
