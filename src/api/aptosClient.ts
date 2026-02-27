import {Aptos, AptosConfig, Network} from "@aptos-labs/ts-sdk";

function getApiKey(networkValue: string): string | undefined {
  const normalized = networkValue.toLowerCase();
  if (normalized.includes("mainnet")) {
    return import.meta.env.VITE_APTOS_API_KEY_MAINNET;
  }
  if (normalized.includes("testnet")) {
    return import.meta.env.VITE_APTOS_API_KEY_TESTNET;
  }
  if (normalized.includes("devnet")) {
    return import.meta.env.VITE_APTOS_API_KEY_DEVNET;
  }
  return import.meta.env.VITE_APTOS_API_KEY;
}

export function getNetworkFromNodeUrl(nodeUrl: string): Network {
  const normalized = nodeUrl.toLowerCase();
  if (normalized.includes("mainnet")) return Network.MAINNET;
  if (normalized.includes("testnet")) return Network.TESTNET;
  if (normalized.includes("devnet")) return Network.DEVNET;
  return Network.CUSTOM;
}

export function getConfig(networkValue: string): AptosConfig {
  const network = getNetworkFromNodeUrl(networkValue);
  const clientConfig = {
    API_KEY: getApiKey(networkValue),
  };

  // For built-in networks, let the SDK use its canonical api.* /v1 endpoints.
  if (network !== Network.CUSTOM) {
    return new AptosConfig({
      network,
      clientConfig,
    });
  }

  return new AptosConfig({
    network,
    fullnode: networkValue,
    clientConfig,
  });
}

export function getAptosClient(networkValue: string): Aptos {
  return new Aptos(getConfig(networkValue));
}
