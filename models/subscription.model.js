import mongoose from "mongoose";

const subscriptionSchema = new mongoose.SchemaType({
    name:{
        type:String,
        required:[true,'Subscription Name is required'],
        trim:true,
        minLength:2,
        maxLength:50,
    },
    price:{
        type:Number,
        required:[true,'Subscription price is required'],
        min:[0,'Price must be greater than 0']
    },
    currency:{
        type:String,
        enum:['USD','EUR','GBP'],
        default:'USD'
    },
    frequency:{
        type:String,
        enum:['daily','weekly','monthly','yearly']
    },
    category:{
        type:String,
        enum:['sports','news','entertainment','lifestyle','technology','finance','politics','other'],
        required:true
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:['active','inactive','expired'],
        default:'active'
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value)=>value<=new Date(),
            message:'Start date must be in hte past'
        }
    },
    renewalDate:{
        type:Date,
        required:true,
        validate:{
            validator:function(value){
                return value > this.startDate
            },
            message:'Renewal date must be after the start date'
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    }
},{timestamps:true})


// Auto calculaet the renewal data if missing
subscriptionSchema.pre('save',function(next){
    if(!this.renewalData){
        const renewalPeriods = {
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365,
        }
        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency])
    }

    // Auto-update the status if renewal data has passed
    if(this.renewalDate< new Date()) {
        this.status = 'expired'
    }
    next()
})

const Subscription = mongoose.model('Subscription', subscriptionSchema)

export default Subscription