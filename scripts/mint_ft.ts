import { Addresses, Blockfrost, fromText, Lucid } from "@spacebudz/lucid";
import { get721Metadata } from "./metadata/721.ts";

const lucid = new Lucid({
  provider: new Blockfrost(
    "https://cardano-preprod.blockfrost.io/api/v0/",
    Deno.env.get("BLOCKFROST_API_KEY")!
  ),
});

lucid.selectWalletFromSeed(Deno.env.get("SEED_PHRASE")!);

const { payment } = Addresses.inspect(await lucid.wallet.address());

const mintingPolicy = lucid.newScript({
  type: "All",
  scripts: [
    { type: "Sig", keyHash: payment!.hash },
    {
      type: "Before",
      slot: lucid.utils.unixTimeToSlots(Date.now() + 10000000),
    },
  ],
});

const policyId = mintingPolicy.toHash();

const nftNames = ["TSnek01", "TSnek02", "TSnek03"];

nftNames.forEach(async (name) => {
  const unit = policyId + fromText(name);

  const metadata = get721Metadata(policyId, name);
  const tx = await lucid
    .newTx()
    .mint({ [unit]: 1n })
    .attachScript(mintingPolicy)
    .attachMetadata(721, metadata)
    .commit();
  const signedTx = await tx.sign().commit();
  const txHash = await signedTx.submit();
  console.log("Successful mint of " + name + " with txHash: " + txHash);
});
