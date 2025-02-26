import {
  applyParamsToScript,
  Assets,
  Blockfrost,
  Data,
  fromText,
  Lucid,
} from "@spacebudz/lucid";
import plutus from "../token-swapping/plutus.json" with { type: "json" };

const lucid = new Lucid({
  provider: new Blockfrost(
    "https://cardano-preprod.blockfrost.io/api/v0/",
    Deno.env.get("BLOCKFROST_API_KEY")!,
  ),
});

const nftPolicyId = Deno.env.get("NFT_POLICY_ID")!;
const ftPolicyId = Deno.env.get("FT_POLICY_ID")!;

const swapScript = applyParamsToScript(
  [nftPolicyId, ftPolicyId],
  plutus.validators[0].compiledCode,
);

const tokenSwapAddress = lucid.utils.scriptToAddress({
  type: "PlutusV3",
  script: swapScript,
});

lucid.selectWalletFromSeed(Deno.env.get("SEED_PHRASE")!);

const name = "Fungible Native Asset";
const unit = ftPolicyId + fromText(name);

const assets: Assets = {
  [unit]: 10n,
};

const tx = await lucid.newTx().payToContract(
  tokenSwapAddress,
  Data.void(),
  assets,
)
  .commit();
const signedTx = await tx.sign().commit();
const txHash = await signedTx.submit();
console.log("txHash:", txHash);
