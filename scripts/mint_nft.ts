import { Addresses, Blockfrost, fromText, Lucid } from "@spacebudz/lucid";
import { get721Metadata } from "./metadata/721.ts";

const lucid = new Lucid({
  provider: new Blockfrost(
    "https://cardano-preprod.blockfrost.io/api/v0",
    Deno.env.get("BLOCKFROST_API_KEY")!
  ),
});

lucid.selectWalletFromSeed(Deno.env.get("SEED_PHRASE")!);

const { payment } = Addresses.inspect(await lucid.wallet.address());

const mintingPolicy = lucid.newScript({
  type: "Sig",
  keyHash: payment!.hash,
});

const policyId = mintingPolicy.toHash();

const name = "tNFT01";
const unit = policyId + fromText(name);

const metadata = get721Metadata(policyId, name, { "Attribute 1": "Value" });
const tx = await lucid
  .newTx()
  .mint({ [unit]: 1n })
  .validTo(Date.now() + 200000)
  .attachScript(mintingPolicy)
  .attachMetadata(721, metadata)
  .commit();
const signedTx = await tx.sign().commit();
const txHash = await signedTx.submit();
console.log("Successful mint of " + name + " with txHash: " + txHash);
