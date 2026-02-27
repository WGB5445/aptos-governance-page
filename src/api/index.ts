import {
  AccountAddressInput,
  AccountData,
  MoveModuleBytecode,
  MoveResource,
  MoveStructId,
  TableItemRequest,
  TransactionResponse,
} from "@aptos-labs/ts-sdk";
import {isHex} from "../pages/utils";
import {withResponseError} from "./client";
import {getAptosClient} from "./common";

export function getTransaction(
  requestParameters: {txnHashOrVersion: string | number},
  nodeUrl: string,
): Promise<TransactionResponse> {
  const {txnHashOrVersion} = requestParameters;
  if (isHex(txnHashOrVersion as string)) {
    return getTransactionByHash(txnHashOrVersion as string, nodeUrl);
  } else {
    return getTransactionByVersion(txnHashOrVersion as number, nodeUrl);
  }
}

function getTransactionByVersion(
  version: number,
  nodeUrl: string,
): Promise<TransactionResponse> {
  const client = getAptosClient(nodeUrl);
  return withResponseError(
    client.getTransactionByVersion({ledgerVersion: BigInt(version)}),
  );
}

function getTransactionByHash(
  hash: string,
  nodeUrl: string,
): Promise<TransactionResponse> {
  const client = getAptosClient(nodeUrl);
  return withResponseError(
    client.getTransactionByHash({transactionHash: hash}),
  );
}

export function getAccount(
  requestParameters: {address: string},
  nodeUrl: string,
): Promise<AccountData> {
  const client = getAptosClient(nodeUrl);
  const {address} = requestParameters;
  return withResponseError(client.getAccountInfo({accountAddress: address}));
}

export function getAccountResources(
  requestParameters: {address: AccountAddressInput; ledgerVersion?: number},
  nodeUrl: string,
): Promise<MoveResource[]> {
  const client = getAptosClient(nodeUrl);
  const {address, ledgerVersion} = requestParameters;
  return withResponseError(
    client.getAccountResources({
      accountAddress: address,
      options: {
        ledgerVersion: ledgerVersion ? BigInt(ledgerVersion) : undefined,
      },
    }),
  );
}

export function getAccountResource(
  requestParameters: {
    address: string;
    resourceType: string;
    ledgerVersion?: number;
  },
  nodeUrl: string,
): Promise<MoveResource> {
  const client = getAptosClient(nodeUrl);
  const {address, resourceType, ledgerVersion} = requestParameters;
  return withResponseError(
    client.getAccountResource({
      accountAddress: address,
      resourceType: resourceType as MoveStructId,
      options: {
        ledgerVersion: ledgerVersion ? BigInt(ledgerVersion) : undefined,
      },
    }),
  ) as Promise<MoveResource>;
}

export function getAccountModules(
  requestParameters: {address: string; ledgerVersion?: number},
  nodeUrl: string,
): Promise<MoveModuleBytecode[]> {
  const client = getAptosClient(nodeUrl);
  const {address, ledgerVersion} = requestParameters;
  return withResponseError(
    client.getAccountModules({
      accountAddress: address,
      options: {
        ledgerVersion: ledgerVersion ? BigInt(ledgerVersion) : undefined,
      },
    }),
  );
}

export function getTableItem(
  requestParameters: {tableHandle: string; data: TableItemRequest},
  nodeUrl: string,
): Promise<any> {
  const client = getAptosClient(nodeUrl);
  const {tableHandle, data} = requestParameters;
  return withResponseError(client.getTableItem({handle: tableHandle, data}));
}
