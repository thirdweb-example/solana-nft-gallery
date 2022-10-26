# Solana NFT Gallery

Create a web application that showcases all of the NFTs that have been minted into an [NFT Collection Program](https://portal.thirdweb.com/pre-built-contracts/solana/nft-collection) on the Solana network!

## Getting Started

Create a project using this example:

```bash
npx thirdweb create --template solana-nft-gallery
```

Edit the `PROGRAM_ADDRESS` variable on the `_app.tsx` and `index.tsx` pages to be your programs address.

## Guide

Below we'll explore the key areas of the codebase.

### Reading Program Info

First, we connect to our program using the `useProgram` hook:

```jsx
const { data: program } = useProgram(PROGRAM_ADDRESS, "nft-collection");
```

From here, we can read information about the program itself as well as information about the NFTs within it:

```jsx
const { data: metadata, isLoading: loadingMetadata } =
  useProgramMetadata(program);
const { data: nfts, isLoading } = useNFTs(program);
```

No we have the metadata of the program in the `metadata` field and an array of NFTs inside the `nft` field!

### Rendering NFTs

On the UI, we iterate over the `nfts` array and transform each NFT into a `Card` component:

```jsx
{
  isLoading ? (
    <p>Loading...</p>
  ) : (
    <main className={styles.gallery}>
      {nfts?.map((nft, idx) => (
        <Card key={idx} nft={nft} />
      ))}
    </main>
  );
}
```

The `Card` component is a simple component that renders the NFT metadata and owner, making use of the [ThirdwebNftMedia](https://portal.thirdweb.com/ui-components/nft-renderer) UI component to display all kinds of NFTs:

```jsx
const Card: FC<Props> = ({ nft }) => {
  return (
    <div className={styles.card}>
      <ThirdwebNftMedia className={styles.thumbnail} metadata={nft.metadata} />
      <h3>{nft.metadata.name}</h3>
      <p>Owned by</p>
      <p>
        {nft.owner.substring(0, REVEALED_COUNT) +
          "..." +
          nft.owner.substring(nft.owner.length - REVEALED_COUNT)}
      </p>
    </div>
  );
};
```

### Minting New NFTs

You can also mint new NFTs into the program directly from the application:

```jsx
const MintButton = () => {
  const { mutateAsync: mintNft, isLoading } = useMintNFT(program);

  const mint = async () => {
    if (!metadata || !nfts) return;

    await mintNft({
      metadata: {
        name: metadata.name + `#${nfts.length + 1}`,
        description: metadata.description,
        image: metadata.image,
      },
    });
  };

  return (
    <button onClick={mint} className={styles.mintButton}>
      {isLoading ? "Minting..." : "Mint"}
    </button>
  );
};

export default MintButton;
```

## Learn More

To learn more about thirdweb and Next.js, take a look at the following resources:

- [thirdweb React Documentation](https://docs.thirdweb.com/react) - learn about our React SDK.
- [thirdweb TypeScript Documentation](https://docs.thirdweb.com/typescript) - learn about our JavaScript/TypeScript SDK.
- [thirdweb Portal](https://docs.thirdweb.com) - check our guides and development resources.
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

You can check out [the thirdweb GitHub organization](https://github.com/thirdweb-dev) - your feedback and contributions are welcome!

## Join our Discord!

For any questions, suggestions, join our discord at [https://discord.gg/thirdweb](https://discord.gg/thirdweb).
