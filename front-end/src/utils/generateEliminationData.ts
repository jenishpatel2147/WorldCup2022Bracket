
import { TeamData, GroupStageData } from '../store/groupStageReducer'

export interface GroupKnockoutData {
    name: string
    winner: TeamData
    second_spot: TeamData 
}


export const generateEliminationData = (groups: GroupStageData[]) => {
    const result: GroupKnockoutData[] = []
    groups.map((group) => {
        const newGroup: GroupKnockoutData = { 
        name: group.name,
        winner: group.teams[0],
        second_spot: group.teams[1] }
        result.push(newGroup)

        return null
    })

    return result
}

export default generateEliminationData

