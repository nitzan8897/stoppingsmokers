import mongoose, { Document, Model, Schema } from 'mongoose'

interface ISeasonMember extends Document {
    season: number
    userId: string
    amount: number
}

const SeasonMemberSchema = new Schema<ISeasonMember>({
    season: Number,
    userId: String,
    amount: Number,
})

const SeasonMemberModel: Model<ISeasonMember> = mongoose.model<ISeasonMember>(
    'SeasonMember',
    SeasonMemberSchema
)

export default SeasonMemberModel
