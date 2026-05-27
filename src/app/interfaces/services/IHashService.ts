export default interface IHashService {
  hash: (data: string) => Promise<string>
  compare: (data: string, hash: string) => Promise<boolean>
}

export type THashComparerService = Pick<IHashService, 'compare'>
