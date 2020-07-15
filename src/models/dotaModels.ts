/* eslint-disable camelcase */
interface TeamAPIResponse {
  team_id: number;
  rating: number;
  wins: number;
  losses: number;
  last_match_time: number;
  name: string;
  logo_url?: string;
  tag: string;
}
interface DOTATeam {
  name: string;
  id: number;
  logoUrl: string | undefined;
}

export { TeamAPIResponse, DOTATeam };
