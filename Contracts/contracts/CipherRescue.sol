pragma solidity ^0.8.0;
//SPDX-License-Identifier: MPL-2.0

contract Contract {

    address owner;
    mapping(address =>bool )public whiteList;

    constructor(){
        owner=msg.sender;
        whiteList[msg.sender]=true;
    }

    enum Status{unresolved,ongoing,resolved}
    struct Proposal{
        string name;
        string location;
        string emergency_type;
        string priority;
        string problem;
        string callerNumber;
        Status status;
    }
    Proposal[] proposals;

    modifier onlyowner(){
        require(msg.sender==owner,"Only owner can call the Function");
        _;
    }

    function addToWhitelist(address _new) public onlyowner {
        require(whiteList[_new]==false,"Already Whitelisted");
          whiteList[_new] = true;
    }

    function removeFromWhitelist(address _remove) public onlyowner{
        require(whiteList[_remove]==true,"Not Whitelisted Earlier");
        whiteList[_remove]=false;
    }

    function addOperation(
        string memory _name ,
        string memory _location,
        string memory _emergency_type,
        string memory _priority,
        string memory _problem,
        string memory _callerNumber
    ) public {

        proposals.push(Proposal(
            _name,
            _location,
            _emergency_type,
            _priority,
            _problem,
            _callerNumber,
            Status.unresolved
        ));


    }

    function updateStatus(uint id, Status _status)public {
        require(whiteList[msg.sender],"You are Not Whitelisted");
        proposals[id].status=_status;
    }

    function get_unresolved_proposals() public view returns(bool){
        for(uint i=0;i<proposals.length;i++){
            if(proposals[i].status==Status.unresolved){
                return true;
            }
        }
        return false;
    } 

    function getProposals() public view returns(Proposal[] memory){
        require(whiteList[msg.sender],"You are not Whitelisted to view Proposals");
        return proposals;
    }
    




}