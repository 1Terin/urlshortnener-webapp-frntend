import React, { useState } from 'react';

interface UrlInputFormProps {
  onShorten: (longUrl: string) => void;
  loading: boolean;
  error: string | null;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ onShorten, loading, error }) => {
  const [longUrl, setLongUrl] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (longUrl.trim()) {
      onShorten(longUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="url"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        placeholder="Enter your long URL here"
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Shortening...' : 'Shorten URL'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </form>
  );
};

export default UrlInputForm;