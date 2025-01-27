/* eslint-disable consistent-return */
// pages/api/places-autocomplete.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const GOOGLE_API_KEY = 'AIzaSyBUFzjYkUXfEOe--h-z_d2f51p5JcsJAJ8';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { input } = req.query;

  if (!input || typeof input !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid input' });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${GOOGLE_API_KEY}`
    );

    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
