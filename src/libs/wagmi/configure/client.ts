import { configureChains, createConfig } from 'wagmi'
import { arbitrum, avalanche, bsc, mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
	// bsc, arbitrum, avalanche, polygonMumbai
	[mainnet, polygon],
	[publicProvider()],
)

export const wagmiConfig = createConfig({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({ chains }),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: 'wagmi',
			},
		}),
		new WalletConnectConnector({
			chains,
			options: {
				projectId: '67d8e0560795267607bde7ee0957ad0a'
			},
		})
	],
	publicClient,
	webSocketPublicClient,
})