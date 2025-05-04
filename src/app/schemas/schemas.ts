/*
    Schemas: Standardized structures for defining, encoding, validating, and decoding data.
*/

/*
    SCHEMA FIELD DEFINITIONS
    ------------------------
    
    name: A human-readable identifier you choose for the schema
          Example: "UserProfile" or "PostHistory[]"
    
    key: The Keccak256 hash of the schema name (with 0x prefix)
         How to generate: Use https://keccak-256.4tools.net/ and add 0x prefix
         Example: UserProfile -> "0x83f02d96c863c947331df5cffb3f36a5bc59c1e32c159667d318c9e5ac5c0c5e"
    
    keyType: Determines how the data is stored and accessed
*/

// SINGLETON KEY TYPE
// ------------------
// For storing a single unique value
// Properties: Stores one value at a single key
// Example use case: Token name, symbol etc.

// Example: Basic token information
const SingletonExampleSchema = {
    "name": "TokenName",
    "key": "0x83f02d96c863c947331df5cffb3f36a5bc59c1e32c159667d318c9e5ac5c0c5e",
    "keyType": "Singleton",
    "valueType": "string",
    "valueContent": "string" // Stores token name as string
}

// ARRAY KEY TYPE
// -------------
// For storing ordered lists of the same data type
// Properties: 
//   ✓ Order matters (elements are retrieved in insertion order)
//   ✓ Duplicates allowed (same value can appear multiple times)
// Example use cases:
//   • Transaction history by tx hash
//   • Post history by content ID
//   • Received assets by contract address
//   • Issued tokens/NFTs by contract address

// Example: User's content or post history
const ArrayExampleSchema = {
    "name": "PostHistory[]",
    "key": "0x7c7c2649e6cc94303fa4b29314592e607ed6a57f3f4e41a5f8275ec9bf40537b",
    "keyType": "Array",
    "valueType": "bytes32",
    "valueContent": "ContentID" // Each entry is a unique content identifier
}

// MAPPING KEY TYPE
// --------------
// For creating lookup tables with efficient key-based access
// Properties: 
//   ✓ Order doesn't matter (retrieval by key, not position)
//   ✗ No duplicates (keys must be unique)

// Mapping Types:
//   • Word-to-Word: FirstWord:SecondWord format
//     Example: SupportedStandards:LSP3Profile
//   
//   • Word-to-Type: FirstWord:<mixed type> format
//     Example: TokenBalances:<address>, Metadata:<bytes32>
//    
// Data Handling for Mixed Types:
//   • All data types are left-padded
//   • For types larger than 20 bytes:
//     - Left-cut for uint<M>, int<M>, and bool
//     - Right-cut for bytes<M> and address
//      
// Example use cases:
//   • TokenBalances:<address> - Store token balances by wallet address
//   • NFTMetadata:<tokenId> - Store metadata for each NFT by ID
//   • SupportedStandards:<standardName> - Track supported standards by name
//   • UserRoles:<userId> - Store role assignments by user
//   • AssetRegistry:<assetAddress> - Track registered assets by contract address

// Example 1: Word-to-Word mapping (standards support)
const MappingWordToWordSchema = {
    "name": "SupportedStandards:LSP3Profile",
    "key": "0xeafec4d89fa9619884b600005ef83ad9559033e6e941db7d7c495acdce616347",
    "keyType": "Mapping",
    "valueType": "bytes4",
    "valueContent": "InterfaceID" // Interface identifier
}

// Example 2: Word-to-Address mapping (assets by address)
// Address: 0xcafecafecafecafecafecafecafecafecafecafe
const MappingToAddressSchema = {
    "name": "ReceivedAssetsMap:<address>",
    "key": "0x812c4334633eb816c80d0000cafecafecafecafecafecafecafecafecafecafe",
    "keyType": "Mapping",
    "valueType": "(bytes4,uint128)",
    "valueContent": "(InterfaceID,Number)" // Composite data type
}

// Example 3: Word-to-Bytes32 mapping (metadata by token ID)
// Bytes32: 0xaaaabbbbccccddddeeeeffff111122223333444455556666777788889999aaaa (right-cut)
const MappingToBytes32Schema = {
    "name": "Metadata:<bytes32>",
    "key": "0x73dcc7c3c4096cdc7f8a0000aaaabbbbccccddddeeeeffff1111222233334444",
    "keyType": "Mapping",
    "valueType": "bytes",
    "valueContent": "IPFS" // IPFS hash pointing to metadata
}

// MAPPING WITH GROUPING KEY TYPE
// -----------------------------
// For creating hierarchical mappings with sub-types
// Properties:
//   ✓ Order doesn't matter (retrieval by key, not position)
//   ✗ No duplicates (keys must be unique)
//   ✓ Supports sub-types within primary mapping

// Key Format: <firstWordHash>:<secondWordHash>:<bytes2(0)>:<thirdWordHash>

// ⚠️ Warning: If you use the same value for firstWord and thirdWord, there is a 
//    0.0000000233% chance that two random values for secondWord will result in the 
//    same data key (hash collision).
      
// Example use cases:
//   • Permission systems with different permission types
//   • Categorized metadata with different sub-types
//   • Multi-level access control systems

// Example: Address permissions system with sub-types
const MappingWithGroupingSchema = {
    "name": "AddressPermissions:Permissions:<address>",
    "key": "0x4b80742de2bf82acb3630000<address>",
    "keyType": "MappingWithGrouping",
    "valueType": "bytes32",
    "valueContent": "BitArray" // Permissions stored as bit array
}

// VALUE TYPE ENCODINGS
// -------------------
// LSP2 defines specific encoding rules that differ from standard ABI encoding

// Key differences from ABI encoding:
// • Static types (uintM, bytesN, bool) are encoded without padding to 32 bytes
// • bytes and string are encoded as raw bytes without length or offset information
// • Array types (uintM[], bytesN[], etc.) follow standard ABI encoding rules

/* 
  Encoding Format By Type:
  +-----------+------------------------------------+--------------------------------------------------+
  | valueType | Encoding                           | Example                                          |
  +-----------+------------------------------------+--------------------------------------------------+
  | bool      | 0x01 or 0x00                       | true --> 0x01 / false --> 0x00                   |
  | string    | utf8 hex bytes, no padding         | "Hello" --> 0x48656c6c6f                         |
  | address   | 20 bytes long address              | 0x388C818CA8B9251b393131C08a736A67ccB19297       |
  | uint256   | 32 bytes, left padded with zeros   | 5 --> 0x0000...0005 (32 bytes total)             |
  | uintN     | N/8 bytes, left padded with zeros  | 5 as uint32 --> 0x00000005                       |
  | bytes32   | 32 bytes, right padded             | 0xca5ebeef...3436 (32 bytes total)               |
  | bytes4    | 4 bytes, right padded              | 0xcafecafe                                       |
  | bytesN    | N bytes, right padded              | (varies by N)                                     |
  | bytes     | hex bytes of any length, no padding| 0xcafecafecafecafecafecafecafecafe...            |
  +-----------+------------------------------------+--------------------------------------------------+
*/