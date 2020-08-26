import { Schema, Document } from 'mongoose';
import { Entity } from './entity';
import { QuizzQuestionType } from '../../models/dotaModels';
import { generateRandomArray, randomArrayMixUp } from '../selection';

export interface QuestionType extends Document {
  question: string;
  type: string;
  response: string;
  answers: string[];
}

const QuestionSchema = new Schema({
  question: String,
  type: String,
  response: String,
  answers: [String]
});

class QuestionEntity extends Entity<QuestionType> {
  private questionTypes = ['player', 'team', 'hero', 'item'];

  getQuestionsByType = (type: string) => this.model.find({ type }).exec();

  getRandomQuestionByType = async (type: string) => {
    const questionBatch = await this.getQuestionsByType(type);
    const index = Math.floor(Math.random() * questionBatch.length);
    return questionBatch[index];
  };

  generateQuizz = async () => {
    const questions = await Promise.all(
      this.questionTypes.map(async (type: string) => this.getRandomQuestionByType(type))
    );
    return questions.map(question => this.generateQuizzQuestionFromQuestion(question));
  };

  generateQuizzQuestionFromQuestion = (
    question: QuestionType
  ): QuizzQuestionType => {
    const selectedAsnwers = generateRandomArray(
      3,
      0,
      question.answers.length
    ).map(index => question.answers[index]);
    const answers = randomArrayMixUp<string>(
      selectedAsnwers.concat(question.response)
    );
    return {
      question: question.question,
      answers,
      correct: answers.indexOf(question.response),
      type: question.type
    };
  };
}

export const Question = ((): QuestionEntity => new QuestionEntity(QuestionSchema, 'questions'))();
