import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';

const authEndpoints = express.Router();

// Endpoint untuk verifikasi password
authEndpoints.post('/verify-password', async (req: Request, res: Response) => {
  try {
    const { password, hash } = req.body;
    
    if (!password || !hash) {
      return res.status(400).json({ 
        error: 'Password dan hash diperlukan' 
      });
    }
    
    const isValid = await bcrypt.compare(password, hash);
    res.json({ isValid });
  } catch (error) {
    console.error('Error verifying password:', error);
    res.status(500).json({ 
      error: 'Gagal memverifikasi password',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Endpoint untuk hash password
authEndpoints.post('/hash-password', async (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    const saltRounds = 10;
    
    if (!password) {
      return res.status(400).json({ 
        error: 'Password diperlukan' 
      });
    }
    
    const hash = await bcrypt.hash(password, saltRounds);
    res.json({ hash });
  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ 
      error: 'Gagal hashing password',
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

export default authEndpoints; 