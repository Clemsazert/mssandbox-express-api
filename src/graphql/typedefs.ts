import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type DOTATeam {
    name: String!
    id: String!
    logoUrl: String!
  }
  type Query {
    teams: [DOTATeam!]!
  }
`;
