// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IMultisig {
    function addAdmin(address _newAdmin) external;

    function calcPercentage() external view returns (uint256 _perc);

    function returnAdmins() external view returns (address[] memory _admins);
}