import type { BinanceW3WParameters } from '@binance/w3w-wagmi-connector-v2';
export interface BinanceW3WOptions {
    projectId: string;
    walletConnectParameters?: BinanceW3WParameters;
}
export declare const binanceWallet: ({ projectId }: BinanceW3WOptions) => Wallet;
