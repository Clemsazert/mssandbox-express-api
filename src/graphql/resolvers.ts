import { getAllTeams } from '../utils/requests';
import { DOTATeam } from '../models/dotaModels';

export const resolvers = {
  Query: {
    teams: async (): Promise<DOTATeam[]> => {
      const retrievedTeams = await getAllTeams();
      return retrievedTeams
        .slice(0, 20)
        .map(({ team_id: id, logo_url: logoUrl, name }) => ({
          id,
          logoUrl,
          name
        }));
    }
  }
};
