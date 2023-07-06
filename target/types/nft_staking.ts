export type NftStaking = {
  "version": "0.1.0",
  "name": "nft_staking",
  "instructions": [
    {
      "name": "initialize",
      "docs": [
        "* Initialize global pool\n     * super admin sets to the caller of this instruction"
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initUser",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "stakeNft",
      "docs": [
        "* User can stake NFTs from specific collection"
      ],
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftEdition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "the mint metadata"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "unstakeNft",
      "docs": [
        "* User can unstake NFTs when they want"
      ],
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftEdition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "lockPnft",
      "accounts": [
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMintEdition",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong edition is supplied"
          ]
        },
        {
          "name": "tokenMintRecord",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong record is supplied"
          ]
        },
        {
          "name": "mintMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong metadata is supplied"
          ]
        },
        {
          "name": "authRules",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong rules are supplied"
          ]
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong sysvar ixns are supplied"
          ]
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK intstruction will fail if wrong program is supplied"
          ]
        },
        {
          "name": "authRulesProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK intstruction will fail if wrong program is supplied"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "unlockPnft",
      "accounts": [
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMintEdition",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong edition is supplied"
          ]
        },
        {
          "name": "tokenMintRecord",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong record is supplied"
          ]
        },
        {
          "name": "mintMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong metadata is supplied"
          ]
        },
        {
          "name": "authRules",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong rules are supplied"
          ]
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong sysvar ixns are supplied"
          ]
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK intstruction will fail if wrong program is supplied"
          ]
        },
        {
          "name": "authRulesProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK intstruction will fail if wrong program is supplied"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "globalPool",
      "docs": [
        "* Global pool stores admin address"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "userPool",
      "docs": [
        "* User pool stores user's stake data"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "stakeCnt",
            "type": "u8"
          },
          {
            "name": "stakeData",
            "type": {
              "vec": {
                "defined": "StakeInfo"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "StakeInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "time",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAdmin",
      "msg": "Admin address dismatch"
    },
    {
      "code": 6001,
      "name": "ExceedMaxCount",
      "msg": "Max count reached"
    },
    {
      "code": 6002,
      "name": "InvalidMetadata",
      "msg": "Metadata address is invalid"
    },
    {
      "code": 6003,
      "name": "InvalidCollection",
      "msg": "Collection is invalid"
    },
    {
      "code": 6004,
      "name": "MetadataCreatorParseError",
      "msg": "Can not parse creators in metadata"
    },
    {
      "code": 6005,
      "name": "NftNotExist",
      "msg": "Can not find NFT"
    }
  ]
};

export const IDL: NftStaking = {
  "version": "0.1.0",
  "name": "nft_staking",
  "instructions": [
    {
      "name": "initialize",
      "docs": [
        "* Initialize global pool\n     * super admin sets to the caller of this instruction"
      ],
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "initUser",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "stakeNft",
      "docs": [
        "* User can stake NFTs from specific collection"
      ],
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftEdition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "the mint metadata"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "unstakeNft",
      "docs": [
        "* User can unstake NFTs when they want"
      ],
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "globalPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftEdition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "lockPnft",
      "accounts": [
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMintEdition",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong edition is supplied"
          ]
        },
        {
          "name": "tokenMintRecord",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong record is supplied"
          ]
        },
        {
          "name": "mintMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong metadata is supplied"
          ]
        },
        {
          "name": "authRules",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong rules are supplied"
          ]
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong sysvar ixns are supplied"
          ]
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK intstruction will fail if wrong program is supplied"
          ]
        },
        {
          "name": "authRulesProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK intstruction will fail if wrong program is supplied"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "unlockPnft",
      "accounts": [
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMintEdition",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong edition is supplied"
          ]
        },
        {
          "name": "tokenMintRecord",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong record is supplied"
          ]
        },
        {
          "name": "mintMetadata",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong metadata is supplied"
          ]
        },
        {
          "name": "authRules",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong rules are supplied"
          ]
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK instruction will fail if wrong sysvar ixns are supplied"
          ]
        },
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userPool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK intstruction will fail if wrong program is supplied"
          ]
        },
        {
          "name": "authRulesProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK intstruction will fail if wrong program is supplied"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "globalPool",
      "docs": [
        "* Global pool stores admin address"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "userPool",
      "docs": [
        "* User pool stores user's stake data"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "stakeCnt",
            "type": "u8"
          },
          {
            "name": "stakeData",
            "type": {
              "vec": {
                "defined": "StakeInfo"
              }
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "StakeInfo",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "time",
            "type": "i64"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidAdmin",
      "msg": "Admin address dismatch"
    },
    {
      "code": 6001,
      "name": "ExceedMaxCount",
      "msg": "Max count reached"
    },
    {
      "code": 6002,
      "name": "InvalidMetadata",
      "msg": "Metadata address is invalid"
    },
    {
      "code": 6003,
      "name": "InvalidCollection",
      "msg": "Collection is invalid"
    },
    {
      "code": 6004,
      "name": "MetadataCreatorParseError",
      "msg": "Can not parse creators in metadata"
    },
    {
      "code": 6005,
      "name": "NftNotExist",
      "msg": "Can not find NFT"
    }
  ]
};
