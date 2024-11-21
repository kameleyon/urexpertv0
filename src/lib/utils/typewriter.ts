export const typeText = async (text: string, callback: (text: string) => void) => {
  const words = text.split(' ');
  let currentText = '';
  
  for (const word of words) {
    currentText += word + ' ';
    callback(currentText);
    // Increased the delay to make the typing effect more visible
    await new Promise(resolve => setTimeout(resolve, 50));
  }
};