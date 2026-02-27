import {AccountAddressInput, MoveResource} from "@aptos-labs/ts-sdk";
import {useQuery, UseQueryResult} from "react-query";
import {getAccountResources} from "..";
import {ResponseError} from "../client";
import {useGlobalState} from "../../context/globalState";

type useGetAccountResourceResponse = {
  accountResource: MoveResource | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<UseQueryResult>;
};

export function useGetAccountResource(
  address: AccountAddressInput,
  resource: string,
): useGetAccountResourceResponse {
  const [state, _setState] = useGlobalState();
  const accountResourcesResult = useQuery<Array<MoveResource>, ResponseError>(
    ["accountResource", {address}, state.network_value],
    () => getAccountResources({address}, state.network_value),
    {refetchOnWindowFocus: false},
  );

  const {isLoading, isError, refetch} = accountResourcesResult;

  const accountResource = accountResourcesResult.data?.find(
    (r) => r.type === resource,
  );

  return {accountResource, isLoading, isError, refetch};
}
