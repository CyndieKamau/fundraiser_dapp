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
            const data = await createCampaign({ args: [
                address,    //form owner
                form.title,  //title of project
                form.description,  //project description
                new Date(form.deadline).getTime(), // project deadline
                form.image

            ] });
            console.info("contract call successs", data);
        } catch (err) {
            console.error("contract call failure", err);
          }
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getProjects');

        const parsedCampaigns = campaigns.map((campaign) => ({
            projectOwner: campaign.projectOwner,
            projectTitle: campaign.projectTitle,
            projectDescription: campaign.projectDescription,
            target: ethers.utils.formatEther(campaign.target.toString()),
            projectDeadline: camapign.projectDeadline.toNumber(),
            fundsCollected: ethers.utils.formatEther(campaign.fundsCollected.toString()),
            projectImage: campaign.projectImage,
            pId: i

        }));

        return parsedCampaigns;
    }

    return (
        <StateContext.Provider value={{
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
            getCampaigns
        }}>
            {children}
        </StateContext.Provider>        
    )
}

export const useStateContext = () => useContext(StateContext);