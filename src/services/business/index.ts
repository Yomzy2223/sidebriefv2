import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TCreateBusinessPayload, TCreateRequestPayload } from "./types";
import {
  getBusinessRequest,
  createBusinessRequest,
  createProductRequest,
  getUserBusinessRequests,
  updateBusinessRequest,
} from "./operations";

export const useCreateBusinessRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TCreateBusinessPayload) => createBusinessRequest(payload),
    mutationKey: ["create new product"],
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["business requests"] });
    },
  });
};

export const useUpdateBusinessRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TCreateBusinessPayload }) =>
      updateBusinessRequest({ id, payload }),
    mutationKey: ["update new product"],
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["business requests"] });
    },
  });
};

export const useCreateProductRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TCreateRequestPayload) => createProductRequest(payload),
    mutationKey: ["create new product"],
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries({ queryKey: ["business requests"] });
    },
  });
};

export const useGetBusinessRequest = ({ id }: { id: string }) =>
  useQuery({
    queryFn: () => getBusinessRequest({ id }),
    queryKey: ["business requests", id],
    enabled: !!id,
  });

export const useGetUserBusinessRequests = ({ userId }: { userId: string }) =>
  useQuery({
    queryFn: () => getUserBusinessRequests({ userId }),
    queryKey: ["business requests", userId],
    enabled: !!userId,
  });
