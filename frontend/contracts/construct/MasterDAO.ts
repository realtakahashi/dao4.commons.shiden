const MasterDAOContractConstruct = {
  _format: 'hh-sol-artifact-1',
  contractName: 'MasterDAO',
  sourceName: 'contracts/MasterDAO.sol',
  abi: [
    {
      inputs: [
        {
          internalType: 'string',
          name: '_githubURL',
          type: 'string',
        },
        {
          internalType: 'string',
          name: '_ownerName',
          type: 'string',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'eoa',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'enum MasterDAO.ProposalStatus',
          name: '_proposalStatus',
          type: 'uint8',
        },
      ],
      name: 'ChangedProposalStatus',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'eoa',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'daoId',
          type: 'uint256',
        },
      ],
      name: 'DaoAdded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'eoa',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Divided',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'eoa',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Donated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'eoa',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'memberAddress',
          type: 'address',
        },
      ],
      name: 'FinishedMemberVoting',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'eoa',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'daoAddress',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'voteId',
          type: 'uint256',
        },
      ],
      name: 'FinishedVoteOfDao',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'eoa',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'memberId',
          type: 'uint256',
        },
      ],
      name: 'MemberAdded',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'eoa',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'memberId',
          type: 'uint256',
        },
      ],
      name: 'MemberDeleted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'eoa',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'memberAddress',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'isMemberAdded',
          type: 'bool',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
      ],
      name: 'StartedMemberVoting',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'daoAddress',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'voteId',
          type: 'uint256',
        },
      ],
      name: 'StartedVoteOfDao',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'eoa',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'title',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
      ],
      name: 'SubmitedProposal',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'eoa',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'daoAddress',
          type: 'address',
        },
      ],
      name: 'Voted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'eoa',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'address',
          name: 'memberAddress',
          type: 'address',
        },
      ],
      name: 'VotedForMember',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'eoa',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_proposalId',
          type: 'uint256',
        },
      ],
      name: 'VotedForProposal',
      type: 'event',
    },
    {
      inputs: [],
      name: 'DAO_PASS_LINE',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'MEMBER_PASS_LINE',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'PROPOSAL_PASS_LINE',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'amountOfDotation',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'checkAlreadyDaoVoted',
      outputs: [
        {
          internalType: 'address',
          name: 'targetAddress',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'isAdded',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'checkAlreadyMemberVoted',
      outputs: [
        {
          internalType: 'address',
          name: 'targetAddress',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'isAdded',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'daoIds',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'daoInfoes',
      outputs: [
        {
          internalType: 'address',
          name: 'ownerAddress',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'daoAddress',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'daoName',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'githubURL',
          type: 'string',
        },
        {
          internalType: 'bool',
          name: 'rewardApproved',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'daoProposalHistories',
      outputs: [
        {
          internalType: 'address',
          name: 'daoAddress',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'countsOfVoter',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'divide',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'donate',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'daoAddress',
          type: 'address',
        },
      ],
      name: 'finishDaoVoting',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'memberAddress',
          type: 'address',
        },
      ],
      name: 'finishMemberVoting',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getContractBalance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getDaoList',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'ownerAddress',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'daoAddress',
              type: 'address',
            },
            {
              internalType: 'string',
              name: 'daoName',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'githubURL',
              type: 'string',
            },
            {
              internalType: 'bool',
              name: 'rewardApproved',
              type: 'bool',
            },
          ],
          internalType: 'struct MasterDAO.DaoInfo[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'githubURL',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'isDaoAdded',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'isMemberAdded',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'memberInfoes',
      outputs: [
        {
          internalType: 'string',
          name: 'name',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'memberId',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'memberProposalHistories',
      outputs: [
        {
          internalType: 'string',
          name: 'name',
          type: 'string',
        },
        {
          internalType: 'address',
          name: 'eoa',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'countsOfVoter',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'proposalInfoes',
      outputs: [
        {
          internalType: 'enum MasterDAO.ProposalKind',
          name: 'proposalKind',
          type: 'uint8',
        },
        {
          internalType: 'string',
          name: 'title',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'outline',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'details',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'githubURL',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'proposalId',
          type: 'uint256',
        },
        {
          internalType: 'enum MasterDAO.ProposalStatus',
          name: 'proposalStatus',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'daoAddress',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'daoName',
          type: 'string',
        },
        {
          internalType: 'string',
          name: '_githubURL',
          type: 'string',
        },
      ],
      name: 'registerDAO',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'daoAddress',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'isAdded',
          type: 'bool',
        },
      ],
      name: 'startDaoVoting',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: 'name',
          type: 'string',
        },
        {
          internalType: 'address',
          name: 'memberAddress',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: '_isMemberAdded',
          type: 'bool',
        },
      ],
      name: 'startMemberVoting',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'daoAddress',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'yes',
          type: 'bool',
        },
      ],
      name: 'voteForDao',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'memberAddress',
          type: 'address',
        },
        {
          internalType: 'bool',
          name: 'yes',
          type: 'bool',
        },
      ],
      name: 'voteForMember',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'votingDaoInProgress',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'votingInfoes',
      outputs: [
        {
          internalType: 'uint256',
          name: 'votingCount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'yesCount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'noCount',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'votingMemberInProgress',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
  bytecode:
    '0x6080604052603c600855603c600955603c600a553480156200002057600080fd5b50604051620047f9380380620047f983398181016040528101906200004691906200032f565b6001600081905550620000656003620001e960201b620031971760201c565b6200007c6001620001e960201b620031971760201c565b620000936007620001e960201b620031971760201c565b6000600c60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600d60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600d60146101000a81548160ff02191690831515021790555081600b90805190602001906200014a9291906200020d565b506040518060400160405280828152602001620001736001620001ff60201b620031ad1760201c565b815250600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190620001d39291906200020d565b5060208201518160010155905050505062000512565b6001816000016000828254019250508190555050565b600081600001549050919050565b8280546200021b9062000437565b90600052602060002090601f0160209004810192826200023f57600085556200028b565b82601f106200025a57805160ff19168380011785556200028b565b828001600101855582156200028b579182015b828111156200028a5782518255916020019190600101906200026d565b5b5090506200029a91906200029e565b5090565b5b80821115620002b95760008160009055506001016200029f565b5090565b6000620002d4620002ce84620003cb565b620003a2565b905082815260208101848484011115620002ed57600080fd5b620002fa84828562000401565b509392505050565b600082601f8301126200031457600080fd5b815162000326848260208601620002bd565b91505092915050565b600080604083850312156200034357600080fd5b600083015167ffffffffffffffff8111156200035e57600080fd5b6200036c8582860162000302565b925050602083015167ffffffffffffffff8111156200038a57600080fd5b620003988582860162000302565b9150509250929050565b6000620003ae620003c1565b9050620003bc82826200046d565b919050565b6000604051905090565b600067ffffffffffffffff821115620003e957620003e8620004d2565b5b620003f48262000501565b9050602081019050919050565b60005b838110156200042157808201518184015260208101905062000404565b8381111562000431576000848401525b50505050565b600060028204905060018216806200045057607f821691505b60208210811415620004675762000466620004a3565b5b50919050565b620004788262000501565b810181811067ffffffffffffffff821117156200049a5762000499620004d2565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b6142d780620005226000396000f3fe6080604052600436106101c25760003560e01c80639cf29bb9116100f7578063ce92ea5711610095578063e177b25111610064578063e177b251146106a4578063e8f32cbf146106cd578063ed88c68e146106e9578063f7d99739146106f3576101c2565b8063ce92ea57146105d4578063d14c9a11146105ff578063d4a87c0c1461063d578063e09b8d571461067b576101c2565b8063a37b772b116100d1578063a37b772b14610518578063a729feb914610541578063adc419ce1461056a578063bf564eb714610595576101c2565b80639cf29bb9146104845780639f726e9d146104af578063a1c06f4d146104da576101c2565b806354aa4ad8116101645780637344070b1161013e5780637344070b146103c85780637dfaf86f146103f35780638fb987eb1461041c5780639cd8225114610459576101c2565b806354aa4ad8146103475780636d4cac5d146103725780636f9fb98a1461039d576101c2565b80631b687ef9116101a05780631b687ef91461026f5780633cd480d21461029a57806347d9dbb1146102dd5780634ea81c911461031c576101c2565b806302705088146101c75780630a0f98d11461020557806310ce715614610246575b600080fd5b3480156101d357600080fd5b506101ee60048036038101906101e9919061336f565b61071c565b6040516101fc929190613a8b565b60405180910390f35b34801561021157600080fd5b5061022c600480360381019061022791906134f6565b6107c8565b60405161023d959493929190613879565b60405180910390f35b34801561025257600080fd5b5061026d6004803603810190610268919061348f565b61095b565b005b34801561027b57600080fd5b50610284610d8f565b6040516102919190613963565b60405180910390f35b3480156102a657600080fd5b506102c160048036038101906102bc91906134f6565b6110db565b6040516102d497969594939291906139a0565b60405180910390f35b3480156102e957600080fd5b5061030460048036038101906102ff91906134f6565b611357565b60405161031393929190613c16565b60405180910390f35b34801561032857600080fd5b50610331611381565b60405161033e9190613bfb565b60405180910390f35b34801561035357600080fd5b5061035c611387565b6040516103699190613985565b60405180910390f35b34801561037e57600080fd5b5061038761139a565b6040516103949190613bfb565b60405180910390f35b3480156103a957600080fd5b506103b26113a0565b6040516103bf9190613bfb565b60405180910390f35b3480156103d457600080fd5b506103dd6113a8565b6040516103ea9190613a2b565b60405180910390f35b3480156103ff57600080fd5b5061041a60048036038101906104159190613398565b611436565b005b34801561042857600080fd5b50610443600480360381019061043e919061336f565b611932565b6040516104509190613bfb565b60405180910390f35b34801561046557600080fd5b5061046e61194a565b60405161047b919061385e565b60405180910390f35b34801561049057600080fd5b50610499611970565b6040516104a69190613bfb565b60405180910390f35b3480156104bb57600080fd5b506104c4611976565b6040516104d19190613985565b60405180910390f35b3480156104e657600080fd5b5061050160048036038101906104fc91906134f6565b611989565b60405161050f92919061393a565b60405180910390f35b34801561052457600080fd5b5061053f600480360381019061053a9190613398565b6119cd565b005b34801561054d57600080fd5b50610568600480360381019061056391906133d4565b611e7e565b005b34801561057657600080fd5b5061057f612104565b60405161058c919061385e565b60405180910390f35b3480156105a157600080fd5b506105bc60048036038101906105b791906134f6565b61212a565b6040516105cb93929190613a4d565b60405180910390f35b3480156105e057600080fd5b506105e96121fc565b6040516105f69190613bfb565b60405180910390f35b34801561060b57600080fd5b506106266004803603810190610621919061336f565b612202565b6040516106349291906138da565b60405180910390f35b34801561064957600080fd5b50610664600480360381019061065f919061336f565b612253565b6040516106729291906138da565b60405180910390f35b34801561068757600080fd5b506106a2600480360381019061069d919061336f565b6122a4565b005b3480156106b057600080fd5b506106cb60048036038101906106c6919061336f565b6127c9565b005b6106e760048036038101906106e29190613453565b612b8a565b005b6106f1612dac565b005b3480156106ff57600080fd5b5061071a60048036038101906107159190613398565b612e15565b005b600f60205280600052604060002060009150905080600001805461073f90613ef2565b80601f016020809104026020016040519081016040528092919081815260200182805461076b90613ef2565b80156107b85780601f1061078d576101008083540402835291602001916107b8565b820191906000526020600020905b81548152906001019060200180831161079b57829003601f168201915b5050505050908060010154905082565b60126020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600201805461083790613ef2565b80601f016020809104026020016040519081016040528092919081815260200182805461086390613ef2565b80156108b05780601f10610885576101008083540402835291602001916108b0565b820191906000526020600020905b81548152906001019060200180831161089357829003601f168201915b5050505050908060030180546108c590613ef2565b80601f01602080910402602001604051908101604052809291908181526020018280546108f190613ef2565b801561093e5780601f106109135761010080835404028352916020019161093e565b820191906000526020600020905b81548152906001019060200180831161092157829003601f168201915b5050505050908060040160009054906101000a900460ff16905085565b6000600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000180546109aa90613ef2565b905014156109ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e490613b7b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600d60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610a7e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a7590613adb565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610aee576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ae590613b9b565b60405180910390fd5b6000600f60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018054610b3d90613ef2565b9050148015610b50575060011515811515145b80610bba57506000600f60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018054610ba590613ef2565b905014158015610bb9575060001515811515145b5b610bf9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bf090613b1b565b60405180910390fd5b81600d60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610c4460066131bb565b80600d60146101000a81548160ff021916908315150217905550610c686002613197565b60405180606001604052808481526020018373ffffffffffffffffffffffffffffffffffffffff168152602001610c9f60016131ad565b81525060106000610cb060026131ad565b81526020019081526020016000206000820151816000019080519060200190610cda9291906131c8565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550604082015181600201559050503373ffffffffffffffffffffffffffffffffffffffff167f65c963ad0c6886db677d9d50d206d291b43f8a0698e54ef91a4741509f48ed4a8383610d7360026131ad565b604051610d8293929190613903565b60405180910390a2505050565b606060006001610d9f60036131ad565b610da99190613dea565b67ffffffffffffffff811115610de8577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015610e2157816020015b610e0e61324e565b815260200190600190039081610e065790505b5090506000600190505b610e3560036131ad565b8110156110d3576000601260008381526020019081526020016000206002018054610e5f90613ef2565b9050146110c057601260008281526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282018054610f4090613ef2565b80601f0160208091040260200160405190810160405280929190818152602001828054610f6c90613ef2565b8015610fb95780601f10610f8e57610100808354040283529160200191610fb9565b820191906000526020600020905b815481529060010190602001808311610f9c57829003601f168201915b50505050508152602001600382018054610fd290613ef2565b80601f0160208091040260200160405190810160405280929190818152602001828054610ffe90613ef2565b801561104b5780601f106110205761010080835404028352916020019161104b565b820191906000526020600020905b81548152906001019060200180831161102e57829003601f168201915b505050505081526020016004820160009054906101000a900460ff1615151515815250508260018361107d9190613dea565b815181106110b4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101819052505b80806110cb90613f55565b915050610e2b565b508091505090565b60166020528060005260406000206000915090508060000160009054906101000a900460ff169080600101805461111190613ef2565b80601f016020809104026020016040519081016040528092919081815260200182805461113d90613ef2565b801561118a5780601f1061115f5761010080835404028352916020019161118a565b820191906000526020600020905b81548152906001019060200180831161116d57829003601f168201915b50505050509080600201805461119f90613ef2565b80601f01602080910402602001604051908101604052809291908181526020018280546111cb90613ef2565b80156112185780601f106111ed57610100808354040283529160200191611218565b820191906000526020600020905b8154815290600101906020018083116111fb57829003601f168201915b50505050509080600301805461122d90613ef2565b80601f016020809104026020016040519081016040528092919081815260200182805461125990613ef2565b80156112a65780601f1061127b576101008083540402835291602001916112a6565b820191906000526020600020905b81548152906001019060200180831161128957829003601f168201915b5050505050908060040180546112bb90613ef2565b80601f01602080910402602001604051908101604052809291908181526020018280546112e790613ef2565b80156113345780601f1061130957610100808354040283529160200191611334565b820191906000526020600020905b81548152906001019060200180831161131757829003601f168201915b5050505050908060050154908060060160009054906101000a900460ff16905087565b60176020528060005260406000206000915090508060000154908060010154908060020154905083565b60085481565b600d60149054906101000a900460ff1681565b600e5481565b600047905090565b600b80546113b590613ef2565b80601f01602080910402602001604051908101604052809291908181526020018280546113e190613ef2565b801561142e5780601f106114035761010080835404028352916020019161142e565b820191906000526020600020905b81548152906001019060200180831161141157829003601f168201915b505050505081565b6000600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001805461148590613ef2565b905014156114c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114bf90613b7b565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff16600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611558576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161154f90613bdb565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415806115d457506000601360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b611613576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161160a90613b9b565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff16601560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415806117ab57508173ffffffffffffffffffffffffffffffffffffffff16601560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161480156117aa5750600c60149054906101000a900460ff161515601560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160149054906101000a900460ff16151514155b5b6117ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117e190613bbb565b60405180910390fd5b60405180604001604052808373ffffffffffffffffffffffffffffffffffffffff168152602001600c60149054906101000a900460ff161515815250601560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160000160146101000a81548160ff02191690831515021790555090505080156118e0576118df6005613197565b5b3373ffffffffffffffffffffffffffffffffffffffff167fce0c7a2a940807f7dc2ce7a615c2532e915e6c0ac9a08bc4ed9d515a710a53e283604051611926919061385e565b60405180910390a25050565b60136020528060005260406000206000915090505481565b600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60095481565b600c60149054906101000a900460ff1681565b60146020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b6000600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018054611a1c90613ef2565b90501415611a5f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a5690613b7b565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff16600d60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611aef576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ae690613b9b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611b5f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b5690613b9b565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff16601160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141580611cf757508173ffffffffffffffffffffffffffffffffffffffff16601160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16148015611cf65750601160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160149054906101000a900460ff161515600d60149054906101000a900460ff16151514155b5b611d36576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d2d90613b5b565b60405180910390fd5b8015611d4757611d466006613197565b5b60405180604001604052808373ffffffffffffffffffffffffffffffffffffffff168152602001600d60149054906101000a900460ff161515815250601160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160000160146101000a81548160ff0219169083151502179055509050503373ffffffffffffffffffffffffffffffffffffffff167f1e3bb36b558fe22d62599da354327ab8dc1d443365750cd924473dba8dc86f6583604051611e72919061385e565b60405180910390a25050565b6000601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414611f00576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ef790613b3b565b60405180910390fd5b6000611f0c60036131ad565b90506040518060a001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff168152602001848152602001838152602001600015158152506012600083815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020190805190602001906120219291906131c8565b50606082015181600301908051906020019061203e9291906131c8565b5060808201518160040160006101000a81548160ff02191690831515021790555090505080601360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506120b06003613197565b3373ffffffffffffffffffffffffffffffffffffffff167f556b14baaa29f0961e942fd40fa37f45e1db56a7c4eb86b7555143c977b420a2826040516120f69190613bfb565b60405180910390a250505050565b600d60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b601060205280600052604060002060009150905080600001805461214d90613ef2565b80601f016020809104026020016040519081016040528092919081815260200182805461217990613ef2565b80156121c65780601f1061219b576101008083540402835291602001916121c6565b820191906000526020600020905b8154815290600101906020018083116121a957829003601f168201915b5050505050908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905083565b600a5481565b60156020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060000160149054906101000a900460ff16905082565b60116020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060000160149054906101000a900460ff16905082565b6000600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000180546122f390613ef2565b90501415612336576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161232d90613b7b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156123c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016123bf90613bdb565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614158061244457506000601360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b612483576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161247a90613b9b565b60405180910390fd5b60085460146000601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481526020019081526020016000206001015460646124e860056131ad565b6124f29190613d90565b6124fc9190613d5f565b106125fd57600c60149054906101000a900460ff161561258957600160126000601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054815260200190815260200160002060040160006101000a81548160ff0219169083151502179055506125f8565b600060126000601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054815260200190815260200160002060040160006101000a81548160ff0219169083151502179055505b6126f5565b600c60149054906101000a900460ff161561268557600060126000601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054815260200190815260200160002060040160006101000a81548160ff0219169083151502179055506126f4565b600160126000601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054815260200190815260200160002060040160006101000a81548160ff0219169083151502179055505b5b6000600c60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167fc5e08c3ee0294f96dc8690e9a1189d7ce81ab53c4332d439cd36d03a7b2ade1b82601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040516127be92919061393a565b60405180910390a250565b6000600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001805461281890613ef2565b9050141561285b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161285290613b7b565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16600d60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146128eb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016128e290613b9b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561295b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161295290613b9b565b60405180910390fd5b6009546010600061296c60026131ad565b815260200190815260200160002060020154606461298a60066131ad565b6129949190613d90565b61299e9190613d5f565b10612adc576129ad6001613197565b6040518060400160405280601060006129c660026131ad565b815260200190815260200160002060000180546129e290613ef2565b80601f0160208091040260200160405190810160405280929190818152602001828054612a0e90613ef2565b8015612a5b5780601f10612a3057610100808354040283529160200191612a5b565b820191906000526020600020905b815481529060010190602001808311612a3e57829003601f168201915b50505050508152602001612a6f60016131ad565b815250600f60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190612acd9291906131c8565b50602082015181600101559050505b6000600d60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600d60146101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff167fafdee47510aea9d664704785386ed92d5e2ba68996bfffcf8c0ae4ae664d3aa482604051612b7f919061385e565b60405180910390a250565b6000600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018054612bd990613ef2565b90501415612c1c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612c1390613b7b565b60405180910390fd5b6000601360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414158015612cd257506001151560126000601360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054815260200190815260200160002060040160009054906101000a900460ff161515145b612d11576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612d0890613afb565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015612d57573d6000803e3d6000fd5b503373ffffffffffffffffffffffffffffffffffffffff167f439b7f9a7ee5ab90a27d00ce8d1f8ad067652c4de6d63d7550e0f0e964b9a7728383604051612da092919061393a565b60405180910390a25050565b34600e6000828254612dbe9190613d09565b925050819055503373ffffffffffffffffffffffffffffffffffffffff167f2a01595cddf097c90216094025db714da3f4e5bd8877b56ba86a24ecead8e54334604051612e0b9190613bfb565b60405180910390a2565b6000600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018054612e6490613ef2565b90501415612ea7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612e9e90613b7b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614612f38576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612f2f90613abb565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141580612fb457506000601360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b612ff3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612fea90613b9b565b60405180910390fd5b612ffd6004613197565b60405180604001604052808373ffffffffffffffffffffffffffffffffffffffff16815260200161302e60016131ad565b8152506014600061303f60046131ad565b815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015590505081600c60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600c60146101000a81548160ff02191690831515021790555061310660056131bb565b8173ffffffffffffffffffffffffffffffffffffffff167fdc699f091eecf6f31a1094ab14dfc438363743515eed68e59cea301bbce1915e601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205460405161318b9190613bfb565b60405180910390a25050565b6001816000016000828254019250508190555050565b600081600001549050919050565b6000816000018190555050565b8280546131d490613ef2565b90600052602060002090601f0160209004810192826131f6576000855561323d565b82601f1061320f57805160ff191683800117855561323d565b8280016001018555821561323d579182015b8281111561323c578251825591602001919060010190613221565b5b50905061324a91906132ab565b5090565b6040518060a00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160608152602001606081526020016000151581525090565b5b808211156132c45760008160009055506001016132ac565b5090565b60006132db6132d684613c72565b613c4d565b9050828152602081018484840111156132f357600080fd5b6132fe848285613eb0565b509392505050565b6000813590506133158161425c565b92915050565b60008135905061332a81614273565b92915050565b600082601f83011261334157600080fd5b81356133518482602086016132c8565b91505092915050565b6000813590506133698161428a565b92915050565b60006020828403121561338157600080fd5b600061338f84828501613306565b91505092915050565b600080604083850312156133ab57600080fd5b60006133b985828601613306565b92505060206133ca8582860161331b565b9150509250929050565b6000806000606084860312156133e957600080fd5b60006133f786828701613306565b935050602084013567ffffffffffffffff81111561341457600080fd5b61342086828701613330565b925050604084013567ffffffffffffffff81111561343d57600080fd5b61344986828701613330565b9150509250925092565b6000806040838503121561346657600080fd5b600061347485828601613306565b92505060206134858582860161335a565b9150509250929050565b6000806000606084860312156134a457600080fd5b600084013567ffffffffffffffff8111156134be57600080fd5b6134ca86828701613330565b93505060206134db86828701613306565b92505060406134ec8682870161331b565b9150509250925092565b60006020828403121561350857600080fd5b60006135168482850161335a565b91505092915050565b600061352b83836137d2565b905092915050565b61353c81613e1e565b82525050565b61354b81613e1e565b82525050565b600061355c82613cb3565b6135668185613cd6565b93508360208202850161357885613ca3565b8060005b858110156135b45784840389528151613595858261351f565b94506135a083613cc9565b925060208a0199505060018101905061357c565b50829750879550505050505092915050565b6135cf81613e30565b82525050565b6135de81613e30565b82525050565b6135ed81613e8c565b82525050565b6135fc81613e9e565b82525050565b600061360d82613cbe565b6136178185613ce7565b9350613627818560208601613ebf565b61363081614089565b840191505092915050565b600061364682613cbe565b6136508185613cf8565b9350613660818560208601613ebf565b61366981614089565b840191505092915050565b6000613681601683613cf8565b915061368c8261409a565b602082019050919050565b60006136a4601883613cf8565b91506136af826140c3565b602082019050919050565b60006136c7601a83613cf8565b91506136d2826140ec565b602082019050919050565b60006136ea601183613cf8565b91506136f582614115565b602082019050919050565b600061370d601283613cf8565b91506137188261413e565b602082019050919050565b6000613730600e83613cf8565b915061373b82614167565b602082019050919050565b6000613753601183613cf8565b915061375e82614190565b602082019050919050565b6000613776601083613cf8565b9150613781826141b9565b602082019050919050565b6000613799601383613cf8565b91506137a4826141e2565b602082019050919050565b60006137bc601383613cf8565b91506137c78261420b565b602082019050919050565b600060a0830160008301516137ea6000860182613533565b5060208301516137fd6020860182613533565b50604083015184820360408601526138158282613602565b9150506060830151848203606086015261382f8282613602565b915050608083015161384460808601826135c6565b508091505092915050565b61385881613e82565b82525050565b60006020820190506138736000830184613542565b92915050565b600060a08201905061388e6000830188613542565b61389b6020830187613542565b81810360408301526138ad818661363b565b905081810360608301526138c1818561363b565b90506138d060808301846135d5565b9695505050505050565b60006040820190506138ef6000830185613542565b6138fc60208301846135d5565b9392505050565b60006060820190506139186000830186613542565b61392560208301856135d5565b613932604083018461384f565b949350505050565b600060408201905061394f6000830185613542565b61395c602083018461384f565b9392505050565b6000602082019050818103600083015261397d8184613551565b905092915050565b600060208201905061399a60008301846135d5565b92915050565b600060e0820190506139b5600083018a6135e4565b81810360208301526139c7818961363b565b905081810360408301526139db818861363b565b905081810360608301526139ef818761363b565b90508181036080830152613a03818661363b565b9050613a1260a083018561384f565b613a1f60c08301846135f3565b98975050505050505050565b60006020820190508181036000830152613a45818461363b565b905092915050565b60006060820190508181036000830152613a67818661363b565b9050613a766020830185613542565b613a83604083018461384f565b949350505050565b60006040820190508181036000830152613aa5818561363b565b9050613ab4602083018461384f565b9392505050565b60006020820190508181036000830152613ad481613674565b9050919050565b60006020820190508181036000830152613af481613697565b9050919050565b60006020820190508181036000830152613b14816136ba565b9050919050565b60006020820190508181036000830152613b34816136dd565b9050919050565b60006020820190508181036000830152613b5481613700565b9050919050565b60006020820190508181036000830152613b7481613723565b9050919050565b60006020820190508181036000830152613b9481613746565b9050919050565b60006020820190508181036000830152613bb481613769565b9050919050565b60006020820190508181036000830152613bd48161378c565b9050919050565b60006020820190508181036000830152613bf4816137af565b9050919050565b6000602082019050613c10600083018461384f565b92915050565b6000606082019050613c2b600083018661384f565b613c38602083018561384f565b613c45604083018461384f565b949350505050565b6000613c57613c68565b9050613c638282613f24565b919050565b6000604051905090565b600067ffffffffffffffff821115613c8d57613c8c61405a565b5b613c9682614089565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000613d1482613e82565b9150613d1f83613e82565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115613d5457613d53613f9e565b5b828201905092915050565b6000613d6a82613e82565b9150613d7583613e82565b925082613d8557613d84613fcd565b5b828204905092915050565b6000613d9b82613e82565b9150613da683613e82565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615613ddf57613dde613f9e565b5b828202905092915050565b6000613df582613e82565b9150613e0083613e82565b925082821015613e1357613e12613f9e565b5b828203905092915050565b6000613e2982613e62565b9050919050565b60008115159050919050565b6000819050613e4a82614234565b919050565b6000819050613e5d82614248565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000613e9782613e3c565b9050919050565b6000613ea982613e4f565b9050919050565b82818337600083830152505050565b60005b83811015613edd578082015181840152602081019050613ec2565b83811115613eec576000848401525b50505050565b60006002820490506001821680613f0a57607f821691505b60208210811415613f1e57613f1d61402b565b5b50919050565b613f2d82614089565b810181811067ffffffffffffffff82111715613f4c57613f4b61405a565b5b80604052505050565b6000613f6082613e82565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415613f9357613f92613f9e565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f616e6f7468657220766f746520697320676f696e672e00000000000000000000600082015250565b7f616e6f7468657220766f74696e6720697320676f696e672e0000000000000000600082015250565b7f6f6e6c7920617070726f7665642064616f2063616e206765742e000000000000600082015250565b7f616c72656164792066696e69736865642e000000000000000000000000000000600082015250565b7f616c7265616479207265676973746572642e0000000000000000000000000000600082015250565b7f616c726561647920766f7465642e000000000000000000000000000000000000600082015250565b7f6f6e6c79206d656d62657220646f65732e000000000000000000000000000000600082015250565b7f696e76616c696420616464726573732e00000000000000000000000000000000600082015250565b7f766f74696e672069732066696e69736865642e00000000000000000000000000600082015250565b7f6120766f74652069736e277420676f696e672e00000000000000000000000000600082015250565b6005811061424557614244613ffc565b5b50565b6007811061425957614258613ffc565b5b50565b61426581613e1e565b811461427057600080fd5b50565b61427c81613e30565b811461428757600080fd5b50565b61429381613e82565b811461429e57600080fd5b5056fea26469706673582212209f1f7ae30d50ee171e6c8ad78c5fd9a5b6bbb70e2e4b63bd0ea2e0f8de97aab564736f6c63430008040033',
  deployedBytecode:
    '0x6080604052600436106101c25760003560e01c80639cf29bb9116100f7578063ce92ea5711610095578063e177b25111610064578063e177b251146106a4578063e8f32cbf146106cd578063ed88c68e146106e9578063f7d99739146106f3576101c2565b8063ce92ea57146105d4578063d14c9a11146105ff578063d4a87c0c1461063d578063e09b8d571461067b576101c2565b8063a37b772b116100d1578063a37b772b14610518578063a729feb914610541578063adc419ce1461056a578063bf564eb714610595576101c2565b80639cf29bb9146104845780639f726e9d146104af578063a1c06f4d146104da576101c2565b806354aa4ad8116101645780637344070b1161013e5780637344070b146103c85780637dfaf86f146103f35780638fb987eb1461041c5780639cd8225114610459576101c2565b806354aa4ad8146103475780636d4cac5d146103725780636f9fb98a1461039d576101c2565b80631b687ef9116101a05780631b687ef91461026f5780633cd480d21461029a57806347d9dbb1146102dd5780634ea81c911461031c576101c2565b806302705088146101c75780630a0f98d11461020557806310ce715614610246575b600080fd5b3480156101d357600080fd5b506101ee60048036038101906101e9919061336f565b61071c565b6040516101fc929190613a8b565b60405180910390f35b34801561021157600080fd5b5061022c600480360381019061022791906134f6565b6107c8565b60405161023d959493929190613879565b60405180910390f35b34801561025257600080fd5b5061026d6004803603810190610268919061348f565b61095b565b005b34801561027b57600080fd5b50610284610d8f565b6040516102919190613963565b60405180910390f35b3480156102a657600080fd5b506102c160048036038101906102bc91906134f6565b6110db565b6040516102d497969594939291906139a0565b60405180910390f35b3480156102e957600080fd5b5061030460048036038101906102ff91906134f6565b611357565b60405161031393929190613c16565b60405180910390f35b34801561032857600080fd5b50610331611381565b60405161033e9190613bfb565b60405180910390f35b34801561035357600080fd5b5061035c611387565b6040516103699190613985565b60405180910390f35b34801561037e57600080fd5b5061038761139a565b6040516103949190613bfb565b60405180910390f35b3480156103a957600080fd5b506103b26113a0565b6040516103bf9190613bfb565b60405180910390f35b3480156103d457600080fd5b506103dd6113a8565b6040516103ea9190613a2b565b60405180910390f35b3480156103ff57600080fd5b5061041a60048036038101906104159190613398565b611436565b005b34801561042857600080fd5b50610443600480360381019061043e919061336f565b611932565b6040516104509190613bfb565b60405180910390f35b34801561046557600080fd5b5061046e61194a565b60405161047b919061385e565b60405180910390f35b34801561049057600080fd5b50610499611970565b6040516104a69190613bfb565b60405180910390f35b3480156104bb57600080fd5b506104c4611976565b6040516104d19190613985565b60405180910390f35b3480156104e657600080fd5b5061050160048036038101906104fc91906134f6565b611989565b60405161050f92919061393a565b60405180910390f35b34801561052457600080fd5b5061053f600480360381019061053a9190613398565b6119cd565b005b34801561054d57600080fd5b50610568600480360381019061056391906133d4565b611e7e565b005b34801561057657600080fd5b5061057f612104565b60405161058c919061385e565b60405180910390f35b3480156105a157600080fd5b506105bc60048036038101906105b791906134f6565b61212a565b6040516105cb93929190613a4d565b60405180910390f35b3480156105e057600080fd5b506105e96121fc565b6040516105f69190613bfb565b60405180910390f35b34801561060b57600080fd5b506106266004803603810190610621919061336f565b612202565b6040516106349291906138da565b60405180910390f35b34801561064957600080fd5b50610664600480360381019061065f919061336f565b612253565b6040516106729291906138da565b60405180910390f35b34801561068757600080fd5b506106a2600480360381019061069d919061336f565b6122a4565b005b3480156106b057600080fd5b506106cb60048036038101906106c6919061336f565b6127c9565b005b6106e760048036038101906106e29190613453565b612b8a565b005b6106f1612dac565b005b3480156106ff57600080fd5b5061071a60048036038101906107159190613398565b612e15565b005b600f60205280600052604060002060009150905080600001805461073f90613ef2565b80601f016020809104026020016040519081016040528092919081815260200182805461076b90613ef2565b80156107b85780601f1061078d576101008083540402835291602001916107b8565b820191906000526020600020905b81548152906001019060200180831161079b57829003601f168201915b5050505050908060010154905082565b60126020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169080600201805461083790613ef2565b80601f016020809104026020016040519081016040528092919081815260200182805461086390613ef2565b80156108b05780601f10610885576101008083540402835291602001916108b0565b820191906000526020600020905b81548152906001019060200180831161089357829003601f168201915b5050505050908060030180546108c590613ef2565b80601f01602080910402602001604051908101604052809291908181526020018280546108f190613ef2565b801561093e5780601f106109135761010080835404028352916020019161093e565b820191906000526020600020905b81548152906001019060200180831161092157829003601f168201915b5050505050908060040160009054906101000a900460ff16905085565b6000600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000180546109aa90613ef2565b905014156109ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e490613b7b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600d60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610a7e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a7590613adb565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610aee576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ae590613b9b565b60405180910390fd5b6000600f60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018054610b3d90613ef2565b9050148015610b50575060011515811515145b80610bba57506000600f60008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018054610ba590613ef2565b905014158015610bb9575060001515811515145b5b610bf9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bf090613b1b565b60405180910390fd5b81600d60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610c4460066131bb565b80600d60146101000a81548160ff021916908315150217905550610c686002613197565b60405180606001604052808481526020018373ffffffffffffffffffffffffffffffffffffffff168152602001610c9f60016131ad565b81525060106000610cb060026131ad565b81526020019081526020016000206000820151816000019080519060200190610cda9291906131c8565b5060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550604082015181600201559050503373ffffffffffffffffffffffffffffffffffffffff167f65c963ad0c6886db677d9d50d206d291b43f8a0698e54ef91a4741509f48ed4a8383610d7360026131ad565b604051610d8293929190613903565b60405180910390a2505050565b606060006001610d9f60036131ad565b610da99190613dea565b67ffffffffffffffff811115610de8577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051908082528060200260200182016040528015610e2157816020015b610e0e61324e565b815260200190600190039081610e065790505b5090506000600190505b610e3560036131ad565b8110156110d3576000601260008381526020019081526020016000206002018054610e5f90613ef2565b9050146110c057601260008281526020019081526020016000206040518060a00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282018054610f4090613ef2565b80601f0160208091040260200160405190810160405280929190818152602001828054610f6c90613ef2565b8015610fb95780601f10610f8e57610100808354040283529160200191610fb9565b820191906000526020600020905b815481529060010190602001808311610f9c57829003601f168201915b50505050508152602001600382018054610fd290613ef2565b80601f0160208091040260200160405190810160405280929190818152602001828054610ffe90613ef2565b801561104b5780601f106110205761010080835404028352916020019161104b565b820191906000526020600020905b81548152906001019060200180831161102e57829003601f168201915b505050505081526020016004820160009054906101000a900460ff1615151515815250508260018361107d9190613dea565b815181106110b4577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101819052505b80806110cb90613f55565b915050610e2b565b508091505090565b60166020528060005260406000206000915090508060000160009054906101000a900460ff169080600101805461111190613ef2565b80601f016020809104026020016040519081016040528092919081815260200182805461113d90613ef2565b801561118a5780601f1061115f5761010080835404028352916020019161118a565b820191906000526020600020905b81548152906001019060200180831161116d57829003601f168201915b50505050509080600201805461119f90613ef2565b80601f01602080910402602001604051908101604052809291908181526020018280546111cb90613ef2565b80156112185780601f106111ed57610100808354040283529160200191611218565b820191906000526020600020905b8154815290600101906020018083116111fb57829003601f168201915b50505050509080600301805461122d90613ef2565b80601f016020809104026020016040519081016040528092919081815260200182805461125990613ef2565b80156112a65780601f1061127b576101008083540402835291602001916112a6565b820191906000526020600020905b81548152906001019060200180831161128957829003601f168201915b5050505050908060040180546112bb90613ef2565b80601f01602080910402602001604051908101604052809291908181526020018280546112e790613ef2565b80156113345780601f1061130957610100808354040283529160200191611334565b820191906000526020600020905b81548152906001019060200180831161131757829003601f168201915b5050505050908060050154908060060160009054906101000a900460ff16905087565b60176020528060005260406000206000915090508060000154908060010154908060020154905083565b60085481565b600d60149054906101000a900460ff1681565b600e5481565b600047905090565b600b80546113b590613ef2565b80601f01602080910402602001604051908101604052809291908181526020018280546113e190613ef2565b801561142e5780601f106114035761010080835404028352916020019161142e565b820191906000526020600020905b81548152906001019060200180831161141157829003601f168201915b505050505081565b6000600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001805461148590613ef2565b905014156114c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016114bf90613b7b565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff16600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611558576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161154f90613bdb565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415806115d457506000601360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b611613576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161160a90613b9b565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff16601560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415806117ab57508173ffffffffffffffffffffffffffffffffffffffff16601560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161480156117aa5750600c60149054906101000a900460ff161515601560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160149054906101000a900460ff16151514155b5b6117ea576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016117e190613bbb565b60405180910390fd5b60405180604001604052808373ffffffffffffffffffffffffffffffffffffffff168152602001600c60149054906101000a900460ff161515815250601560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160000160146101000a81548160ff02191690831515021790555090505080156118e0576118df6005613197565b5b3373ffffffffffffffffffffffffffffffffffffffff167fce0c7a2a940807f7dc2ce7a615c2532e915e6c0ac9a08bc4ed9d515a710a53e283604051611926919061385e565b60405180910390a25050565b60136020528060005260406000206000915090505481565b600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60095481565b600c60149054906101000a900460ff1681565b60146020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154905082565b6000600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018054611a1c90613ef2565b90501415611a5f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611a5690613b7b565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff16600d60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611aef576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ae690613b9b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611b5f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611b5690613b9b565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff16601160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141580611cf757508173ffffffffffffffffffffffffffffffffffffffff16601160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16148015611cf65750601160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000160149054906101000a900460ff161515600d60149054906101000a900460ff16151514155b5b611d36576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611d2d90613b5b565b60405180910390fd5b8015611d4757611d466006613197565b5b60405180604001604052808373ffffffffffffffffffffffffffffffffffffffff168152602001600d60149054906101000a900460ff161515815250601160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160000160146101000a81548160ff0219169083151502179055509050503373ffffffffffffffffffffffffffffffffffffffff167f1e3bb36b558fe22d62599da354327ab8dc1d443365750cd924473dba8dc86f6583604051611e72919061385e565b60405180910390a25050565b6000601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414611f00576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611ef790613b3b565b60405180910390fd5b6000611f0c60036131ad565b90506040518060a001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018573ffffffffffffffffffffffffffffffffffffffff168152602001848152602001838152602001600015158152506012600083815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060408201518160020190805190602001906120219291906131c8565b50606082015181600301908051906020019061203e9291906131c8565b5060808201518160040160006101000a81548160ff02191690831515021790555090505080601360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506120b06003613197565b3373ffffffffffffffffffffffffffffffffffffffff167f556b14baaa29f0961e942fd40fa37f45e1db56a7c4eb86b7555143c977b420a2826040516120f69190613bfb565b60405180910390a250505050565b600d60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b601060205280600052604060002060009150905080600001805461214d90613ef2565b80601f016020809104026020016040519081016040528092919081815260200182805461217990613ef2565b80156121c65780601f1061219b576101008083540402835291602001916121c6565b820191906000526020600020905b8154815290600101906020018083116121a957829003601f168201915b5050505050908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154905083565b600a5481565b60156020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060000160149054906101000a900460ff16905082565b60116020528060005260406000206000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060000160149054906101000a900460ff16905082565b6000600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060000180546122f390613ef2565b90501415612336576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161232d90613b7b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156123c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016123bf90613bdb565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614158061244457506000601360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b612483576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161247a90613b9b565b60405180910390fd5b60085460146000601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205481526020019081526020016000206001015460646124e860056131ad565b6124f29190613d90565b6124fc9190613d5f565b106125fd57600c60149054906101000a900460ff161561258957600160126000601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054815260200190815260200160002060040160006101000a81548160ff0219169083151502179055506125f8565b600060126000601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054815260200190815260200160002060040160006101000a81548160ff0219169083151502179055505b6126f5565b600c60149054906101000a900460ff161561268557600060126000601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054815260200190815260200160002060040160006101000a81548160ff0219169083151502179055506126f4565b600160126000601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054815260200190815260200160002060040160006101000a81548160ff0219169083151502179055505b5b6000600c60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503373ffffffffffffffffffffffffffffffffffffffff167fc5e08c3ee0294f96dc8690e9a1189d7ce81ab53c4332d439cd36d03a7b2ade1b82601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040516127be92919061393a565b60405180910390a250565b6000600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001805461281890613ef2565b9050141561285b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161285290613b7b565b60405180910390fd5b8073ffffffffffffffffffffffffffffffffffffffff16600d60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146128eb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016128e290613b9b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561295b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161295290613b9b565b60405180910390fd5b6009546010600061296c60026131ad565b815260200190815260200160002060020154606461298a60066131ad565b6129949190613d90565b61299e9190613d5f565b10612adc576129ad6001613197565b6040518060400160405280601060006129c660026131ad565b815260200190815260200160002060000180546129e290613ef2565b80601f0160208091040260200160405190810160405280929190818152602001828054612a0e90613ef2565b8015612a5b5780601f10612a3057610100808354040283529160200191612a5b565b820191906000526020600020905b815481529060010190602001808311612a3e57829003601f168201915b50505050508152602001612a6f60016131ad565b815250600f60008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000820151816000019080519060200190612acd9291906131c8565b50602082015181600101559050505b6000600d60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600d60146101000a81548160ff0219169083151502179055503373ffffffffffffffffffffffffffffffffffffffff167fafdee47510aea9d664704785386ed92d5e2ba68996bfffcf8c0ae4ae664d3aa482604051612b7f919061385e565b60405180910390a250565b6000600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018054612bd990613ef2565b90501415612c1c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612c1390613b7b565b60405180910390fd5b6000601360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414158015612cd257506001151560126000601360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054815260200190815260200160002060040160009054906101000a900460ff161515145b612d11576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612d0890613afb565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015612d57573d6000803e3d6000fd5b503373ffffffffffffffffffffffffffffffffffffffff167f439b7f9a7ee5ab90a27d00ce8d1f8ad067652c4de6d63d7550e0f0e964b9a7728383604051612da092919061393a565b60405180910390a25050565b34600e6000828254612dbe9190613d09565b925050819055503373ffffffffffffffffffffffffffffffffffffffff167f2a01595cddf097c90216094025db714da3f4e5bd8877b56ba86a24ecead8e54334604051612e0b9190613bfb565b60405180910390a2565b6000600f60003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000018054612e6490613ef2565b90501415612ea7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612e9e90613b7b565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff16600c60009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614612f38576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612f2f90613abb565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16141580612fb457506000601360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b612ff3576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401612fea90613b9b565b60405180910390fd5b612ffd6004613197565b60405180604001604052808373ffffffffffffffffffffffffffffffffffffffff16815260200161302e60016131ad565b8152506014600061303f60046131ad565b815260200190815260200160002060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506020820151816001015590505081600c60006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600c60146101000a81548160ff02191690831515021790555061310660056131bb565b8173ffffffffffffffffffffffffffffffffffffffff167fdc699f091eecf6f31a1094ab14dfc438363743515eed68e59cea301bbce1915e601360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205460405161318b9190613bfb565b60405180910390a25050565b6001816000016000828254019250508190555050565b600081600001549050919050565b6000816000018190555050565b8280546131d490613ef2565b90600052602060002090601f0160209004810192826131f6576000855561323d565b82601f1061320f57805160ff191683800117855561323d565b8280016001018555821561323d579182015b8281111561323c578251825591602001919060010190613221565b5b50905061324a91906132ab565b5090565b6040518060a00160405280600073ffffffffffffffffffffffffffffffffffffffff168152602001600073ffffffffffffffffffffffffffffffffffffffff16815260200160608152602001606081526020016000151581525090565b5b808211156132c45760008160009055506001016132ac565b5090565b60006132db6132d684613c72565b613c4d565b9050828152602081018484840111156132f357600080fd5b6132fe848285613eb0565b509392505050565b6000813590506133158161425c565b92915050565b60008135905061332a81614273565b92915050565b600082601f83011261334157600080fd5b81356133518482602086016132c8565b91505092915050565b6000813590506133698161428a565b92915050565b60006020828403121561338157600080fd5b600061338f84828501613306565b91505092915050565b600080604083850312156133ab57600080fd5b60006133b985828601613306565b92505060206133ca8582860161331b565b9150509250929050565b6000806000606084860312156133e957600080fd5b60006133f786828701613306565b935050602084013567ffffffffffffffff81111561341457600080fd5b61342086828701613330565b925050604084013567ffffffffffffffff81111561343d57600080fd5b61344986828701613330565b9150509250925092565b6000806040838503121561346657600080fd5b600061347485828601613306565b92505060206134858582860161335a565b9150509250929050565b6000806000606084860312156134a457600080fd5b600084013567ffffffffffffffff8111156134be57600080fd5b6134ca86828701613330565b93505060206134db86828701613306565b92505060406134ec8682870161331b565b9150509250925092565b60006020828403121561350857600080fd5b60006135168482850161335a565b91505092915050565b600061352b83836137d2565b905092915050565b61353c81613e1e565b82525050565b61354b81613e1e565b82525050565b600061355c82613cb3565b6135668185613cd6565b93508360208202850161357885613ca3565b8060005b858110156135b45784840389528151613595858261351f565b94506135a083613cc9565b925060208a0199505060018101905061357c565b50829750879550505050505092915050565b6135cf81613e30565b82525050565b6135de81613e30565b82525050565b6135ed81613e8c565b82525050565b6135fc81613e9e565b82525050565b600061360d82613cbe565b6136178185613ce7565b9350613627818560208601613ebf565b61363081614089565b840191505092915050565b600061364682613cbe565b6136508185613cf8565b9350613660818560208601613ebf565b61366981614089565b840191505092915050565b6000613681601683613cf8565b915061368c8261409a565b602082019050919050565b60006136a4601883613cf8565b91506136af826140c3565b602082019050919050565b60006136c7601a83613cf8565b91506136d2826140ec565b602082019050919050565b60006136ea601183613cf8565b91506136f582614115565b602082019050919050565b600061370d601283613cf8565b91506137188261413e565b602082019050919050565b6000613730600e83613cf8565b915061373b82614167565b602082019050919050565b6000613753601183613cf8565b915061375e82614190565b602082019050919050565b6000613776601083613cf8565b9150613781826141b9565b602082019050919050565b6000613799601383613cf8565b91506137a4826141e2565b602082019050919050565b60006137bc601383613cf8565b91506137c78261420b565b602082019050919050565b600060a0830160008301516137ea6000860182613533565b5060208301516137fd6020860182613533565b50604083015184820360408601526138158282613602565b9150506060830151848203606086015261382f8282613602565b915050608083015161384460808601826135c6565b508091505092915050565b61385881613e82565b82525050565b60006020820190506138736000830184613542565b92915050565b600060a08201905061388e6000830188613542565b61389b6020830187613542565b81810360408301526138ad818661363b565b905081810360608301526138c1818561363b565b90506138d060808301846135d5565b9695505050505050565b60006040820190506138ef6000830185613542565b6138fc60208301846135d5565b9392505050565b60006060820190506139186000830186613542565b61392560208301856135d5565b613932604083018461384f565b949350505050565b600060408201905061394f6000830185613542565b61395c602083018461384f565b9392505050565b6000602082019050818103600083015261397d8184613551565b905092915050565b600060208201905061399a60008301846135d5565b92915050565b600060e0820190506139b5600083018a6135e4565b81810360208301526139c7818961363b565b905081810360408301526139db818861363b565b905081810360608301526139ef818761363b565b90508181036080830152613a03818661363b565b9050613a1260a083018561384f565b613a1f60c08301846135f3565b98975050505050505050565b60006020820190508181036000830152613a45818461363b565b905092915050565b60006060820190508181036000830152613a67818661363b565b9050613a766020830185613542565b613a83604083018461384f565b949350505050565b60006040820190508181036000830152613aa5818561363b565b9050613ab4602083018461384f565b9392505050565b60006020820190508181036000830152613ad481613674565b9050919050565b60006020820190508181036000830152613af481613697565b9050919050565b60006020820190508181036000830152613b14816136ba565b9050919050565b60006020820190508181036000830152613b34816136dd565b9050919050565b60006020820190508181036000830152613b5481613700565b9050919050565b60006020820190508181036000830152613b7481613723565b9050919050565b60006020820190508181036000830152613b9481613746565b9050919050565b60006020820190508181036000830152613bb481613769565b9050919050565b60006020820190508181036000830152613bd48161378c565b9050919050565b60006020820190508181036000830152613bf4816137af565b9050919050565b6000602082019050613c10600083018461384f565b92915050565b6000606082019050613c2b600083018661384f565b613c38602083018561384f565b613c45604083018461384f565b949350505050565b6000613c57613c68565b9050613c638282613f24565b919050565b6000604051905090565b600067ffffffffffffffff821115613c8d57613c8c61405a565b5b613c9682614089565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000613d1482613e82565b9150613d1f83613e82565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115613d5457613d53613f9e565b5b828201905092915050565b6000613d6a82613e82565b9150613d7583613e82565b925082613d8557613d84613fcd565b5b828204905092915050565b6000613d9b82613e82565b9150613da683613e82565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0483118215151615613ddf57613dde613f9e565b5b828202905092915050565b6000613df582613e82565b9150613e0083613e82565b925082821015613e1357613e12613f9e565b5b828203905092915050565b6000613e2982613e62565b9050919050565b60008115159050919050565b6000819050613e4a82614234565b919050565b6000819050613e5d82614248565b919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6000613e9782613e3c565b9050919050565b6000613ea982613e4f565b9050919050565b82818337600083830152505050565b60005b83811015613edd578082015181840152602081019050613ec2565b83811115613eec576000848401525b50505050565b60006002820490506001821680613f0a57607f821691505b60208210811415613f1e57613f1d61402b565b5b50919050565b613f2d82614089565b810181811067ffffffffffffffff82111715613f4c57613f4b61405a565b5b80604052505050565b6000613f6082613e82565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415613f9357613f92613f9e565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f616e6f7468657220766f746520697320676f696e672e00000000000000000000600082015250565b7f616e6f7468657220766f74696e6720697320676f696e672e0000000000000000600082015250565b7f6f6e6c7920617070726f7665642064616f2063616e206765742e000000000000600082015250565b7f616c72656164792066696e69736865642e000000000000000000000000000000600082015250565b7f616c7265616479207265676973746572642e0000000000000000000000000000600082015250565b7f616c726561647920766f7465642e000000000000000000000000000000000000600082015250565b7f6f6e6c79206d656d62657220646f65732e000000000000000000000000000000600082015250565b7f696e76616c696420616464726573732e00000000000000000000000000000000600082015250565b7f766f74696e672069732066696e69736865642e00000000000000000000000000600082015250565b7f6120766f74652069736e277420676f696e672e00000000000000000000000000600082015250565b6005811061424557614244613ffc565b5b50565b6007811061425957614258613ffc565b5b50565b61426581613e1e565b811461427057600080fd5b50565b61427c81613e30565b811461428757600080fd5b50565b61429381613e82565b811461429e57600080fd5b5056fea26469706673582212209f1f7ae30d50ee171e6c8ad78c5fd9a5b6bbb70e2e4b63bd0ea2e0f8de97aab564736f6c63430008040033',
  linkReferences: {},
  deployedLinkReferences: {},
}

export default MasterDAOContractConstruct
