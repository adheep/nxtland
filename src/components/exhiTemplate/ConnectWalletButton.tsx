import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {logoutAction} from "../../redux/actions/login/loginAction";

function isMetaMaskInstalled() {
  return Boolean(window.ethereum);
}

async function readAddress() {
  const method = "eth_requestAccounts";

  const accounts = await window.ethereum.request<string[]>({
    method
  });

  console.log('readaddress', accounts[0]);
  return accounts[0];
}

const changeNetwork = async({name, error}) => {
  try {
    // Try to switch to the Mumbai testnet
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x13881' }], // Check networks.js for hexadecimal network ids
    });
    localStorage.setItem('chainName', 'Mumbai|Polygon');
  } catch (error) {
    // This error code means that the chain we want has not been added to MetaMask
    // In this case we ask the user to add it to their MetaMask
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {   
              chainId: '0x13881',
              chainName: 'Polygon Mumbai Testnet',
              rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
              nativeCurrency: {
                  name: "Mumbai Matic",
                  symbol: "MATIC",
                  decimals: 18
              },
              blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    }
    console.log(9, error);
  }
};

function getSelectedAddress() {
  return window.ethereum.selectedAddress;
}

const ConnectWalletButton: React.FC<{
  onChange: (address: string | undefined) => void;
}> = ({ onChange }) => {
  const [address, setAddress] = useState<string | undefined>(
    getSelectedAddress()
  );

  const connectWallet = async () => {
    const selectedAddress = await readAddress();

    setAddress(selectedAddress);
    onChange(selectedAddress);
    changeNetwork({name: 'matic', error: 'test'});
  };
  
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('accountchanged');
    const eventName = `accountsChanged`;

    if (!isMetaMaskInstalled()) {
      return;
    }


    const listener = ([selectedAddress]: string[]) => {
      if(!selectedAddress) {
        console.log('Disconnected');
        dispatch(logoutAction());
      } else if(localStorage.getItem('currentWallet')!==selectedAddress) {
        console.log('Address changed, logging out!');
        dispatch(logoutAction());
      }
      setAddress(selectedAddress);
      onChange(selectedAddress);
    };

    window.ethereum.on(eventName, listener);

    const chainListener = (data:any) => {
      console.log(10, data);
      let chainName = '';
      if(data === '0x13881') {
        chainName = 'Mumbai|Polygon'
      } else if (data === '0x5') {
        chainName = "Goreli|Ethereum"
      } else {
        chainName = "Unsupported"
        dispatch(logoutAction());
      }
      localStorage.setItem('chainName', chainName);
    }

    window.ethereum.on(`chainChanged`, chainListener);

    return () => {
      console.log('removelistener');
      //window.ethereum.removeListener(eventName, listener);
    };
  }, [onChange]);

  
  if (!isMetaMaskInstalled()) {
    return <>No wallet found. Please install MetaMask.</>;
  }

  return <button onClick={connectWallet} className="btn fill" style={{
    backgroundImage:
      "url('" + "/images/ether.png" + "')",
    backgroundSize: "40px 40px",
    backgroundRepeat: "no-repeat",
    backgroundPositionX: "5px",
    backgroundPositionY: "8px",
    backgroundColor: "#ff007a",
    border: "0px",
    color: "white",
    fontSize: "16px",
    fontWeight: 700,
    width: "260px",
  }}>{address?"Continue with "+address.substring(0,5)+"...":"Login with Wallet"}</button>;
};

export default ConnectWalletButton;

declare global {
  interface Window {
    ethereum: {
      removeListener<T>(event: string, cb: (params: T) => void): void;

      request<T>(params: { method: string, params?: any }): Promise<T>;

      on<T>(event: string, cb: (params: T) => void): void;

      selectedAddress: string | undefined;
    };
  }
}
