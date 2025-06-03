// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// These are the types that are used in the contract
contract CrowdFunding {
    struct Campaign {
        address owner; // The owner of the campaign
        string title; // The title of the campaign
        string description; // The description of the campaign
        uint256 target; // The target amount of the campaign
        uint256 deadline; // The deadline of the campaign
        uint256 amountCollected;  // The amount collected so far
        string image; // The image of the campaign
        address[] donators; // The list of donators
        uint256[] donations; // The list of donations
    }

// mapping of campaign id to campaign struct for easy access of campaign data
    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

// Function to Create Campaign 
    function createCampaign(address _owner, string memory _title, string memory _description, 
                                uint256 _target, uint256 _deadline, 
                                    string memory _image) public returns (uint256) {                                        
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(campaign.deadline < block.timestamp, "The deadline should be a date in the future.");

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;
        
        return numberOfCampaigns - 1;
    }


// Function to Donate to Campaign
    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent) {
            campaign.amountCollected += amount;
        }

    }
    

// Function for Donators
    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }
    

// Function to get Campaign Details
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for(uint i = 0; i<numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }

        return allCampaigns;
    }
}