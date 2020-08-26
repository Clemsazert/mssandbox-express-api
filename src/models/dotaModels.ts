/* eslint-disable camelcase */
interface TeamAPI {
  team_id: number;
  rating: number;
  wins: number;
  losses: number;
  last_match_time: number;
  name: string;
  logo_url?: string;
  tag: string;
}
interface DOTATeamLight {
  id: number;
  name: string;
  logoUrl?: string;
}

interface PlayerAPI {
  account_id: number;
  name: string;
  games_played: number;
  wins: number;
  is_current_team_member: true;
}

interface DOTAPlayer {
  id: number;
  name: string;
  gamesPlayed: number;
  wins: number;
}

interface DOTATeam {
  id: number;
  name: string;
  logoUrl?: string;
  players: DOTAPlayer[];
  rating: number;
  wins: number;
  losses: number;
  lastMatchTime: number;
  tag: string;
}

interface QuizzQuestionType {
  question: string;
  answers: string[];
  correct: number;
  type: string;
}

export { TeamAPI, DOTATeamLight, PlayerAPI, DOTAPlayer, DOTATeam, QuizzQuestionType };
