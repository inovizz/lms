#!/usr/bin/env bash
cd lms/scripts
solc ../contracts/LMS.sol  --combined-json abi,asm,ast,bin,bin-runtime,clone-bin,devdoc,interface,opcodes,srcmap,srcmap-runtime,userdoc > ../build/LMS.json
node overdue_books_reminder.js