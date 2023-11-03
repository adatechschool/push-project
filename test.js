async function hashPassword (password) {
    // Create a Uint8Array from the password
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
  
    // Generate a cryptographic hash (SHA-256)
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  
    // Convert the hash to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    console.log(hashedPassword);
  }

  hashPassword("Hello");


  