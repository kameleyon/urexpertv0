export const typeText = async (text: string, callback: (text: string) => void) => {
  const words = text.split(' ');
  let currentText = '';
  
  for (const word of words) {
    currentText += word + ' ';
    callback(currentText);
    await new Promise(resolve => setTimeout(resolve, 30)); // Adjust speed as needed
  }
};