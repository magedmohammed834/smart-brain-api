const {ClarifaiStub, grpc} = require("clarifai-nodejs-grpc");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 81da36648fe246de93ce115dbc8b1964");


const handleAPICall = (req, res) => {
    stub.PostModelOutputs(
        {
        model_id: "a403429f2ddf4b49b307e318f00e528b",
        inputs: [{data: {image: {url: req.body.input}}}]
    }, 
    metadata,
    (err, response) => {
        if (err) {
            console.log("Error:" + err);
            return;
    }
    if (response.status.code !== 10000) {
        console.log("Recieved failed status" + response.status.description + "\n" + response.status.details);
        return;
    }
    console.log("Predicted concepts, with confidence values:")
    for (const c of response.outputs[0].data.concepts) {
        console.log(c.name + ": " + c.value);
        }
        res.json(response)
        }
    ); 
}
   
const handleImage = (db) => (req, res) => {
    const {id} = req.body;
   return db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('error getting entries'));
 }

 module.exports = {
    handleImage,
    handleAPICall
 };