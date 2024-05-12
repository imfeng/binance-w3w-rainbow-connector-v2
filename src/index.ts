import { isInBinance } from '@binance/w3w-utils';
import { getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2';
import { Wallet } from '@rainbow-me/rainbowkit';
import type { BinanceW3WParameters } from '@binance/w3w-wagmi-connector-v2';
export interface BinanceW3WOptions {
  projectId: string;
  walletConnectParameters?: BinanceW3WParameters;
}

export const binanceWallet = ({ projectId }: BinanceW3WOptions): Wallet => ({
  id: 'binance',
  name: 'Binance Web3 Wallet',
  iconUrl: async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const base64: string = (await import('./binanceWallet.svg')).default;
    return `data:image/svg+xml;base64,${base64}`;
  },
  iconAccent: '#1E1E1E',
  iconBackground: '#1E1E1E',
  installed: isInBinance() || undefined,
  downloadUrls: {
    android: 'https://play.google.com/store/apps/details?id=com.binance.dev',
    ios: 'https://apps.apple.com/us/app/binance-buy-bitcoin-crypto/id1436799971',
  },
  mobile: 'https://www.binance.com/en/download',
  qrCode: 'https://www.binance.com/en/download',
  createConnector: getWagmiConnectorV2(),
});
