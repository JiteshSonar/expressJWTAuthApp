import mongoose, { Schema } from "mongoose";

const Supplier = new mongoose.Schema({
  Supplier_id: { Number },
  name: { String },
  email: { String },
  mobile_number: { Number },
});
