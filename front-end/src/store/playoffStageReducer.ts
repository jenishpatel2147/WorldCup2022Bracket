import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { updateMatch } from "../components/Eliminations/elimination-form.component";
import mapEliminationData, {
  updateBracketHelper,
} from "../utils/mapEliminationData";
import { TeamData } from "./groupStageReducer";

export interface playoffMatchData {
  matchNumber: number;
  teamOne: TeamData;
  teamOneScore: number;
  teamTwo: TeamData;
  teamTwoScore: number;
  winner: string;
}

const initialState: playoffMatchData[] = [
  {
    matchNumber: 49,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 50,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 51,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 52,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 53,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 54,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 55,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 56,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 57,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 58,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 59,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 60,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 61,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 62,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 63,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
  {
    matchNumber: 64,
    teamOne: { name: "None", flag: "UN" },
    teamOneScore: 0,
    teamTwo: { name: "None", flag: "UN" },
    teamTwoScore: 0,
    winner: "None",
  },
];

const playoff = createSlice({
  name: "playoff",
  initialState,
  reducers: {
    genereateRoundOf16: (state, action) => {
      mapEliminationData(state, action.payload!);
    },
    updateBracket: {
      reducer: (state, action: PayloadAction<any>) => {
        state[action.payload.matchChanged - 49] = action.payload.newMatchData;
        if (action.payload.hasWinnerChanged) {
          state = updateBracketHelper(
            state,
            action.payload.oldWinner,
            action.payload.adjustTeam,
            action.payload.matchChanged
          );
        }
      },
      prepare: (
        oldMatchData: playoffMatchData,
        oldWinner: string,
        teamChanged: TeamData,
        adjustTeam: TeamData,
        hasWinnerChanged: boolean,
        matchChanged: number,
        newScore: number
      ) => {

        const newMatchData = { ...oldMatchData };

        const isTeamOneChanged = newMatchData.teamOne.name === teamChanged.name;
        const isTeamTwoChanged = newMatchData.teamTwo.name === teamChanged.name;

        if (isTeamOneChanged) {
          newMatchData.teamOneScore = Number(newScore);
        } else if (isTeamTwoChanged) {
          newMatchData.teamTwoScore = Number(newScore);
        } else {
          console.log("TEAM NOT FOUND")
        }

        if (newMatchData.winner === "None") {
          newMatchData.winner = teamChanged.name
        } else {
          newMatchData.winner = hasWinnerChanged
            ? newMatchData.winner === newMatchData.teamOne.name
              ? newMatchData.teamTwo.name
              : newMatchData.teamOne.name
            : newMatchData.winner;
        }

        console.log(newMatchData);

        return {
          payload: {
            newMatchData,
            oldWinner,
            teamChanged,
            adjustTeam,
            hasWinnerChanged,
            matchChanged,
          } as any,
        };
      },
    },
  },
});


export const { genereateRoundOf16, updateBracket } = playoff.actions;
export default playoff.reducer;
