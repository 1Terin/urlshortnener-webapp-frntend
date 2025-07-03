import React, { useState } from 'react';

interface ShortenedUrlDisplayProps {
  shortUrl: string;
}

const ShortenedUrlDisplay: React.FC<ShortenedUrlDisplayProps> = ({ shortUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy URL automatically. Please copy it manually: ' + shortUrl);
    }
  };

  return (
    <div style={styles.container}>
      <p style={styles.label}>Your Shortened URL:</p>
      <div style={styles.urlContainer}>
        {/* Make the short URL clickable and open in a new tab */}
        <a href={shortUrl} target="_blank" rel="noopener noreferrer" style={styles.shortUrlLink}>
          {shortUrl}
        </a>
        <button
          onClick={handleCopy}
          style={styles.copyButton}
          aria-label={copied ? "Copied to clipboard!" : "Copy URL to clipboard"}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    marginTop: '25px',
    padding: '20px',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    textAlign: 'center',
    maxWidth: '500px', 
    margin: '25px auto', 
  },
  label: {
    margin: '0 0 15px 0',
    fontSize: '1.1em',
    color: '#333',
    fontWeight: 'bold',
  },
  urlContainer: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    gap: '15px', 
  },
  shortUrlLink: {
    fontSize: '1.3em',
    fontWeight: '600',
    color: '#007bff',
    textDecoration: 'none',
    wordBreak: 'break-all', // Ensure long URLs break lines
    padding: '5px 0',
    transition: 'color 0.2s ease-in-out',
  },
  shortUrlLinkHover: { // Example of hover style if using a CSS approach
    color: '#0056b3',
  },
  copyButton: {
    padding: '10px 25px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: '500',
    transition: 'background-color 0.2s ease-in-out, transform 0.1s ease-in-out',
    whiteSpace: 'nowrap', 
  },
  copyButtonHover: {
    backgroundColor: '#218838',
    transform: 'translateY(-1px)',
  },
};

export default ShortenedUrlDisplay;