import mongoose from 'mongoose';

export const connectDb = (url) => {
  mongoose.set("strictQuery", true)
  mongoose.connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(errs))
}