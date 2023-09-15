import mongoose, { Document, Model, Schema } from 'mongoose'

interface ICigaretteReport extends Document {
    userId: string
    hour: number
    day: number
    month: number
    year: number
    date: Date
    season: number
}

const CigaretteReportSchema = new Schema<ICigaretteReport>({
    userId: String,
    hour: Number,
    day: Number,
    month: Number,
    year: Number,
    date: Date,
    season: Number,
})

const CigaretteReportModel: Model<ICigaretteReport> =
    mongoose.model<ICigaretteReport>('CigaretteReport', CigaretteReportSchema)

export default CigaretteReportModel
