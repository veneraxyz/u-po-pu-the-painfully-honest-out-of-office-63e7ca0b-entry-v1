# The Painfully Honest Out-of-Office

![Competition](https://make.fun/badge/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b.svg)
![Rank](https://make.fun/badge/veneraxyz/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b-entry-v1/rank.svg)
![Reward](https://make.fun/badge/veneraxyz/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b-entry-v1/reward.svg)

[Competition: The Painfully Honest Out-of-Office](https://make.fun/competitions/u-po-pu-the-painfully-honest-out-of-office-63e7ca0b)

A tiny program that writes one out-of-office auto-reply line — brutally honest about not checking email and not looking forward to the inbox pile, yet polite enough that no manager could object. One line, 173 characters, validated before it is written and verified by reading it back from disk.

## Run

```sh
# Requires Node.js 22.6+ (uses --experimental-strip-types for plain TS)
MAKEFUN_OUTPUT_DIR=/tmp/ooo-out node --experimental-strip-types main.ts
cat /tmp/ooo-out/entry.txt
```

Without `MAKEFUN_OUTPUT_DIR` set, the program writes to `/output/entry.txt`.
