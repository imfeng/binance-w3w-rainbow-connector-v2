import { getHref, getIsAndroid, isInBinance } from '@binance/w3w-utils';
import { getWagmiConnectorV2 } from '@binance/w3w-wagmi-connector-v2';
import { Wallet, WalletDetailsParams } from '@rainbow-me/rainbowkit';
import type { BinanceW3WParameters } from '@binance/w3w-wagmi-connector-v2';
import { createConnector } from 'wagmi';
import { CreateConnector } from './rainbowkit.type.js';

export interface BinanceW3WOptions {
  projectId: string;
  walletConnectParameters?: BinanceW3WParameters;
}

export const binanceWallet = ({ projectId, walletConnectParameters, }: BinanceW3WOptions): Wallet => {
  const shouldUseWalletConnect = !isInBinance();
  const getUriMobile = async (uri: string) => {
    const isAndroid = getIsAndroid();
    return getHref(isAndroid, uri);
  };

  const createBinanceConnector = (): CreateConnector => {
    return (walletDetails: WalletDetailsParams) => {
      return createConnector((config: any) => ({
        ...getWagmiConnectorV2()(config),
        ...walletDetails,
      }));
    };
  }

  return {
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
      mobile: 'https://www.binance.com/en/download',
      qrCode: 'https://www.binance.com/en/download',
    },
    mobile: {
      getUri: shouldUseWalletConnect ? getUriMobile : undefined,
    },
    qrCode: shouldUseWalletConnect
      ? {
          getUri: (uri: string) => uri,
          instructions: {
            learnMoreUrl:
              'https://www.binance.com/en/blog/markets/introducing-binance-web3-wallet-5931309459106555347',
            steps: [
              {
                description:
                  'Log in to your Binance app and tap [Wallets]. Go to [Web3].',
                step: 'install',
                title: 'Open Binance app',
              },
              {
                description:
                  'Tap [Create Wallet] to start using your Web3 Wallet.',
                step: 'create',
                title: 'Create or Import a Wallet',
              },
              {
                description:
                  'After you scan, a connection prompt will appear for you to connect your wallet.',
                step: 'scan',
                title: 'Tap the scan button',
              },
            ],
          },
        }
      : undefined,
    createConnector: createBinanceConnector(),
  }
};
