use aiken/collection/dict
use aiken/collection/list
use cardano/assets.{PolicyId, tokens}
use cardano/transaction.{Input, Output, OutputReference, Transaction}

validator swap_tokens(nft: PolicyId, ft: PolicyId) {
  spend(
    _datum: Option<Data>,
    _redeemer: Data,
    oref: OutputReference,
    self: Transaction,
  ) {
    let Transaction { inputs, outputs, .. } = self

    expect Some(input) =
      list.find(inputs, fn(input) { input.output_reference == oref })

    let validator_address = input.output.address

    when tokens(input.output.value, nft) |> dict.to_pairs() is {
      // If the input ref contains an NFT, make sure the output ref doesn't have the NFT, and it contains exactly 10 FT.
      [Pair(_nft_asset_name, _nft_amount)] -> {
        // Get the output of the validator script.
        expect Some(output) =
          list.find(outputs, fn(output) { output.address == validator_address })
        // Validate the output utxo has exactly 10 FT on the utxo
        expect [Pair(_ft_asset_name, ft_amount)] =
          tokens(output.value, ft) |> dict.to_pairs()
        ft_amount == 10
      }

      // If the input ref contains FT, make sure the output ref doesn't have the FT, and it contains exactly 1 NFT.
      _ -> {
        expect Some(output) =
          list.find(outputs, fn(output) { output.address == validator_address })
        expect [Pair(_nft_asset_name, nft_amount)] =
          tokens(output.value, nft) |> dict.to_pairs()
        nft_amount == 1
      }
    }
  }

  else(_) {
    fail
  }
}
