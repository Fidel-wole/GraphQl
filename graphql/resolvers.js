const multer = require('multer');
const Content = require('../model/content')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Specify the destination where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Define the file name (customize as needed)
  },
});

const upload = multer({ storage: storage });

module.exports = {
  createContent: async function ({ userInput, file }, req) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const { createReadStream, filename, mimetype, encoding } = await file;
    const fileContent = await streamToBuffer(createReadStream);

    const content = new Content({
      userId: req.userId,
      content: {
        data: fileContent,
        contentType: mimetype,
      },
      caption: userInput.caption,
      hashtags: userInput.hashtags,
      category: userInput.category,
      thumbnailUrl: userInput.thumbnailUrl,
      contentUrl: userInput.contentUrl,
    });

    const stored = await content.save();
    return { ...stored._doc, _id: stored._id.toString() };
  },
  postComment: async function ({ userInput }, req) {
    try {
      // Find the content by ID
      const contentId = userInput.contentId; 
      const content = await Content.findById(contentId);
  
      if (!content) {
        throw new Error('Content not found');
      }
  
      // Add the comment to the content
      const newComment = {
        comment: userInput.comment,
        userId: userInput.userId, 
      };
  
      content.comments.push(newComment);
  
      // Save the updated content
      const updatedContent = await content.save();
  
      return { ...updatedContent._doc, _id: updatedContent._id.toString() };
    } catch (error) {
      throw new Error('Error posting comment: ' + error.message);
    }
  },
  //get all content created by users
  getAllContent:async function(args, req){
    const content = await Content.find().populate('userId');
    return{content:content.map(c =>{
      return{...c._doc, _id:c._id.toString() }
    })}
  },
  
  //get contents created by specific user
  getUserContent: async function({userId}, req){
        try{
          const userContent = await Content.find({userId: userId})
          return userContent;
        }catch(error){
          throw new Error(error.message)
        }
  },


  // Function to convert the file stream to a buffer
 
};
async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

