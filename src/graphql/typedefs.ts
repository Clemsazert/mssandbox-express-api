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
  type Question {
    id: ID
    question: String
    type: String
    response: String
    answers: [String]
  }
  type QuizzQuestion {
    id: ID!
    question: String!
    type: String!
    correct: Int!
    answers: [String]!
  }
  
  type Query {
    teams: [DOTATeamLight!]!
    teamById(id: ID!): DOTATeam
    questionById(id: ID!): Question
    generateQuizz: [QuizzQuestion]
  }
`;
