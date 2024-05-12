import { getHref, isInBinance } from '@binance/w3w-utils';
import { getWagmiConnector } from '@binance/w3w-wagmi-connector';
import { Chain, Wallet } from '@rainbow-me/rainbowkit';
import type { IWCEthRpcConnectionOptions } from '@binance/w3w-types';
import type { Connector } from 'wagmi/connectors';

async function getWalletConnectUri(connector: Connector): Promise<string> {
  const provider = await connector.getProvider();
  return new Promise<string>(resolve => provider.once('uri_ready', resolve));
}

export interface BinanceW3WOptions {
  chains: Chain[];
  options?: IWCEthRpcConnectionOptions;
}

export default function rainbowConnector({
  chains,
  options,
}: BinanceW3WOptions): Wallet {
  const shouldUseWalletConnect = !isInBinance();
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

    createConnector: () => {
      const Connector = getWagmiConnector();
      const connector = new Connector({
        chains,
        options: { showQrCodeModal: false, ...options },
      });
      const getUriMobile = async () => {
        const uri = await getWalletConnectUri(connector);
        return getHref(true, uri);
      };

      const getUriQR = async () => {
        const uri = await getWalletConnectUri(connector);
        return uri;
      };

      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect ? getUriMobile : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri: getUriQR,
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
      };
    },
  };
}
