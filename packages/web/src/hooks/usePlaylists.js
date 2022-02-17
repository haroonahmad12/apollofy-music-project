import { useMutation, useQuery, useInfiniteQuery, useQueryClient } from "react-query";

import queryKeys from "../queries/constants";
import playlistsApi from "../api/api-playlists";
import * as authService from "../services/auth";

const queryOptions = {
  staleTime: 600000,
  cacheTime: 900000,
  keepPreviousData: true,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export function useFetchPlaylist(playlistId, params = {}) {
  const { extend } = params;
  const { data = {}, query } = useQuery(
    [queryKeys.playlist, playlistId, extend],
    () => playlistsApi.getPlaylist(playlistId, { extend }),
    queryOptions,
  );

  return { ...query, data };
}

export function useFetchPlaylists(params = {}) {
  const { page, limit, sort, order, userId } = params;
  const { data = [], ...query } = useQuery(
    [queryKeys.playlists, page, limit, order, sort, userId],
    () => playlistsApi.getPlaylists({ page, limit, sort, order, user: userId }),
    queryOptions,
  );

  return { ...query, data };
}

export function useInfinitePlaylists(params = {}) {
  const { limit, sort, order, userId } = params;
  const { data = [], ...query } = useInfiniteQuery(
    [queryKeys.playlists, limit, order, sort, userId],
    ({ pageParam: page = 1 }) =>
      playlistsApi.getPlaylists({ page, limit, order, sort, user: userId }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.data.page < lastPage.data.pages ? lastPage.data.page + 1 : undefined,
    },
  );

  return { ...query, data };
}

export function useFetchUserPlaylists(params = {}) {
  const { page, sort, order, limit, extend } = params;
  const { data = [], ...query } = useQuery(
    [queryKeys.userPlaylists, page, sort, order, limit, extend],
    async () => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken)
        return playlistsApi.getUserPlaylists(authToken, { page, sort, order, limit, extend });

      return Promise.reject(new Error("User authentication required"));
    },
    queryOptions,
  );

  return { ...query, data };
}

export async function usePrefetchPlaylists(params = {}) {
  const { page, limit, sort, order, userId } = params;
  const queryClient = useQueryClient();

  await queryClient.prefetchQuery([queryKeys.playlists, page, limit, sort, order, userId], () =>
    playlistsApi.getPlaylists({ page, limit, order, sort, user: userId }),
  );
}

export function useCreatePlaylist() {
  const queryClient = useQueryClient();
  const createPlaylist = useMutation(
    async (playlist) => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return playlistsApi.createPlaylist(authToken, playlist);

      return Promise.reject(new Error("User authentication required"));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.currentUser);
        queryClient.invalidateQueries(queryKeys.userPlaylists);
        queryClient.refetchQueries(queryKeys.playlists);
      },
    },
  );

  return createPlaylist;
}

export function useUpdatePlaylist() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (playlist) => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return playlistsApi.updatePlaylist(authToken, playlist);

      return Promise.reject(new Error("User authentication required"));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.playlist);
        queryClient.invalidateQueries(queryKeys.currentUser);
        queryClient.invalidateQueries(queryKeys.userPlaylists);
        queryClient.refetchQueries(queryKeys.playlists);
      },
    },
  );

  return mutation;
}

export function useDeletePlaylist() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (playlistId) => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return playlistsApi.deletePlaylist(authToken, playlistId);

      return Promise.reject(new Error("User authentication required"));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.playlist);
        queryClient.invalidateQueries(queryKeys.currentUser);
        queryClient.invalidateQueries(queryKeys.userPlaylists);
        queryClient.refetchQueries(queryKeys.playlists);
      },
    },
  );

  return mutation;
}

export function useFollowPlaylist() {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    async (playlistId) => {
      const authToken = await authService.getCurrentUserToken();

      if (authToken) return playlistsApi.followPlaylist(authToken, playlistId);

      return Promise.reject(new Error("User authentication required"));
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.playlist);
        queryClient.invalidateQueries(queryKeys.currentUser);
        queryClient.invalidateQueries(queryKeys.userPlaylists);
        queryClient.refetchQueries(queryKeys.playlists);
      },
    },
  );

  return mutation;
}
