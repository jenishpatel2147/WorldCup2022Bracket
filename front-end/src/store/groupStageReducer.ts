/* eslint-disable no-case-declarations */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export interface TeamData {
  flag: string;
  name: string;
}

export interface GroupStageData {
  name: string;
  teams: TeamData[];
}

const initialState = [
  {
    name: "Group A",
    teams: [
      { name: "QATAR", flag: "QA" },
      { name: "ECUADOR", flag: "EC" },
      { name: "SENEGAL", flag: "SN" },
      { name: "NETHERLANDS", flag: "NL" },
    ],
  },
  {
    name: "Group B",
    teams: [
      { name: "ENGLAND", flag: "GB-ENG" },
      { name: "IRAN", flag: "IR" },
      { name: "UNITED STATES", flag: "US" },
      { name: "UEFA PATH A WINNERS", flag: "" },
    ],
  },
  {
    name: "Group C",
    teams: [
      { name: "ARGENTINA", flag: "AR" },
      { name: "SAUDI ARABIA", flag: "SA" },
      { name: "MEXICO", flag: "MX" },
      { name: "POLAND", flag: "PL" },
    ],
  },
  {
    name: "Group D",
    teams: [
      { name: "FRANCE", flag: "FR" },
      { name: "AFC-CONEMBOL WINNERS", flag: "" },
      { name: "DENMARK", flag: "DK" },
      { name: "TUNISIA", flag: "TN" },
    ],
  },
  {
    name: "Group E",
    teams: [
      { name: "SPAIN", flag: "ES" },
      { name: "CONCACAF-OFC WINNERS", flag: "" },
      { name: "GERMANY", flag: "DE" },
      { name: "JAPAN", flag: "JP" },
    ],
  },
  {
    name: "Group F",
    teams: [
      { name: "BELGIUM", flag: "BE" },
      { name: "CANADA", flag: "CA" },
      { name: "MOROCCO", flag: "MA" },
      { name: "CROATIA", flag: "HR" },
    ],
  },
  {
    name: "Group G",
    teams: [
      { name: "BRAZIL", flag: "BR" },
      { name: "SERBIA", flag: "RS" },
      { name: "SWITZERLAND", flag: "CH" },
      { name: "CAMEROON", flag: "CM" },
    ],
  },
  {
    name: "Group H",
    teams: [
      { name: "PORTUGAL", flag: "PT" },
      { name: "GHANA", flag: "GH" },
      { name: "URUGUAY", flag: "UY" },
      { name: "SOUTH KOREA", flag: "KR" },
    ],
  },
] as GroupStageData[];

interface PayloadData {
  index: number; // listIndex
  teams: any; // list of [{flag: "", team: "" }, ...]
}

const groupStage = createSlice({
  name: "groupStage",
  initialState,
  reducers: {
    updateGroupResults: {
    reducer: (state: any, action: PayloadAction<any>) => {
      // const listIndex = action?.payload?.index;
      const newTeams = action?.payload?.groupTeams;
      if (action.payload.listIndex) state[action.payload.listIndex].teams = newTeams;
    },
    prepare: (listIndex: number, groupTeams: TeamData[]) => {
      
      return {payload: {listIndex, groupTeams} as any }
    }
  }
  }
})

export const { updateGroupResults } = groupStage.actions;
export default groupStage.reducer;
