export interface ITeams {
  id: number,
  teamName: string
}

export default interface IMatchesModel {
  findAll(): Promise<ITeams[]>
}
