import { useConnect, useAccount } from 'wagmi';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from "../../assets/vectors/logo.svg";
import { connectorLogos } from "./connectorData";
import "./connect.css";

export default function Connect() {

    const { redirect } = useNavigate();

    const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
        onSuccess() {
            redirect("/manage-personal");
        }
    });
    const { status } = useAccount();

    if(status == "connected") {
        return <Navigate to="/manage-personal" replace={true} />
    }

    return(
        <main id="connect-view">
            <div id="left-container">
                <a href="https://www.squid.biz" className="logo"><img src={logo} /></a>
                <div className="connect-content">
                    <h1>Connect.</h1>
                    <p>Dont have a wallet?
                        <a
                            className='blog-link'
                            href="https://www.ardoda.com/blog/2HxU0gwqIi6LF8KhTxh1YH"
                            target="_blank"
                        >
                                Learn how to make one here.
                        </a>
                    </p>

                    <div id="connectors">
                        {connectors.map((connector) => (
                            <div
                                className='connector'
                                key={connector.id}
                                onClick={() => connect({ connector })}
                            >
                                {connector.name == "WalletConnectLegacy" ? "Wallet Connect" : connector.name}
                                {!connector.ready && ' (unsupported)'}
                                {isLoading &&
                                    connector.id === pendingConnector?.id &&
                                    ' (connecting)'
                                }
                                <img className="push-right" src={connectorLogos[connector.id]} />
                            </div>
                        ))}
                        {error && <div className="push-center error-txt">{error.message}</div>}
                    </div>

                    <p className='tag'>
                        By connecting a wallet you agree to our <span><a>terms and conditions</a></span> and our <span><a>privacy policy</a></span>.
                    </p>
                </div>
            </div>
        </main>
    );
}