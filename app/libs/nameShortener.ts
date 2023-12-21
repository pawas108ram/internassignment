export  function createInitials(name:string) {
   
    const words = name.split(' ');
  
   
    const initials = words.map(word => word.charAt(0).toUpperCase());
  
   
    const result = initials.join('');
  
    return result;
  }

  