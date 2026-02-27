import {InputGenerateTransactionPayloadData} from "@aptos-labs/ts-sdk";
import useSubmitTransaction from "./useSubmitTransaction";

const useSubmitVote = () => {
  const {
    submitTransaction,
    transactionInProcess,
    transactionResponse,
    clearTransactionResponse,
  } = useSubmitTransaction();

  async function submitVote(
    proposalId: string,
    shouldPass: boolean,
    ownerAccountAddr: string,
  ) {
    const payload: InputGenerateTransactionPayloadData = {
      function: "0x1::aptos_governance::vote",
      typeArguments: [],
      functionArguments: [ownerAccountAddr, proposalId, shouldPass],
    };

    await submitTransaction(payload);
  }

  return {
    submitVote,
    transactionInProcess,
    transactionResponse,
    clearTransactionResponse,
  };
};

export default useSubmitVote;
