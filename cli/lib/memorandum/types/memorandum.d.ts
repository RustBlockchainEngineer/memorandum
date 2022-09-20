export declare type Memorandum = {
    "version": "0.1.0";
    "name": "memorandum";
    "instructions": [
        {
            "name": "createGlobalState";
            "accounts": [
                {
                    "name": "superOwner";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "payer";
                    "isMut": true;
                    "isSigner": true;
                },
                {
                    "name": "globalState";
                    "isMut": true;
                    "isSigner": false;
                },
                {
                    "name": "memorandumProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "programData";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "systemProgram";
                    "isMut": false;
                    "isSigner": false;
                },
                {
                    "name": "rent";
                    "isMut": false;
                    "isSigner": false;
                }
            ];
            "args": [];
        }
    ];
    "accounts": [
        {
            "name": "globalState";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "bump";
                        "type": "u8";
                    },
                    {
                        "name": "superOwner";
                        "type": "publicKey";
                    },
                    {
                        "name": "penaltyWallet";
                        "type": "publicKey";
                    },
                    {
                        "name": "memorandumCount";
                        "type": "u64";
                    },
                    {
                        "name": "reserved";
                        "type": {
                            "array": [
                                "u128",
                                7
                            ];
                        };
                    }
                ];
            };
        },
        {
            "name": "memorandumManager";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "bump";
                        "type": "u8";
                    },
                    {
                        "name": "penaltyMint";
                        "type": "publicKey";
                    },
                    {
                        "name": "penaltyAmount";
                        "type": "u64";
                    },
                    {
                        "name": "reserved";
                        "type": {
                            "array": [
                                "u128",
                                5
                            ];
                        };
                    }
                ];
            };
        },
        {
            "name": "memorandum";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "bump";
                        "type": "u8";
                    },
                    {
                        "name": "creator";
                        "type": "publicKey";
                    },
                    {
                        "name": "memorandumManager";
                        "type": "publicKey";
                    },
                    {
                        "name": "memorandumNum";
                        "type": "u64";
                    },
                    {
                        "name": "title";
                        "type": "string";
                    },
                    {
                        "name": "content";
                        "type": "string";
                    },
                    {
                        "name": "reserved";
                        "type": {
                            "array": [
                                "u128",
                                7
                            ];
                        };
                    }
                ];
            };
        }
    ];
    "types": [
        {
            "name": "CreateMemorandumIx";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "title";
                        "type": "string";
                    },
                    {
                        "name": "content";
                        "type": "string";
                    }
                ];
            };
        },
        {
            "name": "UpdateMemorandumIx";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "title";
                        "type": "string";
                    },
                    {
                        "name": "content";
                        "type": "string";
                    }
                ];
            };
        }
    ];
    "events": [
        {
            "name": "GlobalStateCreated";
            "fields": [];
        },
        {
            "name": "GlobalStateUpdated";
            "fields": [];
        },
        {
            "name": "MemorandumManagerCreated";
            "fields": [];
        },
        {
            "name": "MemorandumManagerUpdated";
            "fields": [];
        },
        {
            "name": "MemorandumCreated";
            "fields": [];
        },
        {
            "name": "MemorandumUpdated";
            "fields": [];
        }
    ];
    "errors": [
        {
            "code": 6000;
            "name": "Unauthorized";
            "msg": "You are not authorized to perform this action.";
        },
        {
            "code": 6001;
            "name": "AlreadyInUse";
            "msg": "AlreadyInUse";
        },
        {
            "code": 6002;
            "name": "InvalidProgramAddress";
            "msg": "InvalidProgramAddress";
        },
        {
            "code": 6003;
            "name": "InvalidOwner";
            "msg": "InvalidOwner";
        },
        {
            "code": 6004;
            "name": "InvalidMint";
            "msg": "Invalid Mint";
        },
        {
            "code": 6005;
            "name": "NotAllowed";
            "msg": "NotAllowed";
        },
        {
            "code": 6006;
            "name": "MathOverflow";
            "msg": "Math operation overflow";
        },
        {
            "code": 6007;
            "name": "InvalidAccountInput";
            "msg": "InvalidAccountInput";
        },
        {
            "code": 6008;
            "name": "InvalidPubkey";
            "msg": "InvalidPubkey";
        },
        {
            "code": 6009;
            "name": "InvalidAmount";
            "msg": "InvalidAmount";
        },
        {
            "code": 6010;
            "name": "InvalidProgramData";
            "msg": "The provided program data is incorrect.";
        },
        {
            "code": 6011;
            "name": "InvalidProgramUpgradeAuthority";
            "msg": "The provided program upgrade authority is incorrect.";
        },
        {
            "code": 6012;
            "name": "InvalidLength";
            "msg": "The length of string is incorrect.";
        }
    ];
};
export declare const IDL: Memorandum;
