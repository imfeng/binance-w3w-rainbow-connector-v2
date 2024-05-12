import { Wallet } from '@rainbow-me/rainbowkit';
import { Connector, CreateConnectorFn } from 'wagmi';
export type CreateConnector = (walletDetails: {
    rkDetails: RainbowKitDetails;
}) => CreateConnectorFn;
export type RainbowKitDetails = Omit<Wallet, 'createConnector' | 'hidden'> & {
    index: number;
    groupIndex: number;
    groupName: string;
    isWalletConnectModalConnector?: boolean;
    isRainbowKitConnector: boolean;
    walletConnectModalConnector?: Connector;
    showQrModal?: true;
};
