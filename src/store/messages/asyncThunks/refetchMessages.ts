import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../..';
import { ServerToClientMessage } from '../../../../server/chat-socket/socket-types';
import createInitialEntity from '../createInitialEntity';
import { fetchingStatus } from '../status';

const refetchMessages = createAsyncThunk<ServerToClientMessage[], string>(
  'messages/refetch',
  async (userId: string, { getState, rejectWithValue }) => {
    if (fetchingStatus.isFetching) fetchingStatus.dumpSession = true;
    fetchingStatus.isFetching = true;

    const state = getState() as RootState;
    const { token } = state.auth;
    const user =
      state.messages.userEntities[userId] ?? createInitialEntity(userId);
    const from = 0;
    const to = user.count - 1;

    try {
      const request = await axios.get(`/api/messages/${userId}/${from}-${to}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return request.data;
    } catch {
      rejectWithValue(null);
    } finally {
      fetchingStatus.isFetching = false;
    }
    return Promise.reject();
  }
);
export default refetchMessages;
