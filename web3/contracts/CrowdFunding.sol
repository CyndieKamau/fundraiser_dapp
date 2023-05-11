// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//This smart contract is for funds management;
//Researcher uploads project as a campaign;
//Anyone can view and fund the project via crypto;
//Site updates how much funding the project received.



contract crowdFunding {
    struct Campaign {
        address projectOwner;
        string projectTitle;
        string projectDescription;
        uint256 projectDeadline;
        uint256 fundsCollected;
        string projectImage;
        address[] funders;
        uint256[] funds;

    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberofCampaigns = 0;


    //function for creating a project proposal
    function createCampaign(address _projectOwner, string memory _projectTitle, string memory _projectDescription, uint256 _projectDeadline, string memory _projectImage) public returns(uint256){

        Campaign storage campaign = campaigns[numberofCampaigns];
        
        //test to check if everything is okay
        require(campaign.projectDeadline < block.timestamp, "The deadline should be a future date not past.");

        campaign.projectOwner = _projectOwner;
        campaign.projectTitle = _projectTitle;
        campaign.projectDescription = _projectDescription;
        campaign.projectDeadline = _projectDeadline;
        campaign.fundsCollected = 0;
        campaign.projectImage = _projectImage;

        numberofCampaigns++;

        //get index of newest project proposal 
        return numberofCampaigns -1;



    }

    //function for funding; payable means crypto is being sent
    function fundCampaign(uint256 _id) public payable{
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        //push address of funder and the funds
        campaign.funders.push(msg.sender);
        campaign.funds.push(amount);

        //if funds are sent;
        (bool sent,) = payable(campaign.projectOwner).call{value: amount}("");
        
        if(sent) {
            campaign.fundsCollected = campaign.fundsCollected + amount;
        }
    }

    //function to get show funders and amount funded
    function getFunders(uint256 _id) view public returns(address[] memory, uint256[] memory) {
        return(campaigns[_id].funders, campaigns[_id].funds);

    }

    function getProjects() public view returns(Campaign[] memory){
        
        //new var 'allCampaigns` having an array of all projects
        Campaign[] memory allCampaigns = new Campaign[](numberofCampaigns);

        for(uint i=0; i < numberofCampaigns; i ++) {
            Campaign storage item = campaigns[i];
            
            allCampaigns[i] = item;
            
        }

        return allCampaigns;
    }
    
}