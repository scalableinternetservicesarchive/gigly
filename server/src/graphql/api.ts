import { readFileSync } from 'fs'
import { PubSub } from 'graphql-yoga'
import path from 'path'
import { check } from '../../../common/src/util'
import { Comment } from '../entities/Comment'
import { Listing } from '../entities/Listing'
import { Survey } from '../entities/Survey'
import { SurveyAnswer } from '../entities/SurveyAnswer'
import { SurveyQuestion } from '../entities/SurveyQuestion'
import { User } from '../entities/User'
import { Resolvers } from './schema.types'

export const pubsub = new PubSub()

export function getSchema() {
  const schema = readFileSync(path.join(__dirname, 'schema.graphql'))
  return schema.toString()
}

interface Context {
  user: User | null
  request: Request
  response: Response
  pubsub: PubSub
}

export const graphqlRoot: Resolvers<Context> = {
  Query: {
    self: (_, args, ctx) => ctx.user,
    survey: async (_, { surveyId }) => (await Survey.findOne({ where: { id: surveyId } })) || null,
    surveys: () => Survey.find(),
    listings: () => Listing.find(),
    comments: () => Comment.find(),
  },
  Mutation: {
    answerSurvey: async (_, { input }, ctx) => {
      const { answer, questionId } = input
      const question = check(await SurveyQuestion.findOne({ where: { id: questionId }, relations: ['survey'] }))

      const surveyAnswer = new SurveyAnswer()
      surveyAnswer.question = question
      surveyAnswer.answer = answer
      await surveyAnswer.save()

      question.survey.currentQuestion?.answers.push(surveyAnswer)
      ctx.pubsub.publish('SURVEY_UPDATE_' + question.survey.id, question.survey)

      return true
    },
    nextSurveyQuestion: async (_, { surveyId }, ctx) => {
      // check(ctx.user?.userType === UserType.Admin)
      const survey = check(await Survey.findOne({ where: { id: surveyId } }))
      survey.currQuestion = survey.currQuestion == null ? 0 : survey.currQuestion + 1
      await survey.save()
      ctx.pubsub.publish('SURVEY_UPDATE_' + surveyId, survey)
      return survey
    },
    addListing: async (_, { listing }, ctx) => {
      if (listing !== undefined && listing !== null) {
        const { username, price, sellingName, startDate, endDate, location, description, image } = listing
        if (
          username !== undefined &&
          price !== undefined &&
          sellingName !== undefined &&
          startDate !== undefined &&
          endDate !== undefined &&
          location !== undefined &&
          description !== undefined &&
          image !== undefined
        ) {
          const newListing = new Listing()
          newListing.username = username
          newListing.price = price
          newListing.sellingName = sellingName
          newListing.startDate = startDate
          newListing.endDate = endDate
          newListing.location = location
          newListing.description = description
          newListing.image = image

          await newListing.save()
          return newListing
        }
      }
      return null
    },
    addComment: async (_, { comment }, ctx) => {
      if (comment !== undefined && comment !== null) {
        const { listingId, username, commentContents } = comment
        const newComment = new Comment()
        if (listingId !== undefined && username !== undefined && commentContents !== undefined) {
          newComment.listingId = listingId
          newComment.username = username
          newComment.commentContents = commentContents
          await newComment.save()
          return newComment
        }
      }
      return null
    },
  },
  Subscription: {
    surveyUpdates: {
      subscribe: (_, { surveyId }, context) => context.pubsub.asyncIterator('SURVEY_UPDATE_' + surveyId),
      resolve: (payload: any) => payload,
    },
  },
}
