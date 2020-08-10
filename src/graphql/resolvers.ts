import { getAllTeams, getTeamPlayers, getTeamById } from '../utils/requests';
import { DOTATeamLight, DOTATeam, PlayerAPI } from '../models/dotaModels';

export const resolvers = {
  Query: {
    teams: async (): Promise<DOTATeamLight[]> => {
      const retrievedTeams = await getAllTeams();
      return retrievedTeams
        .slice(0, 20)
        .map(({ team_id: id, logo_url: logoUrl, name }) => ({
          id,
          logoUrl,
          name
        }));
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    teamById: async (
      _: any,
      { id: teamId }: { id: number }
    ): Promise<DOTATeam> => {
      const {
        team_id: id,
        logo_url: logoUrl,
        name,
        rating,
        wins,
        losses,
        last_match_time: lastMatchTime,
        tag
      } = await getTeamById(teamId);
      const retrievedPlayers = await getTeamPlayers(id);
      // Only keep the active Players
      const players = retrievedPlayers.filter(
        (player: PlayerAPI) => player.is_current_team_member
      );
      return {
        id,
        logoUrl,
        name,
        players: players.map(
        // eslint-disable-next-line camelcase
          ({ account_id, name: playerName, games_played, wins: playerWins }) => ({
            id: account_id,
            name: playerName,
            gamesPlayed: games_played,
            wins: playerWins
          })
        ),
        rating,
        wins,
        losses,
        tag,
        lastMatchTime
      };
    }
  }
};
