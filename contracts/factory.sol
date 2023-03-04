// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {MultiSig} from "./multiSig.sol";

contract cloneMultiSig {
    MultiSig[] private _multisigs;

    event child(address _child);

    function createMultiSig(address[] memory _admins)
        public
        returns (MultiSig newMultisig)
    {
        newMultisig = new MultiSig(_admins, msg.sender);
        _multisigs.push(newMultisig);

        emit child(address(newMultisig));
    }
}