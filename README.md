First and foremost you need to add and env file in the backend folder .env
having items such as 
{
  MAIL_PASS=  #google mail pass from accounts



  JWT_SECRET=""
  FOLDER_NAME=""




  RAZORPAY_KEY=
  RAZORPAY_SECRET=

  #cloudinary keys
  CLOUD_NAME=
  API_KEY=
  API_SECRET=

  MONGODB_URL=""
  PORT=4000

  ASSEMBLY_AI_KEY=  # Should start with your actual AssemblyAI key
  GEMINI_API_KEY=   ## Should start with your actual geminiApi key
}


cd backend > npm install
cd ..  > npm install
and then you can start with the command 
npm run dev 
