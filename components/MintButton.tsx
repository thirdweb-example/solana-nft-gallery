import styles from "../styles/Home.module.css";
import {
  useProgram,
  useProgramMetadata,
  useNFTs,
  useMintNFT,
} from "@thirdweb-dev/react/solana";

// Replace this with your program
const PROGRAM_ADDRESS = "CyqFcqwSyV9GZprRE3oRwFb4N5nRFdqZEFGnA6eB1j3U";

const MintButton = () => {
  const { data: program } = useProgram(PROGRAM_ADDRESS, "nft-collection");
  const { data: metadata } = useProgramMetadata(program);
  const { data: nfts } = useNFTs(program);
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
