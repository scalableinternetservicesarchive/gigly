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
    self2: (_, args, ctx) => ctx.user,
    self: async (_, { email }) => {
      const user = await User.findOne({ where: { email: email } })
      if (user) {
        return user
      }
      return null
    },
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
          // update user's listing
          return newListing
        }
      }
      return null
    },
    editListing: async (_, { editInfo }, ctx) => {
      if (editInfo !== undefined && editInfo !== null) {
        const { id, username, price, sellingName, startDate, endDate, location, description, image } = editInfo
        let listing = await Listing.findOne({ where: { id: id } })
        if (listing !== undefined) {
          if (username) {
            listing.username = username
          }
          if (price) {
            listing.price = price
          }
          if (sellingName) {
            listing.sellingName = sellingName
          }
          if (startDate) {
            listing.startDate = startDate
          }
          if (endDate) {
            listing.endDate = endDate
          }
          if (location) {
            listing.location = location
          }
          if (description) {
            listing.description = description
          }
          if (image) {
            listing.image = image
          }
          listing.save()
          return listing
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
    editUser: async (_, { editInfo }, ctx) => {
      if (editInfo !== undefined && editInfo !== null) {
        const { id, email, name, password, number, location } = editInfo
        let user = await User.findOne({ where: { email: email } })
        if (user !== undefined) {
          if (email) {
            user.email = email
          }
          if (name) {
            user.name = name
          }
          if (number) {
            user.number = number
          }
          if (location) {
            user.location = location
          }
          user.save()
          return user
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
