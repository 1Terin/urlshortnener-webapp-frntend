import React, { useState } from 'react';
import UrlInputForm from './urlinputform';
import ShortenedUrlDisplay from './shortenedurldisplay';

const API_GATEWAY_URL = 'https://aoeoehdate.execute-api.ap-south-1.amazonaws.com/Prod/urlshortenerclass'

const App: React.FC = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleShortenUrl = async (longUrl: string) => {
    setLoading(true);
    setError(null);
    setShortUrl(null); 

    try {
      const response = await fetch(API_GATEWAY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: longUrl }),
      });

      if (!response.ok) {
 
        let errorMessage = 'Failed to shorten URL';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (parseError) {
          errorMessage = `Server responded with an unexpected format (Status: ${response.status}). Please check API Gateway logs.`;
          console.error("Failed to parse error response as JSON:", parseError);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setShortUrl(data.shortUrl); 
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>URL Shortener</h1>
      <UrlInputForm onShorten={handleShortenUrl} loading={loading} error={error} />
      {shortUrl && <ShortenedUrlDisplay shortUrl={shortUrl} />}
    </div>
  );
};

export default App;