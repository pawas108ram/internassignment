export function getRandomColor() {
  
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-indigo-500',
      'bg-purple-500',
      'bg-pink-500',
    
    ];
  
    
    const randomIndex = Math.floor(Math.random() * colors.length);
  
  
    return colors[randomIndex];
  }
  



  