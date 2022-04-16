/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TeamData } from "../store/groupStageReducer";
import { playoffMatchData } from "../store/playoffStageReducer";
import { GroupKnockoutData } from "./generateEliminationData";

export const mapEliminationData = (
  matches: playoffMatchData[],
  result: GroupKnockoutData[]
) => {
  matches.forEach((match) => {
    switch (match.matchNumber) {
      case 49:
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        match.teamOne = result.find((i: any) => i.name === "Group A")?.winner!;
        match.teamTwo = result.find(
          (i: any) => i.name === "Group B"
        )?.second_spot!;
        break;
      case 50:
        match.teamOne = result.find((i: any) => i.name === "Group C")?.winner!;
        match.teamTwo = result.find(
          (i: any) => i.name === "Group D"
        )?.second_spot!;
        break;
      case 51:
        match.teamOne = result.find((i: any) => i.name === "Group B")?.winner!;
        match.teamTwo = result.find(
          (i: any) => i.name === "Group A"
        )?.second_spot!;
        break;
      case 52:
        match.teamOne = result.find((i: any) => i.name === "Group D")?.winner!;
        match.teamTwo = result.find(
          (i: any) => i.name === "Group C"
        )?.second_spot!;
        break;
      case 53:
        match.teamOne = result.find((i: any) => i.name === "Group E")?.winner!;
        match.teamTwo = result.find(
          (i: any) => i.name === "Group F"
        )?.second_spot!;
        break;
      case 54:
        match.teamOne = result.find((i: any) => i.name === "Group G")?.winner!;
        match.teamTwo = result.find(
          (i: any) => i.name === "Group H"
        )?.second_spot!;
        break;
      case 55:
        match.teamOne = result.find((i: any) => i.name === "Group F")?.winner!;
        match.teamTwo = result.find(
          (i: any) => i.name === "Group E"
        )?.second_spot!;
        break;
      case 56:
        match.teamOne = result.find((i: any) => i.name === "Group H")?.winner!;
        match.teamTwo = result.find(
          (i: any) => i.name === "Group G"
        )?.second_spot!;
        break;
    }
  });

  return matches;
};

export const updateBracketHelper = (
  oldData: playoffMatchData[],
  oldTeam: string,
  newTeam: TeamData,
  matchChanged: number
) => {
  if (oldTeam !== "None") {
    oldData.forEach((match) => {
      if (match.matchNumber > matchChanged) {
        if (match.teamOne.name === oldTeam) {
          match.teamOne = newTeam;
          match.winner = match.winner === oldTeam ? newTeam.name : match.winner;
        } else if (match.teamTwo.name === oldTeam) {
          match.teamTwo = newTeam;
          match.winner = match.winner === oldTeam ? newTeam.name : match.winner;
        }
      }
    });
  }

  switch (matchChanged) {
    case 49:
      oldData[57-49].teamOne = oldData[57-49].teamOne.name === "None" ? newTeam : oldData[57-49].teamOne
      break
    case 50:
        oldData[57-49].teamTwo = oldData[57-49].teamTwo.name === "None" ? newTeam : oldData[57-49].teamTwo
        break
    case 51:
        oldData[59-49].teamOne = oldData[59-49].teamOne.name === "None" ? newTeam : oldData[59-49].teamOne
        break
    case 52:
        oldData[59-49].teamTwo = oldData[59-49].teamTwo.name === "None" ? newTeam : oldData[59-49].teamTwo
        break
    case 53:
        oldData[58-49].teamOne = oldData[58-49].teamOne.name === "None" ? newTeam : oldData[58-49].teamOne
        break
    case 54:
        oldData[58-49].teamTwo = oldData[58-49].teamTwo.name === "None" ? newTeam : oldData[58-49].teamTwo
        break
    case 55:
        oldData[60-49].teamOne = oldData[60-49].teamOne.name === "None" ? newTeam : oldData[60-49].teamOne
        break
    case 56:
        oldData[60-49].teamTwo = oldData[60-49].teamTwo.name === "None" ? newTeam : oldData[60-49].teamTwo
        break
    case 57:
        oldData[61-49].teamOne = oldData[61-49].teamOne.name === "None" ? newTeam : oldData[61-49].teamOne
        break
    case 58:
        oldData[61-49].teamTwo = oldData[61-49].teamTwo.name === "None" ? newTeam : oldData[61-49].teamTwo
        break
    case 59:
        oldData[62-49].teamOne = oldData[62-49].teamOne.name === "None" ? newTeam : oldData[62-49].teamOne
        break
    case 60:
        oldData[62-49].teamTwo = oldData[62-49].teamTwo.name === "None" ? newTeam : oldData[62-49].teamTwo
        break
    // Will likley need to add Third-Place Case here
    case 61:
        oldData[64-49].teamOne = oldData[64-49].teamOne.name === "None" ? newTeam : oldData[64-49].teamOne
        break
    case 62:
        oldData[64-49].teamTwo = oldData[64-49].teamTwo.name === "None" ? newTeam : oldData[64-49].teamTwo
        break
    // case 63:
    //     break
    // case 64:
    //     break
  }

  return oldData;
};

export default mapEliminationData;
