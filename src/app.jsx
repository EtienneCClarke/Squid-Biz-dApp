import { WagmiConfig } from 'wagmi'
import { wagmiConfig } from "./libs/wagmi";
import { useAccount } from 'wagmi';
// import ReactGA from 'react-ga4';
import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';
import {
    Connect,
    ManageCreated,
    ManagePersonal,
    Create
} from './pages'
import { RequireConnected } from './helpers';

const router = createBrowserRouter([
    {
        path: "*",
        element: <Connect />
    },
    {
        path: "/",
        element: <Connect />
    },
    {
        path: "/manage-created",
        element: <RequireConnected children={<ManageCreated />} />
    },
    {
        path: "/manage-personal",
        element: <RequireConnected children={<ManagePersonal />} />
    },
]);

export default function App() {

    // ReactGA.initialize("G-KL3K7CPYMB", { 'anonymize_ip': true });

    return(
        <WagmiConfig config={wagmiConfig}>
			<RouterProvider router={router} />
		</WagmiConfig>
    );

}