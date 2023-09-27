export interface ITeams {
  id: number,
  teamName: string
}

export default interface ITeamsModel {
  findAll(): Promise<ITeams[]>
  findById(id: ITeams['id']): Promise<ITeams | null>
}
