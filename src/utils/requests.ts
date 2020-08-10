import { openDotaSession } from './sessions';
import { TeamAPI, PlayerAPI } from '../models/dotaModels';
import * as mockTeams from './mockData.json';

export const getAllTeams = (): Promise<TeamAPI[]> => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Using mock Data');
    return new Promise(resolve => resolve(mockTeams as TeamAPI[]));
  }
  return openDotaSession.get<TeamAPI[]>('/teams');
};

export const getTeamById = (id: number): Promise<TeamAPI> => openDotaSession.get<TeamAPI>(`/teams/${id}`);

export const getTeamPlayers = (id: number): Promise<PlayerAPI[]> => openDotaSession.get<PlayerAPI[]>(`/teams/${id}/players`);
