// Import Google Cloud Vision API client library
const vision = require('@google-cloud/vision');
const fs = require('fs');

// Create a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: 'path/to/your-service-account-key.json', // Replace with your service account key file
});

// Function to extract text
async function extractTextFromImage(imagePath) {
  try {
    // Perform text detection on the local file
    const [result] = await client.textDetection(imagePath);
    const detections = result.textAnnotations;

    if (detections.length === 0) {
      console.log('No text detected.');
      return;
    }

    // Save the extracted text to a file
    const extractedText = detections[0].description;
    console.log('Extracted Text:', extractedText);

    // Optionally save the output to a file
    fs.writeFileSync('output.txt', extractedText);
    console.log('Text saved to output.txt');
  } catch (error) {
    console.error('Error during text extraction:', error);
  }
}

// Replace 'path/to/image.jpg' with the path to your image
extractTextFromImage('path/to/image.jpg');