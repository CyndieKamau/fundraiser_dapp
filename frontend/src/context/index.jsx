import React, {useContext, createContext} from "react";
import { useContract, useAddress, useMetamask, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from 'ethers';


const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const { contract } = useContract("0x0eFf5b7BB9eeaF67be9a073267c3a4F8A821ddb8");

    const { mutateAsync: createCampaign, isLoading } = useContractWrite(contract, "createCampaign");

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async(form) => {
        try {
            const data = await createCampaign({ args: [address,  form.title, form.description,  form.target, new Date(form.deadline).getTime(), form.image, _projectOwner, _projectTitle, _projectDescription, _projectDeadline, _projectImage] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
          }
    }

    return (
        <StateContext.Provider value={{
            address,
            contract,
            connect,
            createCampaign: publishCampaign
        }}>
            {children}
        </StateContext.Provider>        
    )
}

export const useStateContext = () => useContext(StateContext);