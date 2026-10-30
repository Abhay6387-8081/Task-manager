import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    title:{type:String,required:true,trim:true},
    description:{type:String,default:''},
    status:{type:String,enum:['todo','in-progress','completed'],default:'todo'},
    priority:{type:String,enum:['low','medium','high'],default:'medium'},
    dueDate:{type:String,default:null},
    category:{type:String,default:'',trim:true},
    tags:{type:[String],default:[]},
    estimatedDuration:{type:Number,default:null},
    completedAt:{type:Date,default:null}
},{
    timestamps:true
});


taskSchema.index({user:1,status:1});

taskSchema.index({index:1,dueDate:1});

taskSchema.index({title:'text',description:'text'});

export default mongoose.model('Task',taskSchema)

