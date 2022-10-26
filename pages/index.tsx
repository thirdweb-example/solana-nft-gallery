import type { NextPage } from "next";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  useProgram,
  useProgramMetadata,
  useNFTs,
} from "@thirdweb-dev/react/solana";
import Card from "../components/Card";
import MintButton from "../components/MintButton";
import styles from "../styles/Home.module.css";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const PROGRAM_ADDRESS = "CyqFcqwSyV9GZprRE3oRwFb4N5nRFdqZEFGnA6eB1j3U";

const Home: NextPage = () => {
  const { data: program } = useProgram(PROGRAM_ADDRESS, "nft-collection");
  const { data: metadata, isLoading: loadingMetadata } =
    useProgramMetadata(program);
  const { data: nfts, isLoading } = useNFTs(program);

  const { publicKey } = useWallet();

  return (
    <>
      <div className={styles.container}>
        {loadingMetadata ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <>
            <h1 className={styles.h1}>{metadata?.name}</h1>
            <div className={styles.iconContainer}>
              <img
                className={styles.thumbnail}
                src={String(metadata?.image)}
                alt={String(metadata?.name)}
                height={120}
              />
            </div>
            <p className={styles.explain}>{metadata?.description}</p>
          </>
        )}
        <div className={styles.buttons}>
          <WalletMultiButton />
          {publicKey && <MintButton />}
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <main className={styles.gallery}>
            {nfts?.map((nft, idx) => (
              <Card key={idx} nft={nft} />
            ))}
          </main>
        )}
      </div>
    </>
  );
};

export default Home;
