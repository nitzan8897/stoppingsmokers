import mongoose, { Document, Model, Schema } from 'mongoose'

export interface ISeason extends Document {
    number: number
    dateStart: Date
    dateEnd: Date
}

const SeasonSchema = new Schema<ISeason>({
    number: Number,
    dateStart: Date,
    dateEnd: Date,
})

const SeasonModel: Model<ISeason> = mongoose.model<ISeason>(
    'Season',
    SeasonSchema
)

export default SeasonModel
