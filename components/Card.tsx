import { NFT } from "@thirdweb-dev/sdk";
import { FC } from "react";
import styles from "../styles/Home.module.css";

type Props = {
  nft: NFT;
};

// revealed address character count
const REVEALED_COUNT = 4;

const Card: FC<Props> = ({ nft }) => {
  return (
    <div className={styles.card}>
      <img className={styles.thumbnail} src={nft.metadata.image || ""} />
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

export default Card;
