import { configureChains, createConfig } from 'wagmi'
import { arbitrum, avalanche, avalancheFuji, bsc, mainnet, polygon, polygonMumbai } from 'wagmi/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient, webSocketPublicClient } = configureChains(
	// bsc, arbitrum, avalanche, polygonMumbai
	[mainnet, polygon, avalanche],
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
				projectId: '36973bcece3bbbc59ee463643642e208'
			},
		})
	],
	publicClient,
	webSocketPublicClient,
})