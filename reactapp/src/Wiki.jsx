import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Wiki = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchWikipedia = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      // Wikipedia API endpoint for search
      const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
      const listUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=10`;
      
      // Get search results list
      const listResponse = await fetch(listUrl);
      const listData = await listResponse.json();
      
      if (listData.query && listData.query.search) {
        const results = await Promise.all(
          listData.query.search.slice(0, 6).map(async (item) => {
            try {
              const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(item.title)}`;
              const summaryResponse = await fetch(summaryUrl);
              const summaryData = await summaryResponse.json();
              
              return {
                title: item.title,
                snippet: item.snippet.replace(/<[^>]*>/g, ''), // Remove HTML tags
                extract: summaryData.extract || item.snippet.replace(/<[^>]*>/g, ''),
                thumbnail: summaryData.thumbnail?.source || null,
                url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`
              };
            } catch (error) {
              return {
                title: item.title,
                snippet: item.snippet.replace(/<[^>]*>/g, ''),
                extract: item.snippet.replace(/<[^>]*>/g, ''),
                thumbnail: null,
                url: `https://en.wikipedia.org/wiki/${encodeURIComponent(item.title.replace(/ /g, '_'))}`
              };
            }
          })
        );
        
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching Wikipedia:', error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchWikipedia(searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <div className="dashboard-inner" style={{paddingTop: '50px'}}>
      <div className="content" style={{marginTop: '0px', paddingTop: '30px'}}>
        <div className="back-button-container" style={{marginBottom: '20px', textAlign: 'center', marginTop: '20px'}}>
          <button 
            className="back-button" 
            onClick={() => navigate('/dashboard')}
            style={{
              background: 'linear-gradient(45deg, #03e9f4, #00c9ff)',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '25px',
              color: '#000',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(3, 233, 244, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(3, 233, 244, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(3, 233, 244, 0.3)';
            }}
          >
            ← Back to Dashboard
          </button>
        </div>
        
        <section className="welcome-section" style={{marginTop: '0px'}}>
          <h2>Wiki Search</h2>
          <p>Search Wikipedia for any topic and get instant results with summaries and links.</p>
        </section>

        {/* Search Bar */}
        <section className="search-section" style={{marginBottom: '30px'}}>
          <div className="search-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search Wikipedia... (e.g., 'React', 'JavaScript', 'Artificial Intelligence')"
              style={{
                flex: 1,
                padding: '15px 20px',
                borderRadius: '25px',
                border: '2px solid #03e9f4',
                background: '#222',
                color: '#fff',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 15px rgba(3, 233, 244, 0.5)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                background: 'linear-gradient(45deg, #03e9f4, #00c9ff)',
                border: 'none',
                padding: '15px 25px',
                borderRadius: '25px',
                color: '#000',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </section>

        {/* Loading State */}
        {loading && (
          <div style={{textAlign: 'center', padding: '40px'}}>
            <div style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid #333',
              borderTop: '4px solid #03e9f4',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{marginTop: '20px', color: '#aaa'}}>Searching Wikipedia...</p>
          </div>
        )}

        {/* Search Results */}
        {!loading && hasSearched && (
          <section className="search-results">
            {searchResults.length > 0 ? (
              <>
                <h3 style={{textAlign: 'center', marginBottom: '30px', color: '#03e9f4'}}>
                  Found {searchResults.length} results for "{searchQuery}"
                </h3>
                <div className="results-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '20px',
                  marginBottom: '30px'
                }}>
                  {searchResults.map((result, index) => (
                    <div key={index} className="result-card" style={{
                      background: '#222',
                      padding: '20px',
                      borderRadius: '15px',
                      border: '1px solid #333',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onClick={() => window.open(result.url, '_blank')}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(3, 233, 244, 0.3)';
                      e.currentTarget.style.borderColor = '#03e9f4';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#333';
                    }}
                    >
                      <div style={{display: 'flex', gap: '15px'}}>
                        {result.thumbnail && (
                          <img 
                            src={result.thumbnail} 
                            alt={result.title}
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover',
                              borderRadius: '10px',
                              flexShrink: 0
                            }}
                          />
                        )}
                        <div style={{flex: 1}}>
                          <h4 style={{
                            color: '#03e9f4',
                            margin: '0 0 10px 0',
                            fontSize: '18px',
                            fontWeight: 'bold'
                          }}>
                            {result.title}
                          </h4>
                          <p style={{
                            color: '#ccc',
                            margin: '0',
                            fontSize: '14px',
                            lineHeight: '1.5',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {result.extract}
                          </p>
                          <div style={{
                            marginTop: '10px',
                            fontSize: '12px',
                            color: '#03e9f4',
                            fontWeight: 'bold'
                          }}>
                            Click to read more on Wikipedia →
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{textAlign: 'center', padding: '40px'}}>
                <h3 style={{color: '#ff6b6b', marginBottom: '10px'}}>No results found</h3>
                <p style={{color: '#aaa'}}>
                  Try searching for something else. Make sure your search term is spelled correctly.
                </p>
              </div>
            )}
          </section>
        )}

        {/* Initial State - Show some example searches */}
        {!hasSearched && (
          <section className="examples-section">
            <h3 style={{textAlign: 'center', marginBottom: '20px', color: '#03e9f4'}}>
              Popular Searches
            </h3>
            <div className="examples-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {[
                'Artificial Intelligence',
                'React JavaScript',
                'Climate Change',
                'Space Exploration',
                'Machine Learning',
                'Quantum Computing'
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(example);
                    searchWikipedia(example);
                  }}
                  style={{
                    background: '#333',
                    border: '1px solid #555',
                    padding: '15px',
                    borderRadius: '10px',
                    color: '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontSize: '14px'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background = '#03e9f4';
                    e.target.style.color = '#000';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background = '#333';
                    e.target.style.color = '#fff';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {example}
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .search-container {
            flex-direction: column !important;
            gap: 15px !important;
          }
          
          .results-grid {
            grid-template-columns: 1fr !important;
          }
          
          .examples-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        
        @media (max-width: 480px) {
          .examples-grid {
            grid-template-columns: 1fr !important;
          }
          
          .result-card {
            padding: 15px !important;
          }
          
          .result-card h4 {
            font-size: 16px !important;
          }
          
          .result-card p {
            font-size: 13px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Wiki;