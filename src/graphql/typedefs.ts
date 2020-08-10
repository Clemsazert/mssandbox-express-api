import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type DOTATeamLight {
    id: ID!
    name: String!
    logoUrl: String!
  }
  type DOTATeam {
    id: ID!
    name: String!
    logoUrl: String
    players: [DOTAPlayer]
    rating: Float!
    wins: Int!
    losses: Int!
    lastMatchTime: Int!
    tag: String!
  }
  type DOTAPlayer {
    id: ID!
    name: String!
    gamesPlayed: Int!
    wins: Int!
  }
  type Query {
    teams: [DOTATeamLight!]!
    teamById(id: ID!): DOTATeam
  }
`;
