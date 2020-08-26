import { ApolloError } from 'apollo-server-express';
import { getAllTeams, getTeamPlayers, getTeamById } from '../utils/requests';
import { DOTATeamLight, DOTATeam, PlayerAPI, QuizzQuestionType } from '../models/dotaModels';
import { Question, QuestionType } from '../utils/mongoose/questions';

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
    teamById: async (_: unknown, { id: teamId }: { id: number }): Promise<DOTATeam> => {
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
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    questionById: async (_: unknown, { id }: { id: string }): Promise<QuestionType> => {
      const question = await Question.getById(id);
      if (!question) {
        throw new ApolloError(`No question found for id ${id}`);
      }
      return question;
    },
    generateQuizz: async (): Promise<QuizzQuestionType[]> => Question.generateQuizz()
  }
};
