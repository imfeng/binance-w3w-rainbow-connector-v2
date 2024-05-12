import { RainbowKitWalletConnectParameters } from '@rainbow-me/rainbowkit';
interface BinanceW3WOptions {
    projectId: string;
    walletConnectParameters?: RainbowKitWalletConnectParameters;
}
export declare const binanceWallet: ({ projectId, walletConnectParameters, }: BinanceW3WOptions) => Wallet;
export {};
