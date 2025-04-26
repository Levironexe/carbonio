/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/company_registration.json`.
 */
export type CompanyRegistration = {
  "address": "ACRzjs3gnGYhkRZaGaCjMdS8ybVsAHv4n4dQMzKLoYaf",
  "metadata": {
    "name": "companyRegistration",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "addProduct",
      "discriminator": [
        0,
        219,
        137,
        36,
        105,
        180,
        164,
        93
      ],
      "accounts": [
        {
          "name": "signer",
          "signer": true
        },
        {
          "name": "company",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  112,
                  97,
                  110,
                  121
                ]
              },
              {
                "kind": "arg",
                "path": "companyAddress"
              }
            ]
          }
        }
      ],
      "args": [
        {
          "name": "companyAddress",
          "type": "pubkey"
        }
      ]
    },
    {
      "name": "initCompany",
      "discriminator": [
        4,
        20,
        200,
        152,
        94,
        207,
        211,
        98
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "company",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  112,
                  97,
                  110,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "companyName",
          "type": "string"
        }
      ]
    },
    {
      "name": "verify",
      "discriminator": [
        133,
        161,
        141,
        48,
        120,
        198,
        88,
        150
      ],
      "accounts": [
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "company",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  111,
                  109,
                  112,
                  97,
                  110,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "company",
      "discriminator": [
        32,
        212,
        52,
        137,
        90,
        7,
        206,
        183
      ]
    }
  ],
  "types": [
    {
      "name": "company",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "companyName",
            "type": "string"
          },
          {
            "name": "verificationStatus",
            "type": "string"
          },
          {
            "name": "verificationTime",
            "type": "i64"
          },
          {
            "name": "productsAmount",
            "type": "u32"
          },
          {
            "name": "companySigner",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
