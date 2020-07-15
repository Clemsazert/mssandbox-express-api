import { openDotaSession } from './sessions';
import { TeamAPIResponse } from '../models/dotaModels';
import * as mockTeams from './mockData.json';

export const getAllTeams = (): Promise<TeamAPIResponse[]> => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Using mock Data');
    return new Promise(resolve => resolve(mockTeams as TeamAPIResponse[]));
  }
  return openDotaSession.get<TeamAPIResponse[]>('/teams');
};

export const getTeamById = (id: string): Promise<TeamAPIResponse> => openDotaSession.get<TeamAPIResponse>(`/teams/${id}`);
